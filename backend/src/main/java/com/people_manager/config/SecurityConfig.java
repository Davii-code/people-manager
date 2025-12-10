package com.people_manager.config;

import com.people_manager.base.config.ApiSecurityConfig;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

import java.util.List;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig extends ApiSecurityConfig {

    @Value("${api.version}")
    private String apiBase;

    protected void configureHttpSecurity(HttpSecurity http) {
    }

    @Override
    protected List<String> getCustomFreeAccess() {
        return List.of();
    }

    @Override
    protected List<String> getCustomFreeAccessGet() {
        return List.of();
    }
}
