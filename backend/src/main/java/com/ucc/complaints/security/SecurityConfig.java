package com.ucc.complaints.security;

import org.springframework.context.annotation.*;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {
    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/v1/public/**", "/api/v1/openapi/**", "/api/v1/swagger-ui/**",
                    "/actuator/health").permitAll()
                .anyRequest().authenticated())
            .sessionManagement(session -> session
                .maximumSessions(1))
            .build();
    }
}
