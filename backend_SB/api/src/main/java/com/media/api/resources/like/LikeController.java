package com.media.api.resources.like;

import com.media.business.like.LikeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/post/{postId}/like")
public class LikeController {

    private final LikeService likeService;

    public LikeController(LikeService likeService) {

        this.likeService = likeService;
    }

    @PostMapping("")
    public ResponseEntity<Void> like(@PathVariable("postId") String postId) {

        this.likeService.like(postId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("")
    public ResponseEntity<Void> unlike(@PathVariable("postId") String postId) {

        this.likeService.unlike(postId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/count")
    public ResponseEntity<Long> count(@PathVariable("postId") String postId) {

        return ResponseEntity.ok(this.likeService.getNumberOfLikes(postId));
    }

    @GetMapping("/has-liked")
    public ResponseEntity<Boolean> hasLiked(@PathVariable("postId") String postId) {

        return ResponseEntity.ok(this.likeService.hasLiked(postId));
    }
}
