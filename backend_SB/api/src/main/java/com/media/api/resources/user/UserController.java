package com.media.api.resources.user;

import com.media.business.user.UserInfoDto;
import com.media.business.user.UserServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    private static final Logger LOG = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserServiceImpl userService;

    @PutMapping("")
    public ResponseEntity<UserInfoDto> updateInfo(@RequestBody UserInfoDto dto) {

        return ResponseEntity.ok(this.userService.updateUser(dto));
    }

    @PostMapping("/picture")
    public ResponseEntity<UserInfoDto> uploadProfilePicture(@RequestParam("file") MultipartFile file) {
        UserInfoDto result = this.userService.uploadUserProfilPicture(file);
        LOG.info("Résultat uploadUserProfilPicture : {}", result.getProfilePicture());
        return ResponseEntity.ok(result);

    }

    @GetMapping("/username/{username}")
    public ResponseEntity<UserInfoDto> findUserByUsername(@PathVariable("username") String username) {

        return this.userService.findByUsername(username)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping()
    public ResponseEntity<UserInfoDto> getCurrentUser() {

        return ResponseEntity.ok(this.userService.getCurrentUser());

    }


    @PostMapping("/friend/{friendId}")
    public ResponseEntity<Void> sendFriendRequest(@PathVariable("friendId") String friendId) {

        return this.userService.sendFriendRequest(friendId)
                .map(dto -> ResponseEntity.ok().<Void>build())
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/friend/{friendId}/accept")
    public ResponseEntity<Void> acceptFriend(@PathVariable("friendId") String friendId) {

        return this.userService.acceptFriendRequest(friendId)
                .map(r -> ResponseEntity.ok().<Void>build())
                .orElse(ResponseEntity.notFound().build());
    }


    @DeleteMapping("/friend/{friendId}/refuse")
    public ResponseEntity<Void> refuseFriend(@PathVariable("friendId") String friendId) {

        return this.userService.refuseFriendRequest(friendId)
                .map(r -> ResponseEntity.ok().<Void>build())
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/friend/{friendId}")
    public ResponseEntity<Void> removeFriend(@PathVariable("friendId") String friendId) {

        return this.userService.removeFriend(friendId)
                .map(r -> ResponseEntity.ok().<Void>build())
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/friend")
    public ResponseEntity<List<UserInfoDto>> getFriends() {

        return ResponseEntity.ok(this.userService.getFriends());
    }

    @GetMapping("/friend/pending")
    public ResponseEntity<List<UserInfoDto>> getFriendRequests() {

        return ResponseEntity.ok(this.userService.getPendingFriendRequests());
    }


    @GetMapping("/friend/search")
    public ResponseEntity<List<UserInfoDto>> searchUsers(@RequestParam("query") String query) {

        List<UserInfoDto> users = this.userService.searchUsers(query);
        if (users == null || users.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(users);
    }
}