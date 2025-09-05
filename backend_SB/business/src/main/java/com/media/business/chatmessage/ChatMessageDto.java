package com.media.business.chatmessage;

import java.io.Serializable;
import java.time.Instant;

public class ChatMessageDto implements Serializable {

    private static final long serialVersionUID = 1L;

    private String id;

    private String content;

    private String senderId;

    private String receiverId;

    private Instant createdAt;

    private String conversationId;


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

    public String getConversationId() {

        return this.conversationId;
    }

    public void setConversationId(String conversationId) {

        this.conversationId = conversationId;
    }
}
