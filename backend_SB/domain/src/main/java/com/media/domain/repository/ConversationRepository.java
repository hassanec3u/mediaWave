package com.media.domain.repository;

import com.media.domain.model.Conversation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ConversationRepository extends MongoRepository<Conversation, String> {

    /**
     * Find a conversation by exactly two participant IDs.
     * @param user1
     * @param user2
     * @return
     */
    @Query("{ $and: [ { 'participantIds': { $all: [?0, ?1] } }, { 'participantIds': { $size: 2 } } ] }")
    Optional<Conversation> findByParticipants(String user1, String user2);


    /**
     * Find conversations by participant ID, ordered by update time descending.
     * @param userId
     * @return
     */
    List<Conversation> findByParticipantIdsContainsOrderByUpdatedAtDesc(String userId);
}
