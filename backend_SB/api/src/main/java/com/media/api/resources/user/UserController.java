package com.media.api.resources.user;

import com.media.business.post.PostDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.media.business.user.UserInfoDto;
import com.media.business.user.UserServiceImpl;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserServiceImpl userService;

   /* @Autowired
    private  PostService postService;*/


    @PutMapping("/{id}")
    public ResponseEntity<UserInfoDto> updateInfo(@PathVariable String id, @RequestBody UserInfoDto dto) {

        return this.userService.updateUser(dto)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/username/{username}")
    public ResponseEntity<UserInfoDto> findUserByUsername(@PathVariable("username") String username) {

        return this.userService.findByUsername(username)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping()
    public ResponseEntity<UserInfoDto> getCurrentUser() {

        return this.userService.getCurrentUser()
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }


    @PostMapping("/friends/{friendId}")
    public ResponseEntity<Void> sendFriendRequest(@PathVariable("friendId") String friendId) {

        return this.userService.sendFriendRequest(friendId)
                .map(dto -> ResponseEntity.ok().<Void>build())
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/friends/{friendId}/accept")
    public ResponseEntity<Void> acceptFriend(@PathVariable("friendId") String friendId) {

        return this.userService.acceptFriendRequest(friendId)
                .map(r -> ResponseEntity.ok().<Void>build())
                .orElse(ResponseEntity.notFound().build());
    }


    @DeleteMapping("/friends/{friendId}/refuse")
    public ResponseEntity<Void> refuseFriend(@PathVariable("friendId") String friendId) {

        return this.userService.refuseFriendRequest(friendId)
                .map(r -> ResponseEntity.ok().<Void>build())
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/friends/{friendId}")
    public ResponseEntity<Void> removeFriend(@PathVariable("friendId") String friendId) {

        return this.userService.removeFriend(friendId)
                .map(r -> ResponseEntity.ok().<Void>build())
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/friends")
    public ResponseEntity<List<UserInfoDto>> getFriends() {

        return ResponseEntity.ok(this.userService.getFriends());
    }

    @GetMapping("/friends/pending")
    public ResponseEntity<List<UserInfoDto>> getFriendRequests() {

        return ResponseEntity.ok(this.userService.getPendingFriendRequests());
    }



    @GetMapping("/search")
    public ResponseEntity<List<UserInfoDto>> searchUsers(@RequestParam("query") String query) {
        List<UserInfoDto> users = this.userService.searchUsers(query);
        if (users == null || users.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(users);
    }

    /*

    @PutMapping("/picture/{id}")
    public ResponseEntity<UserInfoDto> updateProfilePicture(@PathVariable String id, @RequestBody ProfilePictureRequest body) {
        return ResponseEntity.ok(userService.updateProfilePicture(id, body.getProfilePicture()));
    }

*/




}