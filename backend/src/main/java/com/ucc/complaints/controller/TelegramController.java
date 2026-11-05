package com.ucc.complaints.controller;

import com.ucc.complaints.service.TelegramLinkService;
import com.ucc.complaints.telegram.TelegramChallengeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/admin/telegram")
public class TelegramController {
    private final TelegramLinkService linkService;
    private final TelegramChallengeService challengeService;

    public TelegramController(TelegramLinkService linkService, TelegramChallengeService challengeService) {
        this.linkService = linkService;
        this.challengeService = challengeService;
    }

    @GetMapping("/status")
    public TelegramLinkService.TelegramLinkStatus status() {
        return linkService.status();
    }

    @PostMapping("/link")
    public ResponseEntity<Map<String, String>> issueLink(@RequestBody Map<String, String> request) {
        String accountHash = challengeService.hash(request.getOrDefault("accountId", ""));
        String code = challengeService.issueLinkCode(accountHash, "LINK");
        return ResponseEntity.ok(Map.of("challengeExpiresInSeconds", "600"));
    }

    @PostMapping("/confirm-link")
    public ResponseEntity<TelegramLinkService.TelegramLinkStatus> confirmLink(
        @RequestBody Map<String, String> request) {
        String accountHash = challengeService.hash(request.getOrDefault("accountId", ""));
        if (!challengeService.validate("LINK", accountHash, request.getOrDefault("code", ""))) {
            return ResponseEntity.badRequest().body(new TelegramLinkService.TelegramLinkStatus(false, false));
        }
        return ResponseEntity.ok(linkService.link(accountHash));
    }

    @PostMapping("/unlink")
    public TelegramLinkService.TelegramLinkStatus unlink() {
        return linkService.unlink();
    }

    @PatchMapping("/notifications")
    public TelegramLinkService.TelegramLinkStatus notifications(@RequestBody Map<String, Boolean> request) {
        return linkService.setNotifications(Boolean.TRUE.equals(request.get("enabled")));
    }
}
