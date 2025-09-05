package com.media.api.resources.conversation;

import com.media.business.conversation.ConversationDto;
import com.media.business.conversation.ConversationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/conversation")
public class ConversationController {

    @Autowired
    private ConversationService conversationService;


    @PostMapping
    public ResponseEntity<ConversationDto> save(@RequestBody ConversationDto dto) {
        return ResponseEntity.ok(this.conversationService.save(dto));
    }


    @GetMapping("")
    public ResponseEntity<List<ConversationDto>> getAll() {
        return ResponseEntity.ok(this.conversationService.getAll());
    }
}