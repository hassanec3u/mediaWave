package com.media.domain.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.Set;

@Document("conversation")
public class Conversation {

    @Id
    private String id;

    @Indexed
    private Set<User> members;

    private String messages;

    private Instant createdAt;

    private Instant updatedAt;

    private String lastMessage;

    public String getId() {

        return this.id;
    }

    public void setId(String id) {

        this.id = id;
    }

    public Instant getCreatedAt() {

        return this.createdAt;
    }

    public void setCreatedAt(Instant createdAt) {

        this.createdAt = createdAt;
    }

    public Instant getUpdatedAt() {

        return this.updatedAt;
    }

    public void setUpdatedAt(Instant updatedAt) {

        this.updatedAt = updatedAt;
    }

    public String getMessages() {

        return this.messages;
    }

    public void setMessages(String messages) {

        this.messages = messages;
    }

    public String getLastMessage() {

        return this.lastMessage;
    }

    public void setLastMessage(String lastMessage) {

        this.lastMessage = lastMessage;
    }

    public Set<User> getMembers() {

        return this.members;
    }

    public void setMembers(Set<User> members) {

        this.members = members;
    }

}