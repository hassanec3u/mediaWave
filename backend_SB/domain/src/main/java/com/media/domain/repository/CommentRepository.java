package com.media.domain.repository;

import com.media.domain.model.Comment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CommentRepository extends MongoRepository<Comment, String> {


    /**
     * Find comments by postId ordered by createdAt descending
     * @param postId
     * @return
     */
    List<Comment> findByPostIdOrderByCreatedAtDesc(String postId);


}
