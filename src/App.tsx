import React from 'react';
import { AppRouter } from './app-router';
import './App.scss';
import { WithAuthContext } from './contexts/auth.context';
import { WithResourceRefresherContext } from './contexts/resource-refresher.context';
import { WithTranslateContext } from './contexts/translate.context';
import { Spinner } from './features/shared-ui/spinner/spinner';

function App() {
    return <React.Suspense fallback={<div><Spinner/></div>}>
        <WithResourceRefresherContext>
            <WithTranslateContext>
                <WithAuthContext>
                    <AppRouter/>
                </WithAuthContext>
            </WithTranslateContext>
        </WithResourceRefresherContext>
    </React.Suspense>;
}

export default App;
