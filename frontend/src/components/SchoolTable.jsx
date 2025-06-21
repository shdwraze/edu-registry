import React, {useState} from 'react';
import {useQueryClient} from 'react-query';
import {useSchools} from '../hooks/useSchools';
import SchoolFilter from './SchoolFilter';
import ConfirmDialog from './ConfirmDialog';
import schoolService from '../services/schoolService';
import {SCHOOL_TYPE_LABELS} from '../constants/schoolTypes';

const SchoolTable = ({onSchoolDeactivated}) => {
    const [filters, setFilters] = useState({});
    const [confirmDialog, setConfirmDialog] = useState({isOpen: false, schoolId: null, schoolName: ''});
    const [deactivatingId, setDeactivatingId] = useState(null);
    const queryClient = useQueryClient();

    const {data: schools = [], isLoading, error} = useSchools(filters);
    console.log('Schools data:', schools);
    schools.forEach(school => {
        console.log(`School ${school.name}: active =`, school.active, typeof school.active);
    });

    const handleDeactivate = async (schoolId) => {
        setDeactivatingId(schoolId);
        try {
            await schoolService.deactivateSchool(schoolId);
            setConfirmDialog({isOpen: false, schoolId: null, schoolName: ''});
            await queryClient.invalidateQueries('schools');
            onSchoolDeactivated();
        } catch (error) {
            console.error('Error deactivating school:', error);
            alert('Помилка при деактивації школи');
        } finally {
            setDeactivatingId(null);
        }
    };

    const openConfirmDialog = (school) => {
        setConfirmDialog({
            isOpen: true,
            schoolId: school.id,
            schoolName: school.name
        });
    };

    const closeConfirmDialog = () => {
        setConfirmDialog({isOpen: false, schoolId: null, schoolName: ''});
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('uk-UA', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (isLoading) return <div className="loading">Завантаження...</div>;
    if (error) return <div className="error">Помилка завантаження: {error.message}</div>;

    return (
        <div className="school-table-container">
            <SchoolFilter filters={filters} onFiltersChange={setFilters}/>

            <div className="table-info">
                <p>Знайдено шкіл: {schools.length}</p>
            </div>

            <div className="table-wrapper">
                <table className="school-table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Назва</th>
                        <th>ЄДРПОУ</th>
                        <th>Область</th>
                        <th>Тип</th>
                        <th>Статус</th>
                        <th>Створено</th>
                        <th>Оновлено</th>
                        <th>Дії</th>
                    </tr>
                    </thead>
                    <tbody>
                    {schools.length === 0 ? (
                        <tr>
                            <td colSpan="9" className="no-data">
                                Немає даних для відображення
                            </td>
                        </tr>
                    ) : (
                        schools.map((school) => (
                            <tr key={school.id} className={!school.active ? 'inactive' : ''}>
                                <td>{school.id}</td>
                                <td>{school.name}</td>
                                <td>{school.edrpou}</td>
                                <td>{school.region}</td>
                                <td>{SCHOOL_TYPE_LABELS[school.type]}</td>
                                <td>
                    <span className={`status ${school.active ? 'active' : 'inactive'}`}>
                      {school.active ? 'Активна' : 'Деактивована'}
                    </span>
                                </td>
                                <td>{formatDate(school.createdAt)}</td>
                                <td>{formatDate(school.updatedAt)}</td>
                                <td>
                                    {school.active && (
                                        <button
                                            type="button"
                                            className="btn btn-danger btn-sm"
                                            onClick={() => openConfirmDialog(school)}
                                            disabled={deactivatingId === school.id}
                                        >
                                            {deactivatingId === school.id ? 'Деактивація...' : 'Деактивувати'}
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>

            <ConfirmDialog
                isOpen={confirmDialog.isOpen}
                title="Підтвердження деактивації"
                message={`Ви впевнені, що хочете деактивувати школу "${confirmDialog.schoolName}"?`}
                onConfirm={() => handleDeactivate(confirmDialog.schoolId)}
                onCancel={closeConfirmDialog}
                confirmText="Деактивувати"
                cancelText="Скасувати"
            />
        </div>
    );
};

export default SchoolTable;