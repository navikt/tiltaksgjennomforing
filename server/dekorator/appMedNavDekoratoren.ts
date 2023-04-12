import { injectDecoratorServerSide } from '@navikt/nav-dekoratoren-moduler/ssr';

enum Env {
    PROD = 'prod',
    DEV = 'dev',
}

function getEnv(): Env {
    return process.env.NAIS_CLUSTER_NAME === 'prod-gcp' ? Env.PROD : Env.DEV;
}

async function getNavdekoratoren(indexFilepath: string): Promise<string> {
    return await injectDecoratorServerSide({
        env: getEnv(),
        context: 'arbeidsgiver',
        language: 'nb',
        availableLanguages: [],
        breadcrumbs: [],
        enforceLogin: false,
        feedback: false,
        filePath: indexFilepath,
        level: '4',
        logoutUrl: process.env.LOGOUT_URL ?? 'https://arbeidsgiver.nav.no/tiltaksgjennomforing',
        redirectToApp: true,
        redirectToUrl: '/tiltaksgjennomforing',
        shareScreen: true,
        simple: false,
        urlLookupTable: false,
        utilsBackground: undefined,
        utloggingsvarsel: false,
        chatbot: true,
    });
}
export default { getNavdekoratoren };
