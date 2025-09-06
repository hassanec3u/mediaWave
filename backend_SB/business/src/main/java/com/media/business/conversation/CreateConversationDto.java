package com.media.business.conversation;

import com.media.business.common.SimpleDto;

import java.io.Serial;

public class CreateConversationDto implements SimpleDto {

    @Serial
    private static final long serialVersionUID = 1L;

    private String otherMemberId;


    public String getOtherMemberId() {

        return this.otherMemberId;
    }

    public void setOtherMemberId(String otherMemberId) {

        this.otherMemberId = otherMemberId;
    }
}
