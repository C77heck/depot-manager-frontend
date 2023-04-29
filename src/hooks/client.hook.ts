import axios from 'axios';
import { useState } from 'react';

export interface DeleteDepotOptions {
    id: string;
    deleteType: 'temporary-closed' | 'permanently-closed';
    transferDepotId: string;
}

export const useClient = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const getResources = async () => {
        try {
            setIsLoading(true);

            const response = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}/products/resources`);

            return response.data;
        } catch (e) {
            setError(e);
        } finally {
            setIsLoading(false);
        }
    };

    const createProduct = async () => {
        try {
            setIsLoading(true);

            const response = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}/products/resources`);

            return response.data;
        } catch (e) {
            setError(e);
        } finally {
            setIsLoading(false);
        }
    };

    const transferProduct = async ({ id, depotId }: { id: string; depotId: string }) => {
        try {
            setIsLoading(true);

            const response = await axios.put(`${import.meta.env.VITE_API_ENDPOINT}/products/transfer/${id}`, { depotId });

            return response.data;
        } catch (e) {
            setError(e);
        } finally {
            setIsLoading(false);
        }
    };

    const sendProduct = async ({ id }: { id: string }) => {
        try {
            setIsLoading(true);

            const response = await axios.put(`${import.meta.env.VITE_API_ENDPOINT}/products/transfer/${id}`, {});

            return response.data;
        } catch (e) {
            setError(e);
        } finally {
            setIsLoading(false);
        }
    };

    const getDepots = async () => {
        try {
            setIsLoading(true);

            const response = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}/depots`);

            return response.data;
        } catch (e) {
            setError(e);
        } finally {
            setIsLoading(false);
        }
    };
    const getDepot = async ({ id }: { id: string }) => {
        try {
            setIsLoading(true);

            const response = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}/depots/${id}`);

            return response.data;
        } catch (e) {
            setError(e);
        } finally {
            setIsLoading(false);
        }
    };
    const createDepot = async (data: { name: string; maximumCapacity: number; }) => {
        try {
            setIsLoading(true);

            const response = await axios.post(`${import.meta.env.VITE_API_ENDPOINT}/depots`, data);

            return response.data;
        } catch (e) {
            setError(e);
        } finally {
            setIsLoading(false);
        }
    };

    const updateDepot = async (data: { id: string; name: string; maximumCapacity: number; }) => {
        try {
            setIsLoading(true);

            const response = await axios.put(`${import.meta.env.VITE_API_ENDPOINT}/depots/${data.id}`, data);

            return response.data;
        } catch (e) {
            setError(e);
        } finally {
            setIsLoading(false);
        }
    };

    const changeDepotStatus = async ({ id, newStatus, transferDepotId }: DeleteDepotOptions) => {
        try {
            setIsLoading(true);

            const response = await axios.put(`${import.meta.env.VITE_API_ENDPOINT}/depots/change-status/${id}`, { newStatus, transferDepotId });

            return response.data;
        } catch (e) {
            setError(e);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        getResources, createProduct, getDepots, createDepot, updateDepot, changeDepotStatus, getDepot, sendProduct, transferProduct,
        isLoading, error,
    };
};
