package com.media.api.resources.post;

import com.media.business.post.PostDto;
import com.media.business.post.PostService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/post")
public class PostController {

    private static final Logger LOG = LoggerFactory.getLogger(PostController.class);

    @Autowired
    private PostService postService;

    @PostMapping("")
    public ResponseEntity<PostDto> save(
            @RequestPart("post") PostDto postDto,
            @RequestPart(value = "file", required = false) MultipartFile file) {

        LOG.info("Request to save a new post: {}", postDto);
        PostDto savedPost = this.postService.save(postDto, file);
        LOG.debug("Post saved successfully with ID: {}", savedPost.getId());
        return ResponseEntity.status(HttpStatus.CREATED).body(savedPost);
    }

    @PutMapping("")
    public ResponseEntity<PostDto> update(@RequestBody PostDto dto) {

        LOG.info("Request to update post: {}", dto);
        if (dto.getId() == null || !this.postService.findPostById(dto.getId()).isPresent()) {
            LOG.warn("Post ID is missing or post not found for update: {}", dto.getId());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        PostDto updatedPost = this.postService.update(dto);
        LOG.debug("Post updated successfully with ID: {}", updatedPost.getId());
        return ResponseEntity.ok(updatedPost);
    }

        @GetMapping("")
        public ResponseEntity<List<PostDto>> getMyPosts () {

            LOG.info("Request to fetch current user's posts");
            List<PostDto> posts = this.postService.getMyPosts();
            return ResponseEntity.ok(posts);
        }

        //get friends posts
        @GetMapping("/friendPost")
        public ResponseEntity<List<PostDto>> getFriendsPosts () {
            LOG.info("Request to fetch friends' posts");
            List<PostDto> posts = this.postService.getFriendsPosts();
            return ResponseEntity.ok(posts);
        }

        @DeleteMapping("/{id}")
        public ResponseEntity<Void> deletePost (@PathVariable("id") String id){

            LOG.info("Request to delete post with ID: {}", id);
            if (this.postService.findPostById(id).isPresent()) {
                LOG.debug("Post with ID {} deleted successfully", id);
                this.postService.delete(id);
                return ResponseEntity.ok().build();
            } else {
                LOG.warn("Post with ID {} not found for deletion", id);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        }

    }
