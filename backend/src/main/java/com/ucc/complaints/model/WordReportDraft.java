package com.ucc.complaints.model;

import jakarta.persistence.*;
import java.time.OffsetDateTime;

@Entity
@Table(name = "word_report_draft")
public class WordReportDraft {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    @Lob private String content;
    private OffsetDateTime createdAt;
    private OffsetDateTime updatedAt;
    protected WordReportDraft() { }
}
