package com.people_manager.base.security.impl;

import com.people_manager.base.security.Credential;
import com.people_manager.base.security.ICredentialProvider;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class CredentialProvider implements ICredentialProvider {

    public static CredentialProvider newInstance() {
        return new CredentialProvider();
    }

    @Override
    public Credential getCurrentInstance() {
        return (Credential) SecurityContextHolder.getContext().getAuthentication().getCredentials();
    }
}
