package com.media.business.conversation;

import com.media.business.common.Assembler;
import com.media.business.user.UserAssembler;
import com.media.domain.model.Conversation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;

@Service
public class ConversationAssembler implements Assembler<Conversation, ConversationDto> {

    @Autowired
    private UserAssembler userAssembler;

    @Override
    public ConversationDto toDto(Conversation entity) {

        if (entity == null) {
            return null;
        }
        ConversationDto dto = new ConversationDto();
        dto.setId(entity.getId());
        dto.setLastMessage(entity.getLastMessage());
        dto.setCreatedAt(entity.getCreatedAt());
        dto.setUpdatedAt(entity.getUpdatedAt());
        dto.setMembers(new HashSet<>(this.userAssembler.toDtoList(entity.getMembers().stream().toList())));
        return dto;
    }

    @Override
    public Conversation fromDto(ConversationDto dto) {

        if (dto == null) {
            return null;
        }
        Conversation conversation = new Conversation();
        conversation.setId(dto.getId());
        conversation.setLastMessage(dto.getLastMessage());
        conversation.setCreatedAt(dto.getCreatedAt());
        conversation.setUpdatedAt(dto.getUpdatedAt());
        conversation.setMembers(new HashSet<>(this.userAssembler.fromDtoList(dto.getMembers().stream().toList())));
        return conversation;
    }


    @Override
    public List<ConversationDto> toDtoList(List<Conversation> entities) {

        if (entities == null) {
            return List.of();
        }
        return entities.stream().map(this::toDto).toList();
    }

    @Override
    public List<Conversation> fromDtoList(List<ConversationDto> dtos) {

        if (dtos == null) {
            return List.of();
        }
        return dtos.stream().map(this::fromDto).toList();

    }
}
