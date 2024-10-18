import * as React from 'react';
import { RouterProvider } from 'react-router-dom';
import ErrorBoundary from './komponenter/ErrorBoundary';
import router from './Router';

class App extends React.Component {
    render() {
        return (
            <ErrorBoundary>
                <RouterProvider router={router} />
            </ErrorBoundary>
        );
    }
}

export default App;
