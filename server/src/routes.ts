import { Express } from 'express';

import { getMiljo, Miljo } from './paths/miljo';
import * as labsProxy from './proxy/labs-proxy';
import * as apiProxy from './proxy/api-proxy';
import * as decoratorInternProxy from './proxy/decorator-intern-proxy';
import * as notifikasjonProxy from './proxy/notifikasjoner-proxy';
import * as decoratorEksternProxy from './proxy/decorator-ekstern-proxy';

export const setupRoutes = async (server: Express) => {
    const miljo: Miljo = getMiljo();

    if (miljo === Miljo.DEV_GCP || miljo === Miljo.PROD_GCP) {
        if (process.env.INTERN_INGRESS) {
            apiProxy.azureSetup(server);
            decoratorInternProxy.setup(server);
        } else {
            apiProxy.tokenxSetup(server);
            notifikasjonProxy.setup(server);
            decoratorEksternProxy.setup(server);
        }
    } else {
        labsProxy.setup(server);
    }
};
