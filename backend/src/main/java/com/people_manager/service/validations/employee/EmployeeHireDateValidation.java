package com.people_manager.service.validations.employee;

import com.people_manager.base.enums.ValidationActionsEnum;
import com.people_manager.base.exception.Message;
import com.people_manager.base.validation.IValidations;
import com.people_manager.entities.Employee;
import com.people_manager.enums.ErrorEnum;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
public class EmployeeHireDateValidation implements IValidations<Employee> {

    @Override
    public void validate(Employee employee, ValidationActionsEnum action, List<Message> messages) {

        if  (action.equals(ValidationActionsEnum.CREATE) || action.equals(ValidationActionsEnum.UPDATE)) {

            if (employee.getHireDate() == null) {
                messages.add(new Message(ErrorEnum.EMPLOYEE_HIRE_DATE_REQUIRED));
                return;
            }

        }
    }
}
