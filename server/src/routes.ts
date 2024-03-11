import { getMiljo, Miljo } from './paths/miljo';
import labsProxy from './proxy/labs-proxy';
import apiProxy from './proxy/api-proxy';
import decoratorInternProxy from './proxy/decorator-intern-proxy';
import notifikasjonProxy from './proxy/notifikasjoner-proxy';
import decoratorEksternProxy from './proxy/decorator-ekstern-proxy';
import { Express } from 'express';

export const setupRoutes = async (server: Express) => {
    const miljo: Miljo = getMiljo();

    if (miljo === Miljo.DEV_GCP || miljo === Miljo.PROD_GCP) {
        apiProxy.azureSetup(server);

        if (process.env.INTERN_INGRESS) {
            decoratorInternProxy.setup(server);
        } else {
            notifikasjonProxy.setup(server);
            decoratorEksternProxy.setup(server);
        }
    }
    labsProxy.setup(server);
};
