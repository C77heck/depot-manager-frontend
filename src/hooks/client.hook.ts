import axios from 'axios';
import { useState } from 'react';

export interface ChangeStatusOptions {
    id: string;
    statusType: 'temporary-closed' | 'permanently-closed' | 'open';
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
    const endpoint = import.meta.env.VITE_API_ENDPOINT;
    const getResources = async () => {
        try {
            setIsLoading(true);

            const response = await axios.get(`${endpoint}/products/resources`);

            return response.data?.payload;
        } catch (e) {
            throw e?.response?.data?.error || 'generic.error';
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
            throw e?.response?.data?.error || 'generic.error';
        } finally {
            setIsLoading(false);
        }
    };

    const transferProduct = async (data: { cart: Record<string, number>; toWarehouseId: string }) => {
        try {
            setIsLoading(true);

            const response = await axios.put(`${endpoint}/products/transfer`, data);

            return response.data?.payload;
        } catch (e) {
            throw e?.response?.data?.error || 'generic.error';
        } finally {
            setIsLoading(false);
        }
    };

    const sendProducts = async ({ cart }: { cart: Record<string, number> }) => {
        try {
            setIsLoading(true);

            const response = await axios.put(`${endpoint}/products/send`, { cart });

            return response.data?.payload;
        } catch (e) {
            throw e?.response?.data?.error || 'generic.error';
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
            throw e?.response?.data?.error || 'generic.error';
        } finally {
            setIsLoading(false);
        }
    };

    const getAvailableWarehouses = async () => {
        try {
            setIsLoading(true);

            const response = await axios.get(`${endpoint}/warehouses/available-warehouses`);
            return response.data?.payload;
        } catch (e) {
            throw e?.response?.data?.error || 'generic.error';
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
            throw e?.response?.data?.error || 'generic.error';
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
            throw e?.response?.data?.error || 'generic.error';
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
            throw e?.response?.data?.error || 'generic.error';
        } finally {
            setIsLoading(false);
        }
    };

    const changeWarehouseStatus = async ({ id, statusType, transferWarehouseId }: ChangeStatusOptions) => {
        try {
            setIsLoading(true);

            const response = await axios.put(`${endpoint}/warehouses/change-status/${id}`, { statusType, transferWarehouseId });

            return response.data?.payload;
        } catch (e) {
            throw e?.response?.data?.error || 'generic.error';
        } finally {
            setIsLoading(false);
        }
    };

    return {
        getResources,
        createProduct,
        getWarehouses,
        createWarehouse,
        updateWarehouse,
        changeWarehouseStatus,
        getWarehouse,
        sendProducts,
        transferProduct,
        getAvailableWarehouses,
        isLoading,
    };
};
