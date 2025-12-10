package com.people_manager.base.service;

public interface IEmailService {
    void sendEmail(String to, String subject, String body);
}
