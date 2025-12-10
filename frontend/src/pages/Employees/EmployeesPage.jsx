import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import EmployeeTable from '../../components/employees/EmployeeTable';
import EmployeeForm from '../../components/employees/EmployeeForm';
import Dialog from '../../components/common/Dialog';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import EmployeeService from '../../services/EmployeeService';
import { EmployeeRequestDto } from '../../models/employee/EmployeeRequestDto';
import styles from './EmployeesPage.module.css';

const EmployeesPage = () => {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [employeeToDelete, setEmployeeToDelete] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadEmployees();
    }, []);

    const loadEmployees = async () => {
        try {
            setLoading(true);
            const data = await EmployeeService.findAll();
            setEmployees(data);
        } catch (error) {
            toast.error('Erro ao carregar funcionários');
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = () => {
        setSelectedEmployee(null);
        setShowForm(true);
    };

    const handleEdit = (employee) => {
        setSelectedEmployee(employee);
        setShowForm(true);
    };

    const handleDeleteClick = (id) => {
        setEmployeeToDelete(id);
        setShowDeleteConfirm(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            await EmployeeService.remove(employeeToDelete);
            toast.success('Funcionário excluído com sucesso!');
            loadEmployees();
        } catch (error) {
            toast.error('Erro ao excluir funcionário');
        } finally {
            setEmployeeToDelete(null);
        }
    };

    const handleSubmit = async (formData) => {
        try {
            const dto = new EmployeeRequestDto(
                selectedEmployee?.id || null, // ID apenas na edição
                formData.name,
                formData.hireDate,
                formData.salary,
                formData.status
            );

            if (selectedEmployee) {
                await EmployeeService.update(selectedEmployee.id, dto);
                toast.success('Funcionário atualizado com sucesso!');
            } else {
                await EmployeeService.create(dto);
                toast.success('Funcionário criado com sucesso!');
            }

            setShowForm(false);
            setSelectedEmployee(null);
            loadEmployees();
        } catch (error) {
            toast.error('Erro ao salvar funcionário');
        }
    };

    const handleCancel = () => {
        setShowForm(false);
        setSelectedEmployee(null);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Funcionários</h1>
                    <p className={styles.subtitle}>
                        Gerencie todos os funcionários da empresa
                    </p>
                </div>
                <button onClick={handleCreate} className={styles.createButton}>
                    + Novo Funcionário
                </button>
            </div>

            {loading ? (
                <div className={styles.loading}>Carregando...</div>
            ) : (
                <EmployeeTable
                    employees={employees}
                    onEdit={handleEdit}
                    onDelete={handleDeleteClick}
                />
            )}

            {/* Dialog do Formulário */}
            <Dialog
                isOpen={showForm}
                onClose={handleCancel}
                title={selectedEmployee ? 'Editar Funcionário' : 'Novo Funcionário'}
                maxWidth="600px"
            >
                <EmployeeForm
                    employee={selectedEmployee}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                />
            </Dialog>

            {/* Dialog de Confirmação de Exclusão */}
            <ConfirmDialog
                isOpen={showDeleteConfirm}
                onClose={() => setShowDeleteConfirm(false)}
                onConfirm={handleDeleteConfirm}
                title="Excluir Funcionário"
                message="Tem certeza que deseja excluir este funcionário? Esta ação não pode ser desfeita."
                confirmText="Excluir"
                cancelText="Cancelar"
                type="danger"
            />
        </div>
    );
};

export default EmployeesPage;
