package com.people_manager.base.security;

public interface IAuthenticationProvider {
    Credential getAuthentication(final String token);
}
