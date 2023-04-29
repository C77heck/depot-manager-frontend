import axios from 'axios';
import { createContext, useCallback, useContext, useState } from 'react';

export interface UserProps {
    userId: string;
    token: string;
    expiry: Date;
}

export interface UserRegistrationProps {
    firstName: string;
    lastName: string;
    password: string;
    email: string;
}

export type Children = JSX.Element | JSX.Element[] | null;

const AuthContext = createContext({
    userId: '',
    token: '',
    isLoggedIn: false,
    error: '',
    isLoading: false,
    login: async (data: UserProps) => {
    },
    register: async (data: UserRegistrationProps) => {
    },
    update: async (data: UserRegistrationProps) => {
    },
    whoami: async () => {
    },
    logout: async () => {
    },
    deleteAccount: async () => {
    },
});

export const WithAuthContext = ({ children }: { children: Children }) => {
    const endpoint = `${endpoint}}/user`;
    const [userId, setUserId] = useState('');
    const [token, setToken] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const login = useCallback(async (data: UserProps) => {
        try {
            setIsLoading(true);

            const response = await axios.put(`${endpoint}/`, data);

            return response.data;
        } catch (e) {
            setError(e);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const register = useCallback(async (data: UserRegistrationProps) => {
        try {
            setIsLoading(true);

            const response = await axios.post(`${endpoint}/`, data);

            return response.data;
        } catch (e) {
            setError(e);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const whoami = useCallback(async () => {
        try {
            setIsLoading(true);

            const response = await await axios.get(`${endpoint}/whoami`, { headers: { Authorization: `Bearer ${token}` } });

            console.log(response);
        } catch (e) {
            setError(e);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const update = useCallback(async (data: UserRegistrationProps) => {
        try {
            setIsLoading(true);

            const response = await axios.put(`${endpoint}/`, data);

            return response.data;
        } catch (e) {
            setError(e);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const deleteAccount = useCallback(async () => {
        try {
            setIsLoading(true);

            const response = await axios.delete(`${endpoint}/`, { headers: { Authorization: `Bearer ${token}` } });

            return response.data;
        } catch (e) {
            setError(e);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const logout = useCallback(async () => {
        try {
            setIsLoading(true);

            const response = await axios.put(`${endpoint}/`, {});

            return response.data;
        } catch (e) {
            setError(e);
        } finally {
            setIsLoading(false);
        }
    }, []);

    return <AuthContext.Provider
        value={{ userId, token, isLoggedIn, login, logout, isLoading, error, deleteAccount, update, whoami, register }}
    >
        {children}
    </AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
