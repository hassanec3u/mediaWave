package com.media.api.resources.ping;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ServerStatusController {

    @GetMapping("/status")
    public String getStatus() {
        return "Le serveur fonctionne";
    }
}

