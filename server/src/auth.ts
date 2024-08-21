import * as oasis from '@navikt/oasis';
import { IncomingMessage } from 'http';

import { IS_LOCALHOST } from './config';

export const requestOboToken = async (audience: string, req: IncomingMessage) => {
    if (IS_LOCALHOST) {
        return 'mock-token';
    }

    const token = oasis.getToken(req);
    if (!token) {
        // TODO: handle missing token
        throw Error('missing token in req');
    }

    const validation = await oasis.validateToken(token);
    if (!validation.ok) {
        // TODO: handle validation error
        throw validation.error;
    }

    const obo = await oasis.requestOboToken(token, audience);
    if (!obo.ok) {
        // TODO: handle obo error
        throw obo.error;
    }

    return obo.token;
};
