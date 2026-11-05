package com.ucc.complaints.service;

import com.ucc.complaints.model.TelegramLink;
import com.ucc.complaints.repository.TelegramLinkRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;

@Service
public class TelegramLinkService {
    private final TelegramLinkRepository repository;
    private final AuditService auditService;

    public TelegramLinkService(TelegramLinkRepository repository, AuditService auditService) {
        this.repository = repository;
        this.auditService = auditService;
    }

    @Transactional
    public TelegramLinkStatus link(String accountHash) {
        repository.findFirstByActiveTrue().ifPresent(current -> {
            current.setActive(false);
            current.setUnlinkedAt(OffsetDateTime.now());
            repository.save(current);
        });
        TelegramLink linked = new TelegramLink(accountHash, OffsetDateTime.now());
        repository.save(linked);
        auditService.record("TELEGRAM_LINK", "administrator");
        return status();
    }

    @Transactional
    public TelegramLinkStatus unlink() {
        repository.findFirstByActiveTrue().ifPresent(link -> {
            link.setActive(false);
            link.setNotificationsEnabled(false);
            link.setUnlinkedAt(OffsetDateTime.now());
            repository.save(link);
        });
        auditService.record("TELEGRAM_UNLINK", "administrator");
        return status();
    }

    public TelegramLinkStatus status() {
        return repository.findFirstByActiveTrue()
            .map(link -> new TelegramLinkStatus(true, link.isNotificationsEnabled()))
            .orElseGet(() -> new TelegramLinkStatus(false, false));
    }

    @Transactional
    public TelegramLinkStatus setNotifications(boolean enabled) {
        repository.findFirstByActiveTrue().ifPresent(link -> {
            link.setNotificationsEnabled(enabled);
            repository.save(link);
        });
        auditService.record("TELEGRAM_NOTIFICATIONS_UPDATE", "administrator");
        return status();
    }

    public record TelegramLinkStatus(boolean linked, boolean notificationsEnabled) {}
}
