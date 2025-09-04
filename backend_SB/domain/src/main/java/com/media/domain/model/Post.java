package com.media.domain.model;

import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;


@Document(collection = "post")
public class Post {

    private String id;

    private String title;

    private String content;

    private String postPicture;

    private Instant postDate;

    private String publisherId;

    private String publisherName;


    public String getId() {

        return this.id;
    }

    public void setId(String id) {

        this.id = id;
    }

    public String getTitle() {

        return this.title;
    }

    public void setTitle(String title) {

        this.title = title;
    }

    public String getContent() {

        return this.content;
    }

    public void setContent(String content) {

        this.content = content;
    }

    public String getPostPicture() {

        return this.postPicture;
    }

    public void setPostPicture(String postPicture) {

        this.postPicture = postPicture;
    }

    public Instant getPostDate() {

        return this.postDate;
    }

    public void setPostDate(Instant postDate) {

        this.postDate = postDate;
    }

    public String getPublisherName() {

        return this.publisherName;
    }

    public void setPublisherName(String publisherName) {

        this.publisherName = publisherName;
    }

    public String getPublisherId() {

        return this.publisherId;
    }

    public void setPublisherId(String publisherId) {

        this.publisherId = publisherId;
    }
}
