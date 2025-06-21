import { useQuery, useQueryClient } from 'react-query';
import schoolService from '../services/schoolService';

export const useSchools = (filters) => {
    return useQuery(
        ['schools', filters],
        () => schoolService.getSchools(filters),
        {
            staleTime: 0,
            cacheTime: 300000,
            refetchOnWindowFocus: true,
        }
    );
};

export const useRegions = () => {
    return useQuery('regions', schoolService.getRegions, {
        staleTime: 600000,
        cacheTime: 600000,
    });
};

export const useInvalidateSchools = () => {
    const queryClient = useQueryClient();

    return () => {
        queryClient.invalidateQueries('schools');
    };
};