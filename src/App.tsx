import * as React from 'react';
import { RouterProvider } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

import router from './Router/Router';

function App() {
    return (
        <CookiesProvider>
            <RouterProvider router={router} />
        </CookiesProvider>
    );
}

export default App;
