import api from '../api/axios';

class AuthService {
    async login(loginDto) {
        const response = await api.post('/auth/login', loginDto);

        if (!response.data) {
            throw new Error('Resposta do servidor inválida');
        }

        let tokenData = response.data;

        if (response.data.data) {
            tokenData = response.data.data;
        }

        const finalToken = tokenData.token || tokenData.accessToken;

        if (!finalToken) {
            throw new Error('Token não retornado pelo servidor');
        }

        return {
            token: finalToken,
            user: tokenData.user || {
                id: tokenData.id,
                login: tokenData.login,
                name: tokenData.name,
                email: tokenData.email,
                roles: tokenData.roles
            },
            refreshToken: tokenData.refreshToken,
            expiresIn: tokenData.expiresIn
        };
    }

    logout() {
        localStorage.removeItem('auth_token');
    }

    isAuthenticated() {
        const token = localStorage.getItem('auth_token');
        return !!token;
    }

    getToken() {
        return localStorage.getItem('auth_token');
    }

    setToken(token) {
        if (!token) {
            return;
        }
        localStorage.setItem('auth_token', token);
    }
}

export default new AuthService();
