import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const schoolService = {
    getSchools: async (filters = {}) => {
        const params = new URLSearchParams();

        if (filters.region) params.append('region', filters.region);
        if (filters.type) params.append('type', filters.type);
        if (filters.isActive !== undefined) params.append('isActive', filters.isActive);

        const response = await api.get(`/schools?${params.toString()}`);
        return response.data;
    },
    createSchool: async (schoolData) => {
        const response = await api.post('/schools', schoolData);
        return response.data;
    },
    deactivateSchool: async (schoolId) => {
        const response = await api.patch(`/schools/${schoolId}/deactivate`);
        return response.data;
    },
    getRegions: async () => {
        const response = await api.get('/schools/regions');
        return response.data;
    },
};

export default schoolService;