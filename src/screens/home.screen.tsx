import { WarehouseList } from '../features/warehouse/warehouse-list';
import { ScreenProps, ScreenRoute } from './libs/screen.route';

export const HomeScreen = (props: ScreenProps) => {

    return <ScreenRoute {...props}>
        <WarehouseList/>
    </ScreenRoute>;
};
