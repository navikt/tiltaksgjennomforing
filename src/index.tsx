import '@navikt/ds-css';
import * as ReactDOMClient from 'react-dom/client';

import './index.less';
import App from './App';

const container = document.getElementById('root');
const root = ReactDOMClient.createRoot(container!);
root.render(<App />);
