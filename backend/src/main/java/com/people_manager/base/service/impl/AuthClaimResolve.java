package com.people_manager.base.service.impl;

import com.people_manager.base.config.Constants;
import com.people_manager.base.security.impl.TokenBuilder;
import com.auth0.jwt.interfaces.Claim;

import java.util.Map;

public class AuthClaimResolve {

    private final Map<String, Claim> claims;

    private AuthClaimResolve(final Map<String, Claim> claims) {
        this.claims = claims;
    }

    public static AuthClaimResolve newInstance(final Map<String, Claim> claims) {
        return new AuthClaimResolve(claims);
    }

    public String getLogin() {
        var claim = claims.get(Constants.PARAM_LOGIN);
        return claim != null && !claim.isNull() ? claim.asString() : null;
    }

    public String getEmail() {
        var claim = claims.get(Constants.PARAM_EMAIL);
        return claim != null && !claim.isNull() ? claim.asString() : null;
    }

    public String getName() {
        var claim = claims.get(Constants.PARAM_NAME);
        return claim != null && !claim.isNull() ? claim.asString() : null;
    }

    public Long getExpiresIn() {
        var claim = claims.get(Constants.PARAM_EXPIRES_IN);
        return claim != null && !claim.isNull() ? claim.asLong() : null;
    }

    public Long getRefreshExpiresIn() {
        var claim = claims.get(Constants.PARAM_REFRESH_EXPIRES_IN);
        return claim != null && !claim.isNull() ? claim.asLong() : null;
    }

    public Long getUserId() {
        var claim = claims.get(Constants.PARAM_USER_ID);
        return claim != null && !claim.isNull() ? claim.asLong() : null;
    }

    public TokenBuilder.TokenType getTokenType() {
        var claim = claims.get(Constants.PARAM_TYPE);
        return claim != null && !claim.isNull() ? TokenBuilder.TokenType.valueOf(claim.asString()) : null;
    }

    public boolean isTokenTypeAccess() {
        var type = getTokenType();
        return TokenBuilder.TokenType.ACCESS.equals(type);
    }

    public boolean isTokenTypeRefresh() {
        var type = getTokenType();
        return TokenBuilder.TokenType.REFRESH.equals(type);
    }
}
