package com.ucc.complaints.model;

import jakarta.persistence.*;
import java.time.OffsetDateTime;

@Entity
@Table(name = "telegram_link")
public class TelegramLink {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "telegram_account_hash", nullable = false, unique = true)
    private String telegramAccountHash;
    private OffsetDateTime linkedAt;
    private boolean active;
    protected TelegramLink() { }
}
