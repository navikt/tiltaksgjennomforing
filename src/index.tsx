import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import { Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <App />
        </Switch>
    </BrowserRouter>,
    document.getElementById('root') as HTMLElement
);
