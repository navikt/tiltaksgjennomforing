import * as React from 'react';
import { RouterProvider } from 'react-router-dom';

import router from './Router/Router';

function App() {
    return <RouterProvider router={router} />;
}

export default App;
