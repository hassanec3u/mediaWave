package com.media.business.comment;

import com.media.business.authentification.CustomUserDetailsService;
import com.media.domain.model.Comment;
import com.media.domain.model.Post;
import com.media.domain.model.User;
import com.media.domain.repository.CommentRepository;
import com.media.domain.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private CommentAssembler commentAssembler;


    public CommentDto save(CommentDto dto) {

        User currentUser = this.customUserDetailsService.getAuthenticatedUser();
        dto.setAuthorId(currentUser.getId());
        dto.setCreatedAt(Instant.now());
        dto.setAuthorUsername(currentUser.getUsername());
        return this.commentAssembler.toDto(this.commentRepository.save(this.commentAssembler.fromDto(dto)));
    }

    public List<CommentDto> getCommentsByPostId(String postId) {

        return this.commentAssembler.toDtoList(this.commentRepository.findByPostIdOrderByCreatedAtDesc(postId));
    }

    public boolean delete(String commentId) {

        User currentUser = this.customUserDetailsService.getAuthenticatedUser();
        Comment comment = this.commentRepository.findById(commentId).orElseThrow(() -> new RuntimeException("Comment not found"));
        Post post = this.postRepository.findById(comment.getPostId()).orElseThrow(() -> new RuntimeException("Post not found"));

        boolean isCommentOwner = comment.getAuthorId().equals(currentUser.getId());
        boolean isPostOwner = post.getPublisherId().equals(currentUser.getId());

        if (!isCommentOwner && !isPostOwner) {
            throw new RuntimeException("Access denied: You are not authorized to delete this comment.");
        }

        this.commentRepository.delete(comment);
        return true;
    }

}
