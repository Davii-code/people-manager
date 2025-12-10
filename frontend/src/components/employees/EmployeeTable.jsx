import styles from './EmployeeTable.module.css';

const EmployeeTable = ({ employees, onEdit, onDelete }) => {
    const getStatusBadge = (status) => {
        const statusClass = status === 'ACTIVE' ? styles.statusActive : styles.statusInactive;
        const statusText = status === 'ACTIVE' ? 'Ativo' : 'Inativo';
        return <span className={`${styles.badge} ${statusClass}`}>{statusText}</span>;
    };

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR');
    };

    const formatCurrency = (value) => {
        if (!value) return '-';
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    };

    return (
        <div className={styles.tableContainer}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Data de Admissão</th>
                        <th>Salário</th>
                        <th>Status</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.length === 0 ? (
                        <tr>
                            <td colSpan="6" className={styles.emptyState}>
                                Nenhum funcionário cadastrado
                            </td>
                        </tr>
                    ) : (
                        employees.map((employee) => (
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td className={styles.nameCell}>{employee.name}</td>
                                <td>{formatDate(employee.hireDate)}</td>
                                <td className={styles.salaryCell}>{formatCurrency(employee.salary)}</td>
                                <td>{getStatusBadge(employee.status)}</td>
                                <td>
                                    <div className={styles.actions}>
                                        <button
                                            onClick={() => onEdit(employee)}
                                            className={`${styles.button} ${styles.editButton}`}
                                            title="Editar"
                                        >
                                            ✏️
                                        </button>
                                        <button
                                            onClick={() => onDelete(employee.id)}
                                            className={`${styles.button} ${styles.deleteButton}`}
                                            title="Excluir"
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeTable;
