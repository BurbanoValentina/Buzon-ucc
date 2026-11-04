package com.ucc.complaints.model;

import jakarta.persistence.*;
import java.time.OffsetDateTime;

@Entity
@Table(name = "administrator_account")
public class AdministratorAccount {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, unique = true)
    private String username;
    @Column(name = "password_hash", nullable = false)
    private String passwordHash;
    @Column(name = "security_answer_hash", nullable = false)
    private String securityAnswerHash;
    private int failedAttempts;
    private OffsetDateTime lockedUntil;
    protected AdministratorAccount() { }
}
