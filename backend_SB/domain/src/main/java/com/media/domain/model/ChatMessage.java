package com.media.domain.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Document(collection = "chatMessage")
public class ChatMessage {

    @Id
    private String id;

    private String content;

    private String senderId;

    private String receiverId;

    private Instant createdAt;

    private String conversationId;

    private boolean read;

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

    public String getSenderId() {

        return this.senderId;
    }

    public void setSenderId(String senderId) {

        this.senderId = senderId;
    }

    public String getReceiverId() {

        return this.receiverId;
    }

    public void setReceiverId(String receiverId) {

        this.receiverId = receiverId;
    }

    public Instant getCreatedAt() {

        return this.createdAt;
    }

    public void setCreatedAt(Instant createdAt) {

        this.createdAt = createdAt;
    }

    public boolean isRead() {

        return this.read;
    }

    public void setRead(boolean read) {

        this.read = read;
    }

    public String getConversationId() {

        return this.conversationId;
    }

    public void setConversationId(String conversationId) {

        this.conversationId = conversationId;
    }
}
