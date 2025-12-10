/**
 * DTO para requisição de criação/edição de funcionário
 */
export class EmployeeRequestDto {
    constructor(id, name, hireDate, salary, status) {
        this.id = id; // opcional - usado apenas na edição
        this.name = name;
        this.hireDate = hireDate; // formato: YYYY-MM-DD
        this.salary = salary; // número
        this.status = status; // EmployeeStatus enum
    }
}
