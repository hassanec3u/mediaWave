package com.media.domain.repository;

import com.media.domain.model.Post;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends MongoRepository<Post, String> {

    List<Post> findByPublisherIdOrderByPostDateDesc(String userId);

    List<Post> findByPublisherIdInOrderByPostDateDesc(List<String> publisherIds);
}