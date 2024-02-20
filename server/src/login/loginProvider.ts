import { getMiljo, Miljo } from '../paths/miljo';
import labsProxy from '../proxy/labs-proxy';
import { BaseClient } from 'openid-client';
import azure from './azure';
import apiProxy from '../proxy/api-proxy';
import decoratorInternProxy from '../proxy/decorator-intern-proxy';
import tokenx from './tokenx';
import notifikasjonProxy from '../proxy/notifikasjoner-proxy';
import decoratorEksternProxy from '../proxy/decorator-ekstern-proxy';
import { Express } from 'express';

const miljo: Miljo = getMiljo();
const setupOauth2Clients = async (server: Express) => {
    if (miljo === Miljo.DEV_GCP || miljo === Miljo.PROD_GCP) {
        if (process.env.INTERN_INGRESS) {
            return await initLoginAndProxyForInternal(server);
        }
        return await initLoginAndProxyForExternal(server);
    }
    return labsProxy.setup(server);
};

async function initLoginAndProxyForInternal(server: Express): Promise<void> {
    const client: BaseClient = await azure.client();
    const tokenEndpoint = await azure.azureTokenEndpoint();

    apiProxy.azureSetup(server, client, tokenEndpoint);
    decoratorInternProxy.setup(server, client, tokenEndpoint);

    console.log('Satt opp api-proxy med azure obh');
}

async function initLoginAndProxyForExternal(server: Express): Promise<void> {
    const tokenxAuthClient = await tokenx.client();

    apiProxy.tokenxSetup(server, tokenxAuthClient);
    notifikasjonProxy.setup(server, tokenxAuthClient);
    decoratorEksternProxy.setup(server);

    console.log('Satt opp api-proxy med tokenx');
}

export default { setupOauth2Clients };
