import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import { LoginRequestDto } from '../../models/auth/LoginRequestDto';
import styles from './LoginPage.module.css';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        login: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const loginDto = new LoginRequestDto(formData.login, formData.password);
            await login(loginDto);

            toast.success('Login realizado com sucesso!');
            navigate('/employees');
        } catch (error) {
            const message = error.response?.data?.message || 'Erro ao fazer login. Verifique suas credenciais.';
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.loginBox}>
                <div className={styles.header}>
                    <h1 className={styles.title}>People Manager</h1>
                    <p className={styles.subtitle}>Sistema de Gestão de Funcionários</p>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label htmlFor="login" className={styles.label}>
                            Login
                        </label>
                        <input
                            type="text"
                            id="login"
                            name="login"
                            value={formData.login}
                            onChange={handleChange}
                            className={styles.input}
                            required
                            autoComplete="username"
                            placeholder="Digite seu login"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="password" className={styles.label}>
                            Senha
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={styles.input}
                            required
                            autoComplete="current-password"
                            placeholder="Digite sua senha"
                        />
                    </div>

                    <button
                        type="submit"
                        className={styles.submitButton}
                        disabled={loading}
                    >
                        {loading ? 'Entrando...' : 'Entrar'}
                    </button>
                </form>

                <div className={styles.footer}>
                    <p className={styles.footerText}>
                        Sistema seguro com autenticação
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
