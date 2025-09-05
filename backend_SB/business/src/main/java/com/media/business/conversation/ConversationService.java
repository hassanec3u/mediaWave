package com.media.business.conversation;

import com.media.business.authentification.CustomUserDetailsService;
import com.media.domain.model.Conversation;
import com.media.domain.repository.ConversationRepository;
import com.media.domain.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.*;

@Service
public class ConversationService {

    @Autowired
    private ConversationRepository conversationRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Autowired
    private ConversationAssembler conversationAssembler;


    /**
     * Crée une nouvelle conversation 1-to-1 ou retourne l’existante (idempotent).
     */
    public ConversationDto save(ConversationDto dto) {

        Set<String> participantIds = dto.getParticipantIds();
        if (participantIds.size() != 2 || participantIds.contains(null)) {
            throw new IllegalArgumentException("Conversation must have exactly 2 distinct non-null users");
        }

        List<String> ids = new ArrayList<>(dto.getParticipantIds());

        this.conversationRepository.findByParticipants(ids.get(0), ids.get(1))
                .ifPresent(existingConv -> {
                    throw new IllegalArgumentException("Conversation already exists with ID: " + existingConv.getId());
                });

        return this.conversationAssembler.toDto(this.conversationRepository.save(this.conversationAssembler.fromDto(dto)));
    }

    /**
     * Met à jour le dernier message d’une conversation.
     */
    public void updateLastMessage(String conversationId, String content) {

        Conversation conv = this.conversationRepository.findById(conversationId)
                .orElseThrow(() -> new IllegalArgumentException("Conversation not found: " + conversationId));

        conv.setUpdatedAt(Instant.now());
        conv.setLastMessage(content);
        this.conversationRepository.save(conv);
    }

    /**
     * Récupère les conversations d’un user, triées par updatedAt (desc).
     */
    public List<ConversationDto> getAll() {

        String userId = this.customUserDetailsService.getAuthenticatedUser().getId();

        List<Conversation> list = this.conversationRepository.findByParticipantIdsContainsOrderByUpdatedAtDesc(userId);
        return this.conversationAssembler.toDtoList(list);
    }


}
