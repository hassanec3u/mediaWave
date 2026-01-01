package com.media.api.resources.conversation;

import com.media.business.conversation.ConversationDto;
import com.media.business.conversation.ConversationService;
import com.media.business.conversation.CreateConversationDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/conversation")
public class ConversationController {

    private static final Logger LOG = LoggerFactory.getLogger(ConversationController.class);


    @Autowired
    private ConversationService conversationService;

    @PostMapping("")
    public ResponseEntity<ConversationDto> save(@RequestBody CreateConversationDto dto) {

        LOG.info("save conversation {}", dto.getOtherMemberId());
        return ResponseEntity.ok(this.conversationService.save(dto));
    }


    @GetMapping("")
    public ResponseEntity<List<ConversationDto>> getAll() {

        LOG.info("get all conversations ");
        return ResponseEntity.ok(this.conversationService.getAll());
    }
}