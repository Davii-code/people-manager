import api from '../api/axios';

/**
 * Service para operações com usuários
 */
class UserService {
    /**
     * Lista todos os usuários
     * @returns {Promise<UserListDto[]>}
     */
    async findAll() {
        const response = await api.get('/user');
        // Spring Boot returns paginated response with content array
        return response.data.content || [];
    }

    /**
     * Busca um usuário por ID
     * @param {number} id 
     * @returns {Promise<UserResponseDto>}
     */
    async findById(id) {
        const response = await api.get(`/user/${id}`);
        return response.data;
    }

    /**
     * Cria um novo usuário
     * @param {UserRequestDto} userDto 
     * @returns {Promise<UserResponseDto>}
     */
    async create(userDto) {
        const response = await api.post('/user', userDto);
        return response.data;
    }

    /**
     * Atualiza um usuário existente
     * @param {number} id 
     * @param {UserRequestDto} userDto 
     * @returns {Promise<UserResponseDto>}
     */
    async update(id, userDto) {
        const response = await api.put(`/user/${id}`, userDto);
        return response.data;
    }

    /**
     * Remove um usuário
     * @param {number} id 
     * @returns {Promise<void>}
     */
    async remove(id) {
        await api.delete(`/user/${id}`);
    }
}

export default new UserService();
