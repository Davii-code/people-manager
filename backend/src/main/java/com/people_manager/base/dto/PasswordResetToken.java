package com.people_manager.base.dto;

import java.time.LocalDateTime;

public record PasswordResetToken(String code, LocalDateTime expirationTime) {}
