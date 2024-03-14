import { injectDecoratorServerSide } from '@navikt/nav-dekoratoren-moduler/ssr';
import { Request, Response } from 'express-serve-static-core';

import { getEnv } from '../paths/miljo';

async function getNavdekoratoren(
    indexFilepath: string,
    req: Request,
    res: Response<any, Record<string, any>, number>,
): Promise<void> {
    const contextBaserPåInnloggetPart = req.cookies['innlogget-part'] === 'DELTAKER' ? 'privatperson' : 'arbeidsgiver';
    return await injectDecoratorServerSide({
        env: getEnv(),
        filePath: indexFilepath,
        params: {
            context: contextBaserPåInnloggetPart,
            chatbot: true,
            redirectToApp: true,
            level: 'Level4',
            language: 'nb',
        },
    })
        .then((html) => {
            res.send(html);
        })
        .catch((err) => console.log('Feil ved henting av dekorator: ', err));
}

export default { getNavdekoratoren };
