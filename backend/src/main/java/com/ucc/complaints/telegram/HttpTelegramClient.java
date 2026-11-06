package com.ucc.complaints.telegram;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import java.util.Map;

@Component
public class HttpTelegramClient implements TelegramClient {
    private final String botToken;
    private final String webhookSecret;
    private final boolean enabled;

    public HttpTelegramClient(
        @Value("${telegram.bot-token:}") String botToken,
        @Value("${telegram.webhook-secret:}") String webhookSecret,
        @Value("${telegram.enabled:false}") boolean enabled) {
        this.botToken = botToken;
        this.webhookSecret = webhookSecret;
        this.enabled = enabled;
    }

    @Override
    public void sendMessage(String chatId, String message) {
        if (!enabled || botToken.isBlank()) {
            return;
        }
        try {
            RestClient.create().post()
                .uri("https://api.telegram.org/bot" + botToken + "/sendMessage")
                .body(Map.of("chat_id", chatId, "text", message))
                .retrieve().toBodilessEntity();
        } catch (RuntimeException exception) {
            throw new TelegramDeliveryException("No fue posible entregar el aviso por Telegram.", exception);
        }
    }

    @Override
    public boolean acceptsWebhookSecret(String secret) {
        return enabled && !webhookSecret.isBlank() && webhookSecret.equals(secret);
    }

    @Override
    public Map<String, Object> buildUpdate(String messageText, String accountId) {
        return Map.of("text", messageText == null ? "" : messageText, "accountId", accountId == null ? "" : accountId);
    }
}
