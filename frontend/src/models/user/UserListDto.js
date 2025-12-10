/**
 * DTO para listagem de usuário
 */
export class UserListDto {
    constructor(id, name, login, email, enabled, userGroup) {
        this.id = id;
        this.name = name;
        this.login = login;
        this.email = email;
        this.enabled = enabled; // Boolean
        this.userGroup = userGroup; // UserGroup object
    }
}
