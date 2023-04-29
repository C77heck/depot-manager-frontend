import axios from 'axios';
import { useState } from 'react';

export interface DeleteDepotOptions {
    id: string;
    deleteType: 'temporary-closed' | 'permanently-closed';
    transferDepotId: string;
}

export interface CreateDepotOptions {
    name: string;
    maximumCapacity: number;
}

export type UpdateDepotOptions = { id: string } & CreateDepotOptions;

export const useClient = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const endpoint = import.meta.env.VITE_API_ENDPOINT;
    const getResources = async () => {
        try {
            setIsLoading(true);

            const response = await axios.get(`${endpoint}/products/resources`);

            return response.data?.payload;
        } catch (e) {
            setError(e);
        } finally {
            setIsLoading(false);
        }
    };

    const createProduct = async () => {
        try {
            setIsLoading(true);

            const response = await axios.get(`${endpoint}/products/resources`);

            return response.data?.payload;
        } catch (e) {
            setError(e);
        } finally {
            setIsLoading(false);
        }
    };

    const transferProduct = async ({ id, depotId }: { id: string; depotId: string }) => {
        try {
            setIsLoading(true);

            const response = await axios.put(`${endpoint}/products/transfer/${id}`, { depotId });

            return response.data?.payload;
        } catch (e) {
            setError(e);
        } finally {
            setIsLoading(false);
        }
    };

    const sendProduct = async ({ id }: { id: string }) => {
        try {
            setIsLoading(true);

            const response = await axios.put(`${endpoint}/products/transfer/${id}`, {});

            return response.data?.payload;
        } catch (e) {
            setError(e);
        } finally {
            setIsLoading(false);
        }
    };

    const getDepots = async () => {
        try {
            setIsLoading(true);

            const response = await axios.get(`${endpoint}/depots`);
            return response.data?.payload;
        } catch (e) {
            setError(e);
        } finally {
            setIsLoading(false);
        }
    };
    const getDepot = async ({ id }: { id: string }) => {
        try {
            setIsLoading(true);

            const response = await axios.get(`${endpoint}/depots/${id}`);

            return response.data?.payload;
        } catch (e) {
            setError(e);
        } finally {
            setIsLoading(false);
        }
    };
    const createDepot = async (data: CreateDepotOptions) => {
        try {
            setIsLoading(true);

            const response = await axios.post(`${endpoint}/depots`, data);

            return response.data?.payload;
        } catch (e) {
            setError(e);
        } finally {
            setIsLoading(false);
        }
    };

    const updateDepot = async (data: UpdateDepotOptions) => {
        try {
            setIsLoading(true);

            const response = await axios.put(`${endpoint}/depots/${data.id}`, data);

            return response.data?.payload;
        } catch (e) {
            setError(e);
        } finally {
            setIsLoading(false);
        }
    };

    const changeDepotStatus = async ({ id, newStatus, transferDepotId }: DeleteDepotOptions) => {
        try {
            setIsLoading(true);

            const response = await axios.put(`${endpoint}/depots/change-status/${id}`, { newStatus, transferDepotId });

            return response.data?.payload;
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
