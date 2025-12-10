import api from '../api/axios';

/**
 * Service para operações com funcionários
 */
class EmployeeService {
    /**
     * Lista todos os funcionários
     * @returns {Promise<EmployeeListDto[]>}
     */
    async findAll() {
        const response = await api.get('/employee');
        // Spring Boot returns paginated response with content array
        return response.data.content || [];
    }

    /**
     * Busca um funcionário por ID
     * @param {number} id 
     * @returns {Promise<EmployeeResponseDto>}
     */
    async findById(id) {
        // TODO: Implementar chamada à API
        const response = await api.get(`/employee/${id}`);
        return response.data;
    }

    /**
     * Cria um novo funcionário
     * @param {EmployeeRequestDto} employeeDto 
     * @returns {Promise<EmployeeResponseDto>}
     */
    async create(employeeDto) {
        // TODO: Implementar chamada à API
        const response = await api.post('/employee', employeeDto);
        return response.data;
    }

    /**
     * Atualiza um funcionário existente
     * @param {number} id 
     * @param {EmployeeRequestDto} employeeDto 
     * @returns {Promise<EmployeeResponseDto>}
     */
    async update(id, employeeDto) {
        // TODO: Implementar chamada à API
        const response = await api.put(`/employee/${id}`, employeeDto);
        return response.data;
    }

    /**
     * Remove um funcionário
     * @param {number} id 
     * @returns {Promise<void>}
     */
    async remove(id) {
        // TODO: Implementar chamada à API
        await api.delete(`/employee/${id}`);
    }
}

export default new EmployeeService();
