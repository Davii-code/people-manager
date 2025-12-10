package com.people_manager.base.service.impl;

import com.people_manager.base.config.Constants;
import com.people_manager.base.dto.AuthDTO;
import com.people_manager.base.dto.CredentialDTO;
import com.people_manager.base.dto.PasswordResetToken;
import com.people_manager.base.enums.ApiErrorEnum;
import com.people_manager.base.exception.SecurityException;
import com.people_manager.base.security.impl.KeyToken;
import com.people_manager.base.security.impl.TokenBuilder;
import com.people_manager.base.service.IEmailService;
import com.people_manager.base.service.IUserProviderService;
import com.auth0.jwt.interfaces.Claim;
import org.apache.logging.log4j.util.Strings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class AuthService {

    @Autowired
    private IUserProviderService userProviderService;

    @Value("${api.security.jwt.token-expire-in:600}")
    private Long tokenExpireIn;

    @Value("${api.security.jwt.token-refresh-in:600}")
    private Long tokenRefreshExpireIn;

    @Autowired
    private KeyToken keyToken;

    @Autowired
    private IEmailService emailService;

    private final Map<String, PasswordResetToken> resetTokens = new ConcurrentHashMap<>();

    public CredentialDTO login(AuthDTO authDTO) {
        return loginAccess(authDTO);
    }

    public void validateLoginByPassword(AuthDTO authDTO, CredentialDTO credential) {
        if (!UserPasswordService.loginByPassword(authDTO, credential)) {
            throw new SecurityException(ApiErrorEnum.USER_PASSWORD_NOT_MATCH);
        }
    }

    public CredentialDTO loginAccess(final AuthDTO authDTO) {
        validateFieldsAuthDTO(authDTO);

        var credential = userProviderService.getCredentialByLogin(authDTO.login());
        validateCredential(credential);
        validateLoginByPassword(authDTO, credential);

        var builder = new TokenBuilder(keyToken);
        builder.addName(credential.getName());
        builder.addLogin(credential.getLogin());
        builder.addParam(Constants.PARAM_EMAIL, credential.getEmail());
        builder.addParam(Constants.PARAM_USER_ID, credential.getId());
        builder.addParam(Constants.PARAM_EXPIRES_IN, tokenExpireIn);
        builder.addParam(Constants.PARAM_REFRESH_EXPIRES_IN, tokenRefreshExpireIn);

        var roles = credential.getRoles();

        var accessToken = builder.buildAccess(tokenExpireIn);
        credential.setExpiresIn(accessToken.getExpiresIn());
        credential.setAccessToken(accessToken.getToken());

        var refreshToken = builder.buildRefresh(tokenRefreshExpireIn);
        credential.setRefreshExpiresIn(refreshToken.getExpiresIn());
        credential.setRefreshToken(refreshToken.getToken());
        credential.setRoles(roles);

        registerCredentialInSecurityContext(credential);
        credential.setPassword(null);

        userProviderService.recordLog(credential, Constants.ACTION_LOGIN);
        return credential;
    }

    public CredentialDTO refresh(final String refreshToken) {
        var resolve = getClaimResolve(refreshToken);
        var builder = new TokenBuilder(keyToken);

        if (!resolve.isTokenTypeRefresh())
            throw new SecurityException(ApiErrorEnum.INVALID_TOKEN);

        var credential = userProviderService.getCredentialByLogin(resolve.getLogin());

        var roles = Objects.nonNull(credential) ? credential.getRoles() : new ArrayList<String>();

        credential.setName(resolve.getName());
        credential.setEmail(resolve.getEmail());
        credential.setLogin(resolve.getLogin());
        credential.setId(resolve.getUserId());

        if (resolve.getUserId() != null) {
            builder.addName(resolve.getName());
            builder.addLogin(resolve.getLogin());
            builder.addParam(Constants.PARAM_EMAIL, resolve.getEmail());
            builder.addParam(Constants.PARAM_USER_ID, resolve.getUserId());
        }

        Long expiresIn = resolve.getExpiresIn();
        builder.addParam(Constants.PARAM_EXPIRES_IN, expiresIn);

        Long refreshExpiresIn = resolve.getRefreshExpiresIn();
        builder.addParam(Constants.PARAM_REFRESH_EXPIRES_IN, refreshExpiresIn);

        var accessToken = builder.buildAccess(expiresIn);
        credential.setExpiresIn(accessToken.getExpiresIn());
        credential.setAccessToken(accessToken.getToken());

        var newRefreshToken = builder.buildRefresh(refreshExpiresIn);
        credential.setRefreshExpiresIn(newRefreshToken.getExpiresIn());
        credential.setRefreshToken(newRefreshToken.getToken());
        credential.setRoles(roles);
        userProviderService.recordLog(credential, Constants.ACTION_LOGIN_REFRESH);
        return credential;
    }

    public void logout(final String token) {
        try {
            var credential = getInfoByToken(token);
            userProviderService.recordLog(credential, Constants.ACTION_LOGOUT);
        } catch (Exception ignored) {}
        SecurityContextHolder.clearContext();
    }

    public CredentialDTO getInfoByToken(final String token) {
        var resolve = getClaimResolve(token);

        if (!resolve.isTokenTypeAccess()) throw new SecurityException(ApiErrorEnum.INVALID_TOKEN);

        var credentialDTO = userProviderService.getCredentialByLogin(resolve.getLogin());

        var roles = Objects.nonNull(credentialDTO) ? credentialDTO.getRoles() : new ArrayList<String>();

        credentialDTO.setId(resolve.getUserId());
        credentialDTO.setLogin(resolve.getLogin());
        credentialDTO.setEmail(resolve.getEmail());
        credentialDTO.setName(resolve.getName());
        credentialDTO.setRoles(roles);
        credentialDTO.setPassword(null);
        return credentialDTO;
    }

    private void validateFieldsAuthDTO(final AuthDTO authDTO) {
        if (Strings.isEmpty(authDTO.login()) || Strings.isEmpty(authDTO.password())) {
            throw new SecurityException(ApiErrorEnum.LOGIN_INVALID);
        }
    }

    private void validateCredential(CredentialDTO credential) {
        if (credential == null) {
            throw new SecurityException(ApiErrorEnum.USER_PASSWORD_NOT_MATCH);
        }
        if (!credential.isActiveState()) {
            throw new SecurityException(ApiErrorEnum.INACTIVE_USER, credential.getLogin());
        }
    }

    private void registerCredentialInSecurityContext(CredentialDTO credential) {
        var authentication = new UsernamePasswordAuthenticationToken(credential.getLogin(), credential);
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

    private AuthClaimResolve getClaimResolve(final String token) {
        var value = getAccessToken(token);
        var builder = new TokenBuilder(keyToken);
        var claims = builder.getClaims(value);

        return AuthClaimResolve.newInstance(claims);
    }

    private String getAccessToken(final String value) {
        if (!Strings.isEmpty(value)) {
            return value.replaceAll(Constants.HEADER_AUTHORIZATION_BEARER, "").trim();
        }
        return null;
    }

    public void sendPasswordRecoveryEmail(String email) {
        var credential = userProviderService.getCredentialByEmail(email);

        var code = String.format("%06d", new Random().nextInt(999999));
        var token = new PasswordResetToken(code, LocalDateTime.now().plusMinutes(30));
        resetTokens.put(email, token);

        emailService.sendEmail(email, "Recuperação de Senha.", "Seu código de recuperação é: " + code + ". Ele expira em 30 minutos.");
    }

    public void validateResetCode(String email, String code) {
        var token = resetTokens.get(email);
        if (token == null || token.expirationTime().isBefore(LocalDateTime.now())) {
            resetTokens.remove(email);
            throw new SecurityException(ApiErrorEnum.INVALID_RESET_CODE);
        }
        if (!token.code().equals(code)) {
            throw new SecurityException(ApiErrorEnum.INVALID_RESET_CODE);
        }
    }

    public void changePassword(String email, String code, String password) {
        validateResetCode(email, code);
        userProviderService.changePassword(email, password);
    }
}
