package com.media.domain.repository;

import com.media.domain.model.Comment;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface CommentRepository extends MongoRepository<Comment, String> {


    List<Comment> findByPostIdOrderByCreatedAtDesc(String postId);
}
