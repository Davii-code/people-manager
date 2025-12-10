import axios from 'axios';
import { toast } from 'react-toastify';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const isAuthRoute = config.url?.includes('/auth/');

        if (!isAuthRoute) {
            const token = localStorage.getItem('auth_token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const { response } = error;

        if (response) {
            const { status, data } = response;
            const isAuthRoute = error.config?.url?.includes('/auth/');

            if (!isAuthRoute) {
                const extractErrorMessage = (data) => {
                    if (data?.messages && Array.isArray(data.messages)) {
                        const errorMessages = data.messages
                            .filter(msg => msg.type === 'ERROR')
                            .map(msg => msg.message);

                        if (errorMessages.length > 0) {
                            return errorMessages.join('\n');
                        }
                    }
                    return data?.message || null;
                };

                const errorMessage = extractErrorMessage(data);

                switch (status) {
                    case 400:
                        toast.error(errorMessage || 'Dados inválidos. Verifique os campos.');
                        break;
                    case 401:
                        toast.error('Sessão expirada. Faça login novamente.');
                        localStorage.removeItem('auth_token');
                        localStorage.removeItem('user_data');
                        setTimeout(() => {
                            window.location.href = '/login';
                        }, 1000);
                        break;
                    case 403:
                        const message = errorMessage || 'Você não tem permissão para acessar este recurso.';
                        toast.error(message);
                        if (message.toLowerCase().includes('token') ||
                            message.toLowerCase().includes('autenticação') ||
                            message.toLowerCase().includes('authentication')) {
                            localStorage.removeItem('auth_token');
                            localStorage.removeItem('user_data');
                            setTimeout(() => {
                                window.location.href = '/login';
                            }, 1000);
                        }
                        break;
                    case 404:
                        toast.error(errorMessage || 'Recurso não encontrado.');
                        break;
                    case 500:
                        toast.error(errorMessage || 'Erro interno do servidor.');
                        break;
                    default:
                        toast.error(errorMessage || 'Ocorreu um erro inesperado.');
                }
            }
        } else {
            toast.error('Erro de conexão com o servidor.');
        }

        return Promise.reject(error);
    }
);

export default api;
