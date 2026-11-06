package com.ucc.complaints.controller;

import com.ucc.complaints.service.TelegramLinkService;
import com.ucc.complaints.telegram.TelegramChallengeService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyBoolean;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(TelegramController.class)
@AutoConfigureMockMvc(addFilters = false)
class TelegramControllerTest {
    @Autowired
    private MockMvc mvc;

    @MockBean
    private TelegramLinkService linkService;

    @MockBean
    private TelegramChallengeService challengeService;

    @Test
    void testTelegramEndpoints() throws Exception {
        when(linkService.status()).thenReturn(new TelegramLinkService.TelegramLinkStatus(true, true));
        when(challengeService.hash(any())).thenReturn("hashed");
        when(challengeService.issueLinkCode(any(), any())).thenReturn("code123");
        when(challengeService.validate(any(), any(), any())).thenReturn(true);
        when(linkService.link(any())).thenReturn(new TelegramLinkService.TelegramLinkStatus(true, false));
        when(linkService.unlink()).thenReturn(new TelegramLinkService.TelegramLinkStatus(false, false));
        when(linkService.setNotifications(anyBoolean())).thenReturn(new TelegramLinkService.TelegramLinkStatus(true, true));

        mvc.perform(get("/api/v1/admin/telegram/status")).andExpect(status().isOk());
        mvc.perform(post("/api/v1/admin/telegram/link")
            .contentType(MediaType.APPLICATION_JSON)
            .content("{\"accountId\":\"12345\"}"))
            .andExpect(status().isOk());
        mvc.perform(post("/api/v1/admin/telegram/confirm-link")
            .contentType(MediaType.APPLICATION_JSON)
            .content("{\"accountId\":\"12345\",\"code\":\"code123\"}"))
            .andExpect(status().isOk());
        mvc.perform(patch("/api/v1/admin/telegram/notifications")
            .contentType(MediaType.APPLICATION_JSON)
            .content("{\"enabled\":true}"))
            .andExpect(status().isOk());
        mvc.perform(post("/api/v1/admin/telegram/unlink")).andExpect(status().isOk());
    }
}
