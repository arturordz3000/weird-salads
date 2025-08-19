import {
    useQuery,
  } from '@tanstack/react-query'
import { getMenu } from '../api/menu'

export const useMenu = () => {
    return useQuery({
        queryKey: ['menu'],
        queryFn: getMenu
    });
}