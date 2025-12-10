package com.people_manager.base.service.impl;

import com.people_manager.base.dto.AuthDTO;
import com.people_manager.base.dto.CredentialDTO;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserPasswordService {
    public static Boolean loginByPassword(AuthDTO authDTO, CredentialDTO userCredential) {
        if (!authDTO.login().equals(userCredential.getLogin())) {
            return false;
        }

        var encoder = new BCryptPasswordEncoder();
        return encoder.matches(authDTO.password(), userCredential.getPassword());
    }
}
