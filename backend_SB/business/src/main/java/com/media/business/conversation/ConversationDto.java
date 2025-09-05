package com.media.business.conversation;

import com.media.business.common.SimpleDto;

import java.time.Instant;
import java.util.Set;

public class ConversationDto implements SimpleDto {

    private static final long serialVersionUID = 1L;

    private String id;

    private Set<String> participantIds;

    private Instant createdAt;

    private Instant updatedAt;

    private String lastMessage;

    public String getId() {

        return this.id;
    }

    public void setId(String id) {

        this.id = id;
    }


    public String getLastMessage() {

        return this.lastMessage;
    }

    public void setLastMessage(String lastMessage) {

        this.lastMessage = lastMessage;
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

    public Set<String> getParticipantIds() {

        return this.participantIds;
    }

    public void setParticipantIds(Set<String> participantIds) {

        this.participantIds = participantIds;
    }
}
