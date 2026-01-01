package com.media.business.conversation;

import com.media.business.authentification.CustomUserDetailsService;
import com.media.business.user.UserAssembler;
import com.media.domain.model.Conversation;
import com.media.domain.model.User;
import com.media.domain.repository.ConversationRepository;
import com.media.domain.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Set;

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

    @Autowired
    private UserAssembler userAssembler;


    /**
     * Crée une nouvelle conversation 1-to-1 ou retourne l’existante (idempotent).
     */
    public ConversationDto save(CreateConversationDto dto) {

        User currentUser = this.customUserDetailsService.getAuthenticatedUser();

        //we fetch the other user entity to ensure it exists
        User otherUser = this.userRepository.findById(dto.getOtherMemberId())
                .orElseThrow(() -> new IllegalArgumentException("User not found: " + dto.getOtherMemberId()));

        if (currentUser.getId().equals(otherUser.getId())) {
            throw new IllegalArgumentException("Cannot create a conversation with oneself");
        }

        this.conversationRepository.findByParticipants(currentUser.getId(), otherUser.getId())
                .ifPresent(existingConv -> {
                    throw new IllegalArgumentException("Conversation already exists with ID: " + existingConv.getId());
                });


        ConversationDto conversationDto = new ConversationDto();
        conversationDto.setCreatedAt(Instant.now());
        conversationDto.setUpdatedAt(Instant.now());
        conversationDto.setMembers(Set.of(
                this.userAssembler.toDto(currentUser),
                this.userAssembler.toDto(otherUser)
        ));
        return this.conversationAssembler.toDto(
                this.conversationRepository.save(this.conversationAssembler.fromDto(conversationDto))
        );
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
        List<Conversation> list = this.conversationRepository.findByMembersIdOrderByUpdatedAtDesc(userId);
        return this.conversationAssembler.toDtoList(list);
    }


}
