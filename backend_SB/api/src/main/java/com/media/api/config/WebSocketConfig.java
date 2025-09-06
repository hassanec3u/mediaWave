package com.media.api.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.*;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws")              // endpoint WebSocket
                .setAllowedOriginPatterns("*")   // à restreindre en prod
                .withSockJS();                   // fallback SockJS
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/topic");   // destinations vers lesquelles on envoie
        registry.setApplicationDestinationPrefixes("/app"); // destinations côté @MessageMapping
    }
}
