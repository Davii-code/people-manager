/**
 * DTO para requisição de criação/edição de usuário
 */
export class UserRequestDto {
    constructor(id, name, login, password, confirmPassword, email, enabled) {
        this.id = id; // opcional - usado apenas na edição
        this.name = name;
        this.login = login;
        this.password = password; // opcional na edição
        this.confirmPassword = confirmPassword; // opcional na edição
        this.email = email;
        this.enabled = enabled; // Boolean
    }
}
