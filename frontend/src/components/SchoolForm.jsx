import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {useQueryClient} from 'react-query';
import schoolService from '../services/schoolService';
import {SCHOOL_TYPE_OPTIONS} from '../constants/schoolTypes';

const SchoolForm = ({onSchoolCreated}) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm();

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        setSubmitError('');

        try {
            await schoolService.createSchool(data);
            await queryClient.invalidateQueries('schools');
            reset();
            onSchoolCreated();
        } catch (error) {
            console.error('Error creating school:', error);
            setSubmitError(
                error.response?.data?.message ||
                'Помилка при створенні школи'
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="school-form">
            <h2>Додати нову школу</h2>

            {submitError && (
                <div className="error-message">
                    {submitError}
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label htmlFor="name">Назва школи *</label>
                    <input
                        type="text"
                        id="name"
                        {...register('name', {
                            required: 'Назва школи обов\'язкова',
                            maxLength: {
                                value: 255,
                                message: 'Назва не може перевищувати 255 символів'
                            }
                        })}
                        className={errors.name ? 'error' : ''}
                    />
                    {errors.name && (
                        <span className="error-text">{errors.name.message}</span>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="edrpou">ЄДРПОУ *</label>
                    <input
                        type="text"
                        id="edrpou"
                        {...register('edrpou', {
                            required: 'ЄДРПОУ обов\'язковий',
                            pattern: {
                                value: /^\d{8}$/,
                                message: 'ЄДРПОУ повинен містити рівно 8 цифр'
                            }
                        })}
                        className={errors.edrpou ? 'error' : ''}
                        maxLength={8}
                    />
                    {errors.edrpou && (
                        <span className="error-text">{errors.edrpou.message}</span>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="region">Область *</label>
                    <input
                        type="text"
                        id="region"
                        {...register('region', {
                            required: 'Область обов\'язкова',
                            maxLength: {
                                value: 100,
                                message: 'Назва області не може перевищувати 100 символів'
                            }
                        })}
                        className={errors.region ? 'error' : ''}
                    />
                    {errors.region && (
                        <span className="error-text">{errors.region.message}</span>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="type">Тип школи *</label>
                    <select
                        id="type"
                        {...register('type', {
                            required: 'Тип школи обов\'язковий'
                        })}
                        className={errors.type ? 'error' : ''}
                    >
                        <option value="">Оберіть тип школи</option>
                        {SCHOOL_TYPE_OPTIONS.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    {errors.type && (
                        <span className="error-text">{errors.type.message}</span>
                    )}
                </div>

                <div className="form-actions">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn btn-primary"
                    >
                        {isSubmitting ? 'Створення...' : 'Створити школу'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SchoolForm;