package com.media.business.like;

import com.media.business.authentification.CustomUserDetailsService;
import com.media.domain.model.Post;
import com.media.domain.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
public class LikeService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    public void like(String postId) {

        String userId = this.customUserDetailsService.getAuthenticatedUser().getId();

        Post post = this.postRepository.findById(postId)
                .orElseThrow(() -> new NoSuchElementException("Post not found"));
        if (!post.getLikeUserIds().contains(userId)) {
            post.getLikeUserIds().add(userId);
            this.postRepository.save(post);
        }
    }

    public void unlike(String postId) {

        String userId = this.customUserDetailsService.getAuthenticatedUser().getId();

        Post post = this.postRepository.findById(postId)
                .orElseThrow(() -> new NoSuchElementException("Post not found"));
        if (post.getLikeUserIds().remove(userId)) {
            this.postRepository.save(post);
        }
    }

    public long getNumberOfLikes(String postId) {

        Post post = this.postRepository.findById(postId)
                .orElseThrow(() -> new NoSuchElementException("Post not found"));
        return post.getLikeUserIds().size();
    }

    public boolean hasLiked(String postId) {

        String userId = this.customUserDetailsService.getAuthenticatedUser().getId();

        Post post = this.postRepository.findById(postId)
                .orElseThrow(() -> new NoSuchElementException("Post not found"));
        return post.getLikeUserIds().contains(userId);
    }
}

