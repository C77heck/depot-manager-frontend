import { createContext, useCallback, useContext, useState } from 'react';
import { Children } from './auth.context';

const ResourceRefresherContext = createContext({
    refresh: false,
    triggerRefresh: () => {
    }
});

export const WithResourceRefresherContext = ({ children }: { children: Children }) => {
    const [refresh, setRefresh] = useState(false);

    const triggerRefresh = useCallback(() => {
        setRefresh(!refresh);
    }, []);

    return <ResourceRefresherContext.Provider value={{ refresh, triggerRefresh }}>
        {children}
    </ResourceRefresherContext.Provider>;
};

export const useResourceRefresherContext = () => useContext(ResourceRefresherContext);
