import { BrowserRouter as Router, } from 'react-router-dom';
import { Constants } from './libs/constants';
import { HomeScreen } from './screens/home.screen';
import { ViewWarehouseScreen } from './screens/view-warehouse.screen';

export const AppRouter = () => {
    const { home, warehouse } = Constants.routes;

    return <Router>
        <HomeScreen
            route={home.link}
            auth={false}
        />
        <ViewWarehouseScreen
            route={warehouse.link}
            auth={false}
        />
    </Router>;
};
