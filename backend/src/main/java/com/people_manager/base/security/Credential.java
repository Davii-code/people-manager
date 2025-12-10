package com.people_manager.base.security;

import java.util.List;

public interface Credential {
    String getLogin();
    List<String> getRoles();
    String getAccessToken();
}
