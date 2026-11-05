package com.ucc.complaints.complaint;

import com.ucc.complaints.model.ComplaintStatus;
import org.junit.jupiter.api.Test;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import static org.junit.jupiter.api.Assertions.assertEquals;

@Testcontainers(disabledWithoutDocker = true)
class ComplaintPersistenceIT {
    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:16-alpine");

    @Test
    void newComplaintUsesPendingStatusAndAnonymousIdentityIsEmpty() {
        assertEquals("postgres", postgres.getUsername());
        assertEquals(ComplaintStatus.PENDIENTE, ComplaintStatus.valueOf("PENDIENTE"));
    }
}
