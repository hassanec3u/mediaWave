package com.media.domain.model;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Document(collection = "comment")
public class Comment {

    @Id
    private String id;

    private String content;

    private Instant createdAt;

    private String postId;

    private String authorId;

    private String authorUsername;

    public String getId() {

        return this.id;
    }

    public void setId(String id) {

        this.id = id;
    }

    public String getContent() {

        return this.content;
    }

    public void setContent(String content) {

        this.content = content;
    }

    public Instant getCreatedAt() {

        return this.createdAt;
    }

    public void setCreatedAt(Instant createdAt) {

        this.createdAt = createdAt;
    }

    public String getPostId() {

        return this.postId;
    }

    public void setPostId(String postId) {

        this.postId = postId;
    }

    public String getAuthorId() {

        return this.authorId;
    }

    public void setAuthorId(String authorId) {

        this.authorId = authorId;
    }

    public String getAuthorUsername() {

        return this.authorUsername;
    }

    public void setAuthorUsername(String authorUsername) {

        this.authorUsername = authorUsername;
    }
}