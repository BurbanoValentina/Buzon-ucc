package com.ucc.complaints.controller;

import com.ucc.complaints.dto.security.*;
import com.ucc.complaints.model.AdministratorAccount;
import com.ucc.complaints.security.AdminAuthenticationService;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/admin/auth")
public class AdminSessionController {
    private final AdminAuthenticationService authenticationService;

    public AdminSessionController(AdminAuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@Valid @RequestBody AdminLoginRequest request,
                                                     HttpSession session) {
        AdministratorAccount account = authenticationService.authenticate(request);
        session.setAttribute(AdminAuthenticationService.SESSION_USERNAME, account.getUsername());
        session.setMaxInactiveInterval(10 * 60 * 60);
        return ResponseEntity.ok(Map.of("username", account.getUsername()));
    }

    @PostMapping("/security-question")
    public ResponseEntity<Map<String, String>> securityQuestion(
        @Valid @RequestBody SecurityQuestionRequest request, HttpSession session) {
        AdministratorAccount account = authenticationService.recover(request);
        session.setAttribute(AdminAuthenticationService.SESSION_USERNAME, account.getUsername());
        session.setMaxInactiveInterval(10 * 60 * 60);
        return ResponseEntity.ok(Map.of("question", AdminAuthenticationService.SECURITY_QUESTION));
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/session-expired")
    public ResponseEntity<Map<String, String>> sessionExpired() {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
            .body(Map.of("message", "La sesión expiró por inactividad."));
    }
}
