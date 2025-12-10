/**
 * DTO para listagem de funcionário
 */
export class EmployeeListDto {
    constructor(id, name, hireDate, salary, status) {
        this.id = id;
        this.name = name;
        this.hireDate = hireDate; // LocalDate
        this.salary = salary; // BigDecimal
        this.status = status; // EmployeeStatus enum
    }
}
