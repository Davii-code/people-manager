import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import UserTable from '../../components/users/UserTable';
import UserForm from '../../components/users/UserForm';
import Dialog from '../../components/common/Dialog';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import UserService from '../../services/UserService';
import { UserRequestDto } from '../../models/user/UserRequestDto';
import styles from './UsersPage.module.css';

const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            setLoading(true);
            const data = await UserService.findAll();
            setUsers(data);
        } catch (error) {
            toast.error('Erro ao carregar usuários');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = () => {
        setSelectedUser(null);
        setShowForm(true);
    };

    const handleEdit = (user) => {
        setSelectedUser(user);
        setShowForm(true);
    };

    const handleDeleteClick = (id) => {
        setUserToDelete(id);
        setShowDeleteConfirm(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            await UserService.remove(userToDelete);
            toast.success('Usuário excluído com sucesso!');
            loadUsers();
        } catch (error) {
            toast.error('Erro ao excluir usuário');
        } finally {
            setUserToDelete(null);
        }
    };

    const handleSubmit = async (formData) => {
        try {
            // Usa o email como login
            const dto = new UserRequestDto(
                selectedUser?.id || null, // ID apenas na edição
                formData.name,
                formData.email, // Email usado como login
                formData.password,
                formData.confirmPassword,
                formData.email,
                formData.enabled
            );

            if (selectedUser) {
                await UserService.update(selectedUser.id, dto);
                toast.success('Usuário atualizado com sucesso!');
            } else {
                await UserService.create(dto);
                toast.success('Usuário criado com sucesso!');
            }

            setShowForm(false);
            setSelectedUser(null);
            loadUsers();
        } catch (error) {
            toast.error('Erro ao salvar usuário');
        }
    };

    const handleCancel = () => {
        setShowForm(false);
        setSelectedUser(null);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Usuários</h1>
                    <p className={styles.subtitle}>
                        Gerencie os usuários do sistema
                    </p>
                </div>
                <button onClick={handleCreate} className={styles.createButton}>
                    + Novo Usuário
                </button>
            </div>

            {loading ? (
                <div className={styles.loading}>Carregando...</div>
            ) : (
                <UserTable
                    users={users}
                    onEdit={handleEdit}
                    onDelete={handleDeleteClick}
                />
            )}

            {/* Dialog do Formulário */}
            <Dialog
                isOpen={showForm}
                onClose={handleCancel}
                title={selectedUser ? 'Editar Usuário' : 'Novo Usuário'}
                maxWidth="700px"
            >
                <UserForm
                    user={selectedUser}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                />
            </Dialog>

            {/* Dialog de Confirmação de Exclusão */}
            <ConfirmDialog
                isOpen={showDeleteConfirm}
                onClose={() => setShowDeleteConfirm(false)}
                onConfirm={handleDeleteConfirm}
                title="Excluir Usuário"
                message="Tem certeza que deseja excluir este usuário? Esta ação não pode ser desfeita."
                confirmText="Excluir"
                cancelText="Cancelar"
                type="danger"
            />
        </div>
    );
};

export default UsersPage;
