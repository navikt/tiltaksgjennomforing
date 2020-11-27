import { init as Sentry, Integrations } from '@sentry/react';
import 'babel-polyfill';
import * as React from 'react';
import 'react-app-polyfill/ie9';
import * as ReactDOM from 'react-dom';
import 'url-search-params-polyfill';
import App from './App';
import './index.less';

Sentry({
    dsn: 'https://3a5b579938bc4d6c9011c48d34af18f8@sentry.gc.nav.no/4',
    release: process.env.GIT_COMMIT_HASH || 'unknown',
    environment: window.location.hostname,
    integrations: [new Integrations.Breadcrumbs({ console: false })],
});
if (!global.Intl) {
    global.Intl = require('intl');
}

if (process.env.REACT_APP_MOCK) {
    console.log('==========================================');
    console.log('================ MED MOCK ================');
    console.log('=== DETTE SKAL DU IKKE SE I PRODUKSJON ===');
    console.log('==========================================');
    require('./mocking/mock');
}

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);
