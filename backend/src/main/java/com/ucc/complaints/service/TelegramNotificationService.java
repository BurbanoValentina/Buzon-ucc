package com.ucc.complaints.service;

import com.ucc.complaints.repository.TelegramLinkRepository;
import com.ucc.complaints.telegram.TelegramClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class TelegramNotificationService {
    private static final Logger LOGGER = LoggerFactory.getLogger(TelegramNotificationService.class);
    private final TelegramLinkRepository links;
    private final TelegramClient client;

    public TelegramNotificationService(TelegramLinkRepository links, TelegramClient client) {
        this.links = links;
        this.client = client;
    }

    public void notifyNewComplaint(String publicId, String category) {
        try {
            links.findFirstByActiveTrue().filter(link -> link.isNotificationsEnabled()).ifPresent(link -> {
                String safeCategory = category == null ? "" : category.replaceAll("[\\r\\n]", " ");
                client.sendMessage(link.getTelegramAccountHash(),
                    "Nueva queja recibida. Categoría: " + safeCategory + ". ID público disponible en el panel.");
            });
        } catch (RuntimeException exception) {
            LOGGER.warn("telegram_notification_failed=true; complaint remains registered");
        }
    }
}
