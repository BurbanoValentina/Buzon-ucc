package com.ucc.complaints.model;

import jakarta.persistence.*;
import java.time.OffsetDateTime;

@Entity
@Table(name = "status_history")
public class StatusHistory {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "complaint_id")
    private Complaint complaint;
    private String previousStatus;
    private String newStatus;
    private String comment;
    private String changedBy;
    private OffsetDateTime changedAt;
    protected StatusHistory() { }
}
