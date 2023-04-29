import React from 'react';
import { AppRouter } from './app-router';
import './App.scss';
import { WithAuthContext } from './contexts/auth.context';
import { WithTranslateContext } from './contexts/translate.context';
import { Spinner } from './features/shared-ui/spinner/spinner';

function App() {
    return <React.Suspense fallback={<div><Spinner/></div>}>
        <WithTranslateContext>
            <WithAuthContext>
                <AppRouter/>
            </WithAuthContext>
        </WithTranslateContext>
    </React.Suspense>;
}

export default App;
