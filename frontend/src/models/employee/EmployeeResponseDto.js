/**
 * DTO para resposta de funcionário
 */
export class EmployeeResponseDto {
    constructor(id, name, hireDate, salary, status, createdAt, updatedAt) {
        this.id = id;
        this.name = name;
        this.hireDate = hireDate;
        this.salary = salary;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
