package com.media.business.post;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.media.business.comment.CommentDto;
import com.media.business.common.SimpleDto;


import java.time.Instant;
import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class PostDto implements SimpleDto {

    private static final long serialVersionUID = 1L;

    private String id;

    private String title;

    private String content;

    private String postPicture;

    private String publisherId;

    private String publisherProfilePicture;

    private String publisherName;

    private Instant postDate;

    private List<String> likeUserIds;

    private CommentDto lastComment;



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

    public String getPublisherId() {

        return this.publisherId;
    }

    public void setPublisherId(String publisherId) {

        this.publisherId = publisherId;
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

    public String getId() {

        return this.id;
    }

    public void setId(String id) {

        this.id = id;
    }

    public List<String> getLikeUserIds() {

        return this.likeUserIds;
    }

    public void setLikeUserIds(List<String> likeUserIds) {

        this.likeUserIds = likeUserIds;
    }

    public String getPublisherProfilePicture() {

        return this.publisherProfilePicture;
    }

    public void setPublisherProfilePicture(String publisherProfilePicture) {

        this.publisherProfilePicture = publisherProfilePicture;
    }

    public CommentDto getLastComment() {

        return this.lastComment;
    }

    public void setLastComment(CommentDto lastComment) {

        this.lastComment = lastComment;
    }
}
