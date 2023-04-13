import { injectDecoratorServerSide } from '@navikt/nav-dekoratoren-moduler/ssr';
import { Response } from 'express-serve-static-core';

enum Env {
    PROD = 'prod',
    DEV = 'dev',
}

function getEnv(): Env {
    return process.env.NAIS_CLUSTER_NAME === 'prod-gcp' ? Env.PROD : Env.DEV;
}

async function getNavdekoratoren(
    indexFilepath: string,
    res: Response<any, Record<string, any>, number>
): Promise<void> {
    return await injectDecoratorServerSide({
        env: 'dev',
        filePath: indexFilepath,
        chatbot: true,
        context: 'arbeidsgiver',
        redirectToApp: true,
        level: 'Level4',
        language: 'nb',
    })
        .then((html) => {
            res.send(html);
        })
        .catch((err) => console.log('Feil ved henting av dekorator: ', err));
}

export default { getNavdekoratoren };
