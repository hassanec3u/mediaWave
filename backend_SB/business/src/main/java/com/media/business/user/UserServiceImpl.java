package com.media.business.user;


import com.media.business.authentification.CustomUserDetailsService;
import com.media.business.filestorage.FileStorageService;
import com.media.domain.model.User;
import com.media.domain.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class UserServiceImpl {

    private static final Logger LOG = LoggerFactory.getLogger(UserServiceImpl.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Autowired
    private FileStorageService fileStorageService;

    @Autowired
    private UserAssembler userAssembler;

    public Optional<UserInfoDto> findByUsername(String username) {

        return this.userRepository.findByUsername(username).map(this.userAssembler::toDto);
    }


    public UserInfoDto updateUser(UserInfoDto userInfoDto) {

        User currentUser = this.customUserDetailsService.getAuthenticatedUser();
        User existing = this.userRepository.findById(currentUser.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        this.userAssembler.updateEntity(existing, userInfoDto);
        User saved = this.userRepository.save(existing);
        return this.userAssembler.toDto(saved);

    }

    public UserInfoDto uploadUserProfilPicture(MultipartFile file) {

        try {
            this.fileStorageService.uploadProfilePicture(file);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

       User currentUser = this.customUserDetailsService.getAuthenticatedUser();

        return  this.userAssembler.toDto(currentUser);
    }





    public UserInfoDto getCurrentUser() {

        User user = this.customUserDetailsService.getAuthenticatedUser();
        return this.userAssembler.toDto(user);
    }

    public Optional<UserInfoDto> sendFriendRequest(String friendId) {

        User user = this.customUserDetailsService.getAuthenticatedUser();
        User friend = this.userRepository.findById(friendId).orElseThrow(() -> new RuntimeException("Friend not found"));


        if (user.getFriends().contains(friend)) {
            throw new RuntimeException("Already friends");
        }

        if (user.getFriendsRequests().contains(friend)) {
            throw new RuntimeException("You have a pending friend request from this user");
        }

        if (friend.getFriendsRequests().contains(user)) {
            throw new RuntimeException("Friend request already sent");
        }

        friend.getFriendsRequests().add(user);
        this.userRepository.save(friend);
        return Optional.of(this.userAssembler.toDto(friend));
    }

    public Optional<UserInfoDto> refuseFriendRequest(String friendId) {

        User user = this.customUserDetailsService.getAuthenticatedUser();
        User friend = this.userRepository.findById(friendId).orElseThrow();

        user.getFriendsRequests().remove(friend);
        this.userRepository.save(user);
        return Optional.of(this.userAssembler.toDto(user));
    }

    public Optional<UserInfoDto> acceptFriendRequest(String friendId) {

        User user = this.customUserDetailsService.getAuthenticatedUser();
        User friend = this.userRepository.findById(friendId).orElseThrow();

        if (!user.getFriendsRequests().contains(friend)) {
            throw new RuntimeException("No friend request from this user");
        }

        user.getFriends().add(friend);
        friend.getFriends().add(user);
        user.getFriendsRequests().remove(friend);

        this.userRepository.save(user);
        this.userRepository.save(friend);

        return Optional.of(this.userAssembler.toDto(user));
    }


    public Optional<UserInfoDto> removeFriend(String friendId) {

        User user = this.customUserDetailsService.getAuthenticatedUser();
        User friend = this.userRepository.findById(friendId).orElseThrow();

        user.getFriends().remove(friend);
        friend.getFriends().remove(user);

        this.userRepository.save(user);
        this.userRepository.save(friend);

        return Optional.of(this.userAssembler.toDto(user));
    }

    public List<UserInfoDto> getFriends() {

        User user = this.customUserDetailsService.getAuthenticatedUser();

        return user.getFriends().stream().map(friend -> this.userRepository.findById(friend.getId()).orElse(null)).filter(Objects::nonNull).map(this.userAssembler::toDto).toList();
    }

    public List<UserInfoDto> getPendingFriendRequests() {

        User user = this.customUserDetailsService.getAuthenticatedUser();

        return user.getFriendsRequests().stream().map(requester -> this.userRepository.findById(requester.getId()).orElse(null)).filter(Objects::nonNull).map(this.userAssembler::toDto).toList();
    }

    public List<UserInfoDto> searchUsers(String query) {

        User user = this.customUserDetailsService.getAuthenticatedUser();
        List<User> users = this.userRepository.findByUsernameContainingIgnoreCase(query);
        return users.stream().filter(u -> !u.getId().equals(user.getId())).map(this.userAssembler::toDto).toList();
    }


}
