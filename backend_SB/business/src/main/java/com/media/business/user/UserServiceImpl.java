package com.media.business.user;


import com.media.business.authentification.CustomUserDetailsService;
import com.media.domain.model.User;
import com.media.domain.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl {

    private static final Logger LOG = LoggerFactory.getLogger(UserServiceImpl.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Autowired
    private UserMapper userMapper;

    public Optional<UserInfoDto> findByUsername(String username) {

        //retourne la valeur du repository en utilisant le username
        return this.userRepository.findByUsername(username).map(this.userMapper::toDto);
    }

    public Optional<UserInfoDto> findById(String id) {

        return this.userRepository.findById(id).map(this.userMapper::toDto);
    }

    public Optional<UserInfoDto> updateUser(UserInfoDto updateUserInfo) {

        User user = this.customUserDetailsService.getAuthenticatedUser();

        User existingUser = this.userRepository.findById(user.getId()).orElseThrow(() -> new RuntimeException("User not found"));
        User updatedUser = this.userMapper.fromDto(updateUserInfo);
        this.userRepository.save(updatedUser);
        return Optional.of(this.userMapper.toDto(existingUser));

    }


    public Optional<UserInfoDto> getCurrentUser() {

        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return this.userRepository.findByUsername(username).map(this.userMapper::toDto);
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
        return Optional.of(this.userMapper.toDto(friend));
    }

    public Optional<UserInfoDto> refuseFriendRequest(String friendId) {

        User user = this.customUserDetailsService.getAuthenticatedUser();
        User friend = this.userRepository.findById(friendId).orElseThrow();

        user.getFriendsRequests().remove(friend);
        this.userRepository.save(user);
        return Optional.of(this.userMapper.toDto(user));
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

        return Optional.of(this.userMapper.toDto(user));
    }


    public Optional<UserInfoDto> removeFriend(String friendId) {

        User user = this.customUserDetailsService.getAuthenticatedUser();
        User friend = this.userRepository.findById(friendId).orElseThrow();

        user.getFriends().remove(friend);
        friend.getFriends().remove(user);

        this.userRepository.save(user);
        this.userRepository.save(friend);

        return Optional.of(this.userMapper.toDto(user));
    }

    public List<UserInfoDto> getFriends() {

        User user = this.customUserDetailsService.getAuthenticatedUser();

        return user.getFriends().stream().map(friend -> this.userRepository.findById(friend.getId()).orElse(null)).filter(Objects::nonNull).map(this.userMapper::toDto).collect(Collectors.toList());
    }

    public List<UserInfoDto> getPendingFriendRequests() {

        User user = this.customUserDetailsService.getAuthenticatedUser();

        return user.getFriendsRequests().stream().map(requester -> this.userRepository.findById(requester.getId()).orElse(null)).filter(Objects::nonNull).map(this.userMapper::toDto).collect(Collectors.toList());
    }

    public List<UserInfoDto> searchUsers(String query) {

        User user = this.customUserDetailsService.getAuthenticatedUser();
        List<User> users = this.userRepository.findByUsernameContainingIgnoreCase(query);
        return users.stream().filter(u -> !u.getId().equals(user.getId())).map(this.userMapper::toDto).collect(Collectors.toList());
    }


}
