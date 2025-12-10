package com.people_manager.service.validations.employee;

import com.people_manager.base.enums.ValidationActionsEnum;
import com.people_manager.base.exception.Message;
import com.people_manager.base.validation.IValidations;
import com.people_manager.entities.Employee;
import com.people_manager.enums.ErrorEnum;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class EmployeeNameValidation implements IValidations<Employee> {


    @Override
    public void validate(Employee data, ValidationActionsEnum action, List<Message> messagesToThrow) {
        if (action.equals(ValidationActionsEnum.CREATE) || action.equals(ValidationActionsEnum.UPDATE)) {
            if (data.getName() == null || data.getName().isBlank()) {
                messagesToThrow.add(new Message(ErrorEnum.EMPLOYEE_NAME_REQUIRED));
            }
        }
    }
}