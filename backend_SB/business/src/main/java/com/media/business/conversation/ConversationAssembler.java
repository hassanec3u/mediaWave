package com.media.business.conversation;

import com.media.business.common.Assembler;
import com.media.domain.model.Conversation;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ConversationAssembler implements Assembler<Conversation, ConversationDto> {


    @Override
    public ConversationDto toDto(Conversation entity) {

        if (entity == null) {
            return null;
        }
        ConversationDto dto = new ConversationDto();
        dto.setId(entity.getId());
        dto.setParticipantIds(entity.getParticipantIds());
        dto.setLastMessage(entity.getLastMessage());
        dto.setCreatedAt(entity.getCreatedAt());
        dto.setUpdatedAt(entity.getUpdatedAt());
        return dto;
    }

    @Override
    public Conversation fromDto(ConversationDto dto) {

        if (dto == null) {
            return null;
        }
        Conversation conversation = new Conversation();
        conversation.setId(dto.getId());
        conversation.setParticipantIds(dto.getParticipantIds());
        conversation.setLastMessage(dto.getLastMessage());
        conversation.setCreatedAt(dto.getCreatedAt());
        conversation.setUpdatedAt(dto.getUpdatedAt());
        return conversation;
    }


    @Override
    public List<ConversationDto> toDtoList(List<Conversation> entities) {

        return List.of();
    }

    @Override
    public List<Conversation> fromDtoList(List<ConversationDto> dtos) {

        return List.of();
    }
}
