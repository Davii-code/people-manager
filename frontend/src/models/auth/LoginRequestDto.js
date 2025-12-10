/**
 * DTO para requisição de login
 */
export class LoginRequestDto {
    constructor(login, password) {
        this.login = login;
        this.password = password;
    }
}
