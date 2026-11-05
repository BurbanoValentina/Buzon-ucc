package com.ucc.complaints.controller;

import com.ucc.complaints.service.TelegramCommandService;
import com.ucc.complaints.service.TelegramLinkService;
import com.ucc.complaints.telegram.TelegramClient;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/public/telegram")
public class TelegramWebhookController {
    private final TelegramClient client;
    private final TelegramCommandService commandService;
    private final TelegramLinkService linkService;

    public TelegramWebhookController(TelegramClient client, TelegramCommandService commandService,
                                     TelegramLinkService linkService) {
        this.client = client;
        this.commandService = commandService;
        this.linkService = linkService;
    }

    @PostMapping("/webhook")
    public ResponseEntity<Void> webhook(
        @RequestHeader(value = "X-Telegram-Bot-Api-Secret-Token", required = false) String secret,
        @RequestBody Map<String, Object> update) {
        if (!client.acceptsWebhookSecret(secret)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        Map<String, Object> message = update.get("message") instanceof Map<?, ?> map
            ? (Map<String, Object>) map : Map.of();
        String text = message.get("text") instanceof String value ? value : "";
        Map<String, Object> from = message.get("from") instanceof Map<?, ?> map
            ? (Map<String, Object>) map : Map.of();
        String accountId = String.valueOf(from.getOrDefault("id", ""));
        String accountHash = accountId.isBlank()
            ? "" : new com.ucc.complaints.telegram.TelegramChallengeService().hash(accountId);
        if (linkService.status().linked()) {
            String response = commandService.execute(accountHash, text);
            if (!response.isBlank()) {
                client.sendMessage(accountId, response);
            }
        }
        return ResponseEntity.ok().build();
    }
}
