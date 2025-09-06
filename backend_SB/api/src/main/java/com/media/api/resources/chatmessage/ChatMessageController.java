package com.media.api.resources.chatmessage;

import com.media.business.chatmessage.ChatMessageDto;
import com.media.business.chatmessage.ChatMessageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/message")
public class ChatMessageController {

    private static final Logger LOG = LoggerFactory.getLogger(ChatMessageController.class);

    @Autowired
    private ChatMessageService chatMessageService;

    /**
     * Envoi d’un nouveau message
     */
    @PostMapping("")
    public ResponseEntity<ChatMessageDto> sendMessage(@RequestBody ChatMessageDto chatMessageDto) {

        LOG.info("send message {}", chatMessageDto.getContent());
        ChatMessageDto saved = this.chatMessageService.save(chatMessageDto);
        return ResponseEntity.ok(saved);
    }

    /**
     * Récupération des derniers messages d’une conversation
     */
    @GetMapping("history/{conversationId}")
    public ResponseEntity<List<ChatMessageDto>> getMessages(@PathVariable("conversationId") String conversationId) {

        LOG.info("get messages for conversationId {}", conversationId);
        List<ChatMessageDto> messages = this.chatMessageService.getAll(conversationId);
        return ResponseEntity.ok(messages);
    }
}
