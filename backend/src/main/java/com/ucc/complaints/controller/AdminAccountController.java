package com.ucc.complaints.controller;

import com.ucc.complaints.dto.security.ChangeCredentialsRequest;
import com.ucc.complaints.model.AdministratorAccount;
import com.ucc.complaints.security.AdminAuthenticationService;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/admin/account")
public class AdminAccountController {
    private final AdminAuthenticationService authenticationService;

    public AdminAccountController(AdminAuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @GetMapping("/security-question")
    public Map<String, String> securityQuestion() {
        return Map.of("question", AdminAuthenticationService.SECURITY_QUESTION);
    }

    @PatchMapping("/credentials")
    public ResponseEntity<Map<String, String>> changeCredentials(
        @Valid @RequestBody ChangeCredentialsRequest request, HttpSession session) {
        String currentUsername = (String) session.getAttribute(
            AdminAuthenticationService.SESSION_USERNAME);
        AdministratorAccount account = authenticationService.changeCredentials(currentUsername, request);
        session.setAttribute(AdminAuthenticationService.SESSION_USERNAME, account.getUsername());
        session.setMaxInactiveInterval(10 * 60 * 60);
        return ResponseEntity.ok(Map.of("username", account.getUsername()));
    }
}
