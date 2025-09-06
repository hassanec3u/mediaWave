package com.media.business.chatmessage;

import com.media.business.conversation.ConversationService;
import com.media.domain.model.ChatMessage;
import com.media.domain.repository.ChatMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
public class ChatMessageService {

    @Autowired
    private ChatMessageRepository chatMessageRepository;

    @Autowired
    private ChatMessageAssembler chatMessageAssembler;

    @Autowired
    private ConversationService conversationService;

    public ChatMessageDto save(ChatMessageDto chatMessageDto) {

        chatMessageDto.setCreatedAt(Instant.now());
        ChatMessageDto result = this.chatMessageAssembler.toDto(this.chatMessageRepository.save(this.chatMessageAssembler.fromDto(chatMessageDto)));
        this.conversationService.updateLastMessage(chatMessageDto.getConversationId(), chatMessageDto.getContent());
        return result;
    }

    public List<ChatMessageDto> getAll(String conversationId) {

        Pageable pageable = PageRequest.of(0, 10);
        Page<ChatMessage> messages = this.chatMessageRepository
                .findByConversationIdOrderByCreatedAtDesc(conversationId, pageable);

        return this.chatMessageAssembler.toDtoList(messages.getContent());
    }


}
