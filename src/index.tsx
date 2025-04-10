import '@navikt/ds-css';
import { init as Sentry, breadcrumbsIntegration } from '@sentry/react';
import * as ReactDOMClient from 'react-dom/client';

import './index.less';
import App from './App';

declare const GIT_COMMIT_HASH: string;

Sentry({
    dsn: 'https://3a5b579938bc4d6c9011c48d34af18f8@sentry.gc.nav.no/4',
    release: GIT_COMMIT_HASH || 'unknown',
    environment: window.location.hostname,
    integrations: [breadcrumbsIntegration({ console: false })],
});

const container = document.getElementById('root');
const root = ReactDOMClient.createRoot(container!);
root.render(<App />);
