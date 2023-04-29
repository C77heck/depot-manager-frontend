import { BrowserRouter as Router, } from 'react-router-dom';
import { Constants } from './libs/constants';
import { HomeScreen } from './screens/home.screen';

export const AppRouter = () => {
    const { home } = Constants.routes;

    return <Router>
        <HomeScreen
            route={home.link}
            auth={false}
        />
    </Router>;
};
