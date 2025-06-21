import React from 'react';
import {SCHOOL_TYPE_OPTIONS} from '../constants/schoolTypes';
import {useRegions} from '../hooks/useSchools';

const SchoolFilter = ({filters, onFiltersChange}) => {
    const {data: regions = [], isLoading: regionsLoading} = useRegions();

    const handleFilterChange = (field, value) => {
        onFiltersChange({
            ...filters,
            [field]: value === '' ? undefined : value
        });
    };

    return (
        <div className="school-filters">
            <h3>Фільтри</h3>

            <div className="filters-row">
                <div className="filter-group">
                    <label htmlFor="region-filter">Область</label>
                    <select
                        id="region-filter"
                        value={filters.region || ''}
                        onChange={(e) => handleFilterChange('region', e.target.value)}
                    >
                        <option value="">Всі області</option>
                        {regionsLoading ? (
                            <option disabled>Завантаження...</option>
                        ) : (
                            regions.map(region => (
                                <option key={region} value={region}>
                                    {region}
                                </option>
                            ))
                        )}
                    </select>
                </div>

                <div className="filter-group">
                    <label htmlFor="type-filter">Тип школи</label>
                    <select
                        id="type-filter"
                        value={filters.type || ''}
                        onChange={(e) => handleFilterChange('type', e.target.value)}
                    >
                        <option value="">Всі типи</option>
                        {SCHOOL_TYPE_OPTIONS.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="filter-group">
                    <label htmlFor="active-filter">Статус</label>
                    <select
                        id="active-filter"
                        value={filters.isActive !== undefined ? filters.isActive.toString() : ''}
                        onChange={(e) => handleFilterChange('isActive',
                            e.target.value === '' ? undefined : e.target.value === 'true'
                        )}
                    >
                        <option value="">Всі</option>
                        <option value="true">Активні</option>
                        <option value="false">Деактивовані</option>
                    </select>
                </div>

                <div className="filter-group">
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => onFiltersChange({})}
                    >
                        Очистити фільтри
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SchoolFilter;