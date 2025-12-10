package com.people_manager.base.validation;

import com.people_manager.base.enums.ValidationActionsEnum;
import com.people_manager.base.exception.Message;

import java.util.List;

public interface IValidations<MODEL> {
    void validate(MODEL data, ValidationActionsEnum action, List<Message> messagesToThrow);
}
