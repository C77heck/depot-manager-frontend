import { useLocation } from "react-router-dom";
import { WarehouseView } from '../features/warehouse/warehouse-details/warehouse-view';
import { ScreenProps, ScreenRoute } from './libs/screen.route';

export const ViewWarehouseScreen = (props: ScreenProps) => {
    const { pathname } = useLocation();

    return <ScreenRoute {...props}>
        <WarehouseView id={pathname?.replace('/warehouse/', '')}/>
    </ScreenRoute>;
};
