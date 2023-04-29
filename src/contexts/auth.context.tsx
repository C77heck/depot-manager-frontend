import axios from 'axios';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { Storage } from '../libs/storage';

export interface UserProps {
    userId: string;
    token: string;
    expiry: number;
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
    const endpoint = `${import.meta.env.VITE_API_ENDPOINT}/user`;
    const storage = new Storage<UserProps>('auth');
    const [userId, setUserId] = useState('');
    const [token, setToken] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const savedAuth = storage.get();

        if (savedAuth && savedAuth.expiry > Date.now()) {
            setUserId(userId);
            setToken(token);
            setIsLoggedIn(true);
        }
    }, []);

    const login = useCallback(async (data: UserProps) => {
        try {
            setIsLoading(true);

            const response = await axios.post(`${endpoint}/login`, data);

            const token = response.data?.payload?.token;
            const userId = response.data?.payload?.userId;
            const expiry = Date.now() + 1000 * 60 * 60 * 24;
            setUserId(userId);
            setToken(token);
            setIsLoggedIn(true);
            storage.set({ token, userId, expiry });

            return response.data?.payload;
        } catch (e) {
            setError(e);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const register = useCallback(async (data: UserRegistrationProps) => {
        try {
            setIsLoading(true);

            const response = await axios.post(`${endpoint}/register`, data);

            setUserId(response.data?.payload?.userId);
            setToken(response.data?.payload?.token);

            return response.data?.payload;
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
        } catch (e) {
            setError(e);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const update = useCallback(async (data: UserRegistrationProps) => {
        try {
            setIsLoading(true);

            const response = await axios.put(`${endpoint}/update`, data);

            return response.data?.payload;
        } catch (e) {
            setError(e);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const deleteAccount = useCallback(async () => {
        try {
            setIsLoading(true);

            const response = await axios.delete(`${endpoint}/delete-account`, { headers: { Authorization: `Bearer ${token}` } });

            return response.data?.payload;
        } catch (e) {
            setError(e);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const logout = useCallback(async () => {
        try {
            setIsLoading(true);
            setIsLoggedIn(false);
            setToken('');
            setUserId('');
            storage.clear();
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
