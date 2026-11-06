package com.ucc.complaints.service;

import com.ucc.complaints.model.TelegramLink;
import com.ucc.complaints.repository.TelegramLinkRepository;
import com.ucc.complaints.telegram.TelegramClient;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.OffsetDateTime;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.contains;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TelegramNotificationServiceTest {
    @Mock
    private TelegramLinkRepository links;

    @Mock
    private TelegramClient client;

    private TelegramNotificationService service;

    @BeforeEach
    void setUp() {
        service = new TelegramNotificationService(links, client);
    }

    @Test
    void notifiesWhenActiveAndEnabled() {
        TelegramLink link = new TelegramLink("hash-123", OffsetDateTime.now());
        link.setNotificationsEnabled(true);
        when(links.findFirstByActiveTrue()).thenReturn(Optional.of(link));

        service.notifyNewComplaint("C-1", "Infraestructura");

        verify(client).sendMessage(eq("hash-123"), contains("Infraestructura"));
    }

    @Test
    void doesNotNotifyWhenDisabled() {
        TelegramLink link = new TelegramLink("hash-123", OffsetDateTime.now());
        link.setNotificationsEnabled(false);
        when(links.findFirstByActiveTrue()).thenReturn(Optional.of(link));

        service.notifyNewComplaint("C-1", "Infraestructura");

        verifyNoInteractions(client);
    }

    @Test
    void handlesClientExceptionGracefully() {
        TelegramLink link = new TelegramLink("hash-123", OffsetDateTime.now());
        link.setNotificationsEnabled(true);
        when(links.findFirstByActiveTrue()).thenReturn(Optional.of(link));
        doThrow(new RuntimeException("Telegram unreachable")).when(client).sendMessage(any(), any());

        // Debe capturar la excepción y no propagarla
        service.notifyNewComplaint("C-1", "Infraestructura");
    }
}
