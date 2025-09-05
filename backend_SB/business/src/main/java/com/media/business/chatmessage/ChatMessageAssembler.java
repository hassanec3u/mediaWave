package com.media.business.chatmessage;


import com.media.business.common.Assembler;
import com.media.domain.model.ChatMessage;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatMessageAssembler implements Assembler<ChatMessage, ChatMessageDto> {


    @Override
    public ChatMessageDto toDto(ChatMessage entity) {

        if (entity == null) {
            return null;
        }
        ChatMessageDto chatMessageDto = new ChatMessageDto();
        chatMessageDto.setId(entity.getId());
        chatMessageDto.setContent(entity.getContent());
        chatMessageDto.setSenderId(entity.getSenderId());
        chatMessageDto.setReceiverId(entity.getReceiverId());
        chatMessageDto.setConversationId(entity.getConversationId());
        return chatMessageDto;
    }

    @Override
    public ChatMessage fromDto(ChatMessageDto dto) {

        if (dto == null) {
            return null;
        }
        ChatMessage chatMessage = new ChatMessage();
        chatMessage.setId(dto.getId());
        chatMessage.setContent(dto.getContent());
        chatMessage.setSenderId(dto.getSenderId());
        chatMessage.setReceiverId(dto.getReceiverId());
        chatMessage.setConversationId(dto.getConversationId());
        return chatMessage;
    }

    @Override
    public List<ChatMessageDto> toDtoList(List<ChatMessage> entities) {

        if (entities == null) {
            return List.of();
        }
        return entities.stream().map(this::toDto).toList();
    }

    @Override
    public List<ChatMessage> fromDtoList(List<ChatMessageDto> dtos) {

        if (dtos == null) {
            return List.of();
        }
        return dtos.stream().map(this::fromDto).toList();
    }
}
