import { useState, useEffect } from 'react';
import styles from './UserForm.module.css';

const UserForm = ({ user, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        name: '',
        password: '',
        confirmPassword: '',
        email: '',
        enabled: true,
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                password: '', // Nunca preencher senha em edição
                confirmPassword: '',
                email: user.email || '',
                enabled: user.enabled !== undefined ? user.enabled : true,
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validação de confirmação de senha (apenas se senha foi preenchida)
        if (formData.password && formData.password !== formData.confirmPassword) {
            alert('As senhas não coincidem!');
            return;
        }

        // Se estiver editando e senha vazia, não enviar senha nem confirmPassword
        const dataToSubmit = { ...formData };

        // Força enabled=true ao criar novo usuário
        if (!user) {
            dataToSubmit.enabled = true;
        }

        if (user && !dataToSubmit.password) {
            delete dataToSubmit.password;
            delete dataToSubmit.confirmPassword;
        }

        onSubmit(dataToSubmit);
    };

    const isEditing = !!user;

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                    <label htmlFor="name" className={styles.label}>
                        Nome <span className={styles.required}>*</span>
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={styles.input}
                        required
                        placeholder="Nome completo"
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="password" className={styles.label}>
                        Senha {!isEditing && <span className={styles.required}>*</span>}
                        {isEditing && <span className={styles.hint}>(deixe vazio para manter)</span>}
                    </label>
                    <div className={styles.passwordWrapper}>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={styles.input}
                            required={!isEditing}
                            placeholder="••••••••"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className={styles.eyeButton}
                            title={showPassword ? "Ocultar senha" : "Mostrar senha"}
                        >
                            {showPassword ? '👁️' : '👁️‍🗨️'}
                        </button>
                    </div>
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="confirmPassword" className={styles.label}>
                        Confirmar Senha {!isEditing && <span className={styles.required}>*</span>}
                        {isEditing && <span className={styles.hint}>(deixe vazio para manter)</span>}
                    </label>
                    <div className={styles.passwordWrapper}>
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className={styles.input}
                            required={!isEditing}
                            placeholder="••••••••"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className={styles.eyeButton}
                            title={showConfirmPassword ? "Ocultar senha" : "Mostrar senha"}
                        >
                            {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                        </button>
                    </div>
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.label}>
                        Email <span className={styles.required}>*</span>
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={styles.input}
                        required
                        placeholder="usuario@empresa.com"
                    />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.checkboxLabel}>
                        <input
                            type="checkbox"
                            name="enabled"
                            checked={formData.enabled}
                            onChange={handleChange}
                            className={styles.checkbox}
                        />
                        <span>Usuário Ativo</span>
                    </label>
                </div>
            </div>

            <div className={styles.formActions}>
                <button
                    type="button"
                    onClick={onCancel}
                    className={`${styles.button} ${styles.cancelButton}`}
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    className={`${styles.button} ${styles.submitButton}`}
                >
                    {isEditing ? 'Atualizar' : 'Criar'}
                </button>
            </div>
        </form>
    );
};

export default UserForm;
