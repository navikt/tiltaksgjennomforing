import { Express } from 'express';

import { INTERN_INGRESS, IS_LABS } from './config';
import * as labsProxy from './proxy/labs-proxy';
import * as apiProxy from './proxy/api-proxy';
import * as decoratorInternProxy from './proxy/decorator-intern-proxy';
import * as notifikasjonProxy from './proxy/notifikasjoner-proxy';
import * as decoratorEksternProxy from './proxy/decorator-ekstern-proxy';

export function setupRoutes(server: Express) {
    if (IS_LABS) {
        console.log('Bruker labs-proxy...');
        labsProxy.setup(server);
        return;
    }

    if (INTERN_INGRESS) {
        console.log('Bruker intern-proxy...');
        apiProxy.azureSetup(server);
        decoratorInternProxy.setup(server);
        return;
    }

    console.log('Bruker ekstern-proxy...');
    apiProxy.tokenxSetup(server);
    notifikasjonProxy.setup(server);
    decoratorEksternProxy.setup(server);
}
