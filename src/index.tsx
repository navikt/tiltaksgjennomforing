import 'babel-polyfill';
import 'react-app-polyfill/ie9';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.less';

if (!global.Intl) {
    global.Intl = require('intl');
}

if (process.env.REACT_APP_MOCK) {
    console.log('========================================');
    console.log('=============== MED MOCK ===============');
    console.log('===DETTE SKAL DU IKKE SE I PRODUKSJON===');
    console.log('========================================');
    require('./mocking/mock');
}

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);
