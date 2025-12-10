/**
 * DTO para resposta de login
 */
export class LoginResponseDto {
    constructor(token, user) {
        this.token = token;
        this.user = user;
    }
}
