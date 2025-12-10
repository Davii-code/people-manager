/**
 * DTO para resposta de usuário
 */
export class UserResponseDto {
    constructor(id, name, login, email, userGroup, enabled, apiKeyEvolution, instanceNameEvolution, createdAt, updatedAt) {
        this.id = id;
        this.name = name;
        this.login = login;
        this.email = email;
        this.userGroup = userGroup; // objeto UserGroup completo
        this.enabled = enabled;
        this.apiKeyEvolution = apiKeyEvolution;
        this.instanceNameEvolution = instanceNameEvolution;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
