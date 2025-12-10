package com.people_manager.enums;

import com.people_manager.base.enums.MessageCode;
import com.people_manager.base.enums.MessageType;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorEnum implements MessageCode {
    GENERAL_ERROR("MESSAGE.GENERAL.M1", MessageType.ERROR),
    MANDATORY_FIELD("MESSAGE.GENERAL.M4", MessageType.ERROR),
    PASSWORDS_DIFFERENT("MESSAGE.USER.M2", MessageType.ERROR),
    PASSWORD_INVALID("MESSAGE.USER.M3", MessageType.ERROR),
    EMAIL_INVALID("MESSAGE.GENERAL.M5", MessageType.ERROR),
    EMAIL_EXISTS("MESSAGE.GENERAL.M6", MessageType.ERROR),
    LOGIN_EXISTS("MESSAGE.USER.M1", MessageType.ERROR),
    PASSWORD_MIN_LENGTH("MESSAGE.USER.M4", MessageType.ERROR),
    PASSWORD_NUM_LETTER("MESSAGE.USER.M5", MessageType.ERROR),
    NUMBER_PHONE_INVALID("MESSAGE.GENERAL.M7", MessageType.ERROR),
    BIRTH_DAY_IS_AFTER("MESSAGE.PATIENT.M1", MessageType.ERROR),
    CPF_EXIST("MESSAGE.GENERAL.M8", MessageType.ERROR),
    CPF_INVALID("MESSAGE.GENERAL.M9", MessageType.ERROR),
    CEP_INVALID("MESSAGE.PATIENT.M3", MessageType.ERROR),

    EMPLOYEE_NAME_REQUIRED("MESSAGE.EMPLOYEE.M1", MessageType.ERROR),
    EMPLOYEE_HIRE_DATE_REQUIRED("MESSAGE.EMPLOYEE.M2", MessageType.ERROR),
    EMPLOYEE_SALARY_REQUIRED("MESSAGE.EMPLOYEE.M4", MessageType.ERROR),
    EMPLOYEE_SALARY_MIN("MESSAGE.EMPLOYEE.M5", MessageType.ERROR),
    EMPLOYEE_STATUS_REQUIRED("MESSAGE.EMPLOYEE.M7", MessageType.ERROR);


    private final String code;
    private final MessageType type;
}
