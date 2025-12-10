package com.people_manager.util;

import br.com.caelum.stella.ValidationMessage;
import br.com.caelum.stella.validation.CPFValidator;
import com.people_manager.base.dto.CredentialDTO;
import com.people_manager.enums.ErrorEnum;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

public class Util {
    public static String toLowerCase(String str) {
        if (str != null && !str.isEmpty()) {
            return str.toLowerCase();
        }
        return null;
    }

    public static String removeNonNumericCharacters(String str) {
        if (str != null && !str.isEmpty()) {
            return str.replaceAll("[^0-9]", "");
        }
        return null;
    }

    public static List<ErrorEnum> validatePassword(String password) {
        List<ErrorEnum> errors = new ArrayList<>();
        String regex = "^(?=.*[a-zA-Z])(?=.*\\d).+$";

        if (password != null) {
            if (password.trim().length() < 8) {
                errors.add(ErrorEnum.PASSWORD_MIN_LENGTH);
            }
            if (!Pattern.matches(regex, password)) {
                errors.add(ErrorEnum.PASSWORD_NUM_LETTER);
            }
        }

        return errors;
    }

    public static List<ErrorEnum> validateEmail(String email) {
        List<ErrorEnum> errors = new ArrayList<>();
        String emailRegex = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$";

        if (email != null) {
            if (!Pattern.matches(emailRegex, email)) {
                errors.add(ErrorEnum.EMAIL_INVALID);
            }
        }

        return errors;
    }
    public static List<ErrorEnum> validateNumberPhone(String numberPhone) {
        List<ErrorEnum> errors = new ArrayList<>();
        String numberRegex = "\\d{2}9\\d{8}";

        if (numberPhone != null) {
            if (!Pattern.matches(numberRegex, numberPhone)) {
                errors.add(ErrorEnum.NUMBER_PHONE_INVALID);
            }
        }

        return errors;
    }

    public static List<ErrorEnum> validateCpf(String cpf) {
        List<ErrorEnum> errors = new ArrayList<>();

        if (cpf != null) {
            CPFValidator cpfValidator = new CPFValidator();
            for (ValidationMessage message : cpfValidator.invalidMessagesFor(cpf)) {
                errors.add(ErrorEnum.CPF_INVALID);
                break;
            }
        }

        return errors;
    }

    public static List<ErrorEnum> validateCep(String cep) {
        List<ErrorEnum> errors = new ArrayList<>();

        if (cep != null) {
            if (cep.length() != 8) {
                errors.add(ErrorEnum.CEP_INVALID);
            }
        }

        return errors;
    }

    public static Long getIdUserLogged() {
        return ((CredentialDTO) SecurityContextHolder.getContext().getAuthentication().getCredentials()).getId();
    }

    public static boolean isNullOrEmpty(String str) {
        return str == null || str.trim().isEmpty();
    }
}
