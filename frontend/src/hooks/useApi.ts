import axios from 'axios';
import { useAuth } from '../context/auth-context';

const api = axios.create({baseURL: import.meta.env.VITE_API_PATH})

export const useApi = () => {
    const {user} = useAuth();
    if(user.token){
        api.defaults.headers.common.Authorization = `Bearer ${user.token}`
    } else {
        delete api.defaults.headers.common.Authorization
    }
    return api;
}