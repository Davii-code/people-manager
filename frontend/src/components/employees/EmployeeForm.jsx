import { useState, useEffect } from 'react';
import styles from './EmployeeForm.module.css';

const EmployeeForm = ({ employee, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        name: '',
        hireDate: '',
        salary: '',
        status: 'ACTIVE',
    });

    useEffect(() => {
        if (employee) {
            setFormData({
                name: employee.name || '',
                hireDate: employee.hireDate || '',
                salary: employee.salary || '',
                status: employee.status || 'ACTIVE',
            });
        }
    }, [employee]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const dataToSubmit = {
            ...formData,
            salary: parseFloat(formData.salary)
        };

        onSubmit(dataToSubmit);
    };

    const isEditing = !!employee;

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
                        placeholder="Digite o nome completo"
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="hireDate" className={styles.label}>
                        Data de Admissão <span className={styles.required}>*</span>
                    </label>
                    <input
                        type="date"
                        id="hireDate"
                        name="hireDate"
                        value={formData.hireDate}
                        onChange={handleChange}
                        className={styles.input}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="salary" className={styles.label}>
                        Salário (R$) <span className={styles.required}>*</span>
                    </label>
                    <input
                        type="number"
                        id="salary"
                        name="salary"
                        value={formData.salary}
                        onChange={handleChange}
                        className={styles.input}
                        required
                        step="0.01"
                        min="0"
                        placeholder="Ex: 5000.00"
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="status" className={styles.label}>
                        Status <span className={styles.required}>*</span>
                    </label>
                    <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className={styles.select}
                        required
                    >
                        <option value="ACTIVE">Ativo</option>
                        <option value="INACTIVE">Inativo</option>
                    </select>
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

export default EmployeeForm;
