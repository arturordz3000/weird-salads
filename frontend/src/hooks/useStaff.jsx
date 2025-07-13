import {
    useQuery,
  } from '@tanstack/react-query'
import { getStaff } from '../api/staff'

export const useStaff = () => {
    return useQuery({
        queryKey: ['staff'],
        queryFn: getStaff
    });
}