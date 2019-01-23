import 'babel-polyfill';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.less';

if (process.env.NODE_ENV === 'development') {
    console.log('========================================');
    console.log('=============== MED MOCK ===============');
    console.log('===DETTE SKAL DU IKKE SE I PRODUKSJON===');
    console.log('========================================');
    require('./mocking/mock');
}

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);
