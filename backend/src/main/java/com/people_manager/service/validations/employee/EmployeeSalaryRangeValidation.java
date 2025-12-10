package com.people_manager.service.validations.employee;

import com.people_manager.base.enums.ValidationActionsEnum;
import com.people_manager.base.exception.Message;
import com.people_manager.base.validation.IValidations;
import com.people_manager.entities.Employee;
import com.people_manager.enums.ErrorEnum;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;

@Component
public class EmployeeSalaryRangeValidation implements IValidations<Employee> {

    private static final BigDecimal MIN_SALARY = BigDecimal.valueOf(1000);

    @Override
    public void validate(Employee data, ValidationActionsEnum action, List<Message> messagesToThrow) {
        if (action.equals(ValidationActionsEnum.CREATE) || action.equals(ValidationActionsEnum.UPDATE)) {

            if (data.getSalary() == null) return;

            if (data.getSalary().compareTo(MIN_SALARY) < 0) {
                messagesToThrow.add(new Message(ErrorEnum.EMPLOYEE_SALARY_MIN));
            }

        }
    }
}