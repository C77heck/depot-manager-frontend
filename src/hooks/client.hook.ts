import axios from 'axios';
import { useState } from 'react';

export interface DeleteWarehouseOptions {
    id: string;
    deleteType: 'temporary-closed' | 'permanently-closed';
    transferWarehouseId: string;
}

export interface CreateWarehouseOptions {
    name: string;
    maximumCapacity: number;
}

export interface ProductCreateOptions {
    options: Record<string, number>;
    warehouseId: string;
}

export type UpdateWarehouseOptions = { id: string } & CreateWarehouseOptions;

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

    const createProduct = async (data: ProductCreateOptions) => {
        try {
            setIsLoading(true);

            const response = await axios.post(`${endpoint}/products`, data);

            return response.data?.payload;
        } catch (e) {
            setError(e);
        } finally {
            setIsLoading(false);
        }
    };

    const transferProduct = async ({ id, warehouseId }: { id: string; warehouseId: string }) => {
        try {
            setIsLoading(true);

            const response = await axios.put(`${endpoint}/products/transfer/${id}`, { warehouseId });

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

    const getWarehouses = async () => {
        try {
            setIsLoading(true);

            const response = await axios.get(`${endpoint}/warehouses`);
            return response.data?.payload;
        } catch (e) {
            setError(e);
        } finally {
            setIsLoading(false);
        }
    };
    const getWarehouse = async ({ id }: { id: string }) => {
        try {
            setIsLoading(true);

            const response = await axios.get(`${endpoint}/warehouses/${id}`);

            return response.data?.payload;
        } catch (e) {
            setError(e);
        } finally {
            setIsLoading(false);
        }
    };
    const createWarehouse = async (data: CreateWarehouseOptions) => {
        try {
            setIsLoading(true);

            const response = await axios.post(`${endpoint}/warehouses`, data);

            return response.data?.payload;
        } catch (e) {
            setError(e);
        } finally {
            setIsLoading(false);
        }
    };

    const updateWarehouse = async (data: UpdateWarehouseOptions) => {
        try {
            setIsLoading(true);

            const response = await axios.put(`${endpoint}/warehouses/${data.id}`, data);

            return response.data?.payload;
        } catch (e) {
            setError(e);
        } finally {
            setIsLoading(false);
        }
    };

    const changeWarehouseStatus = async ({ id, newStatus, transferWarehouseId }: DeleteWarehouseOptions) => {
        try {
            setIsLoading(true);

            const response = await axios.put(`${endpoint}/warehouses/change-status/${id}`, { newStatus, transferWarehouseId });

            return response.data?.payload;
        } catch (e) {
            setError(e);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        getResources, createProduct, getWarehouses, createWarehouse, updateWarehouse, changeWarehouseStatus, getWarehouse, sendProduct, transferProduct,
        isLoading, error,
    };
};
