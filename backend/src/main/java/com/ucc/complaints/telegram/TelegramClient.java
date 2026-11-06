package com.ucc.complaints.telegram;

import java.util.Map;

public interface TelegramClient {
    void sendMessage(String chatId, String message);
    boolean acceptsWebhookSecret(String secret);
    Map<String, Object> buildUpdate(String messageText, String accountId);
}
