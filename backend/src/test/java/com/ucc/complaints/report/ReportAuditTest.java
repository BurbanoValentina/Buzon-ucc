package com.ucc.complaints.report;

import com.ucc.complaints.dto.report.ReportSelection;
import com.ucc.complaints.repository.ComplaintRepository;
import com.ucc.complaints.repository.WordReportDraftRepository;
import com.ucc.complaints.service.AuditService;
import com.ucc.complaints.service.WordReportService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ReportAuditTest {
    @Mock ComplaintRepository complaints;
    @Mock WordReportDraftRepository drafts;
    @Mock AuditService auditService;

    @Test
    void generationAndDownloadUseSafeAuditEvents() {
        when(complaints.findAll()).thenReturn(List.of());
        WordReportService service = new WordReportService(complaints, drafts, null, auditService);

        service.create(new ReportSelection(List.of(), null), "administrador");

        verify(auditService).record(eq("WORD_REPORT_GENERATED"), eq("administrador"));
        verifyNoMoreInteractions(auditService);
    }
}
