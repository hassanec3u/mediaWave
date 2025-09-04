package com.media.api.resources.comment;

import com.media.api.resources.post.PostController;
import com.media.business.comment.CommentDto;
import com.media.business.comment.CommentService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/posts/{postId}/comments")
public class CommentController {

    private static final Logger LOG = LoggerFactory.getLogger(PostController.class);

    @Autowired
    private CommentService commentService;

    @PostMapping("")
    public ResponseEntity<CommentDto> saveComment(@RequestBody CommentDto dto) {

        LOG.info("Saving comment");
        CommentDto resul = this.commentService.save(dto);
        if (resul != null) {
            return ResponseEntity.ok(dto);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @GetMapping("")
    public ResponseEntity<List<CommentDto>> getCommentsByPostId(@PathVariable("postId") String postId) {

        LOG.info("Getting comments for postId: {}", postId);
        List<CommentDto> comments = this.commentService.getCommentsByPostId(postId);
        if (comments != null) {
            return ResponseEntity.ok(comments);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<Void> deleteComment(@PathVariable("commentId") String commentId) {

        LOG.info("Deleting comment with id: {}", commentId);
        boolean deleted = this.commentService.delete(commentId);
        if (deleted) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}

