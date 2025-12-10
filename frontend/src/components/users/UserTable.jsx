import styles from './UserTable.module.css';

const UserTable = ({ users, onEdit, onDelete }) => {
    const getEnabledBadge = (enabled) => {
        const statusClass = enabled ? styles.statusActive : styles.statusInactive;
        const statusText = enabled ? 'Ativo' : 'Inativo';
        return <span className={`${styles.badge} ${statusClass}`}>{statusText}</span>;
    };

    return (
        <div className={styles.tableContainer}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Login</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Grupo</th>
                        <th>Status</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length === 0 ? (
                        <tr>
                            <td colSpan="7" className={styles.emptyState}>
                                Nenhum usuário cadastrado
                            </td>
                        </tr>
                    ) : (
                        users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td className={styles.loginCell}>{user.login}</td>
                                <td>{user.name}</td>
                                <td>{user.email || '-'}</td>
                                <td>
                                    {user.userGroup ? (
                                        <span className={`${styles.badge} ${styles.groupBadge}`}>
                                            {user.userGroup.name || user.userGroup.id}
                                        </span>
                                    ) : '-'}
                                </td>
                                <td>{getEnabledBadge(user.enabled)}</td>
                                <td>
                                    <div className={styles.actions}>
                                        <button
                                            onClick={() => onEdit(user)}
                                            className={`${styles.button} ${styles.editButton}`}
                                            title="Editar"
                                        >
                                            ✏️
                                        </button>
                                        <button
                                            onClick={() => onDelete(user.id)}
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

export default UserTable;
