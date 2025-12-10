package com.people_manager.dto.request;

import com.people_manager.enums.EmployeeStatus;
import jakarta.validation.constraints.DecimalMin;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeRequestDto {
    private String name;
    private LocalDate hireDate;

    @DecimalMin(value = "0.0", inclusive = false)
    private BigDecimal salary;

    private EmployeeStatus status;
}
