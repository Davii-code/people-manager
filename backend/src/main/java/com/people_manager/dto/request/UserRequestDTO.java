package com.people_manager.dto.request;

import com.people_manager.base.annotation.MandatoryField;
import com.people_manager.annotation.EmailValidate;
import com.people_manager.annotation.PasswordValidate;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class UserRequestDTO {

    private Long id;
    private String name;

    private String login;

    @PasswordValidate(name = "Senha")
    private String password;

    private String confirmPassword;

    @EmailValidate(name = "Email")
    private String email;

    private Boolean enabled;
}
