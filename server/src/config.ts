enum Miljo {
    LABS = 'dev-gcp-labs',
    DEV_GCP = 'dev-gcp',
    PROD_GCP = 'prod-gcp',
    LOCALHOST = 'localhost',
}

const miljoMap: Record<string, Miljo> = {
    'dev-gcp-labs': Miljo.LABS,
    'dev-gcp': Miljo.DEV_GCP,
    'prod-gcp': Miljo.PROD_GCP,
    localhost: Miljo.LOCALHOST,
};

enum Env {
    PROD = 'prod',
    DEV = 'dev',
}

const MILJO = miljoMap[process.env.MILJO] ?? Miljo.LOCALHOST;
export const PORT = process.env.PORT ?? '3000';
export const ENV = MILJO === Miljo.PROD_GCP ? Env.PROD : Env.DEV;

export const APIGW_URL = MILJO !== Miljo.LOCALHOST ? process.env.APIGW_URL : 'http://localhost:8080';
export const API_AUDIENCE = MILJO !== Miljo.LOCALHOST ? process.env.API_AUDIENCE : 'dummy-audience';
export const ARBEIDSGIVER_DIALOG_URL =
    MILJO !== Miljo.LOCALHOST ? process.env.ARBEIDSGIVER_DIALOG_URL : 'http://localhost:8080';
export const DECORATOR_EXTERNAL_URL =
    MILJO !== Miljo.LOCALHOST ? process.env.DECORATOR_EXTERNAL_URL : 'http://localhost:8080';
export const DECORATOR_INTERNAL =
    MILJO !== Miljo.LOCALHOST ? process.env.DECORATOR_INTERNAL : 'https://internarbeidsflatedecorator.intern.nav.no';
export const DECORATOR_INTERNAL_SCRIPT =
    ENV !== Env.PROD
        ? 'https://cdn.nav.no/personoversikt/internarbeidsflate-decorator-v3/prod/latest/dist/bundle.js'
        : 'https://cdn.nav.no/personoversikt/internarbeidsflate-decorator-v3/dev/latest/dist/bundle.js';
export const DECORATOR_INTERNAL_STYLING =
    ENV !== Env.PROD
        ? 'https://cdn.nav.no/personoversikt/internarbeidsflate-decorator-v3/prod/latest/dist/index.css'
        : 'https://cdn.nav.no/personoversikt/internarbeidsflate-decorator-v3/dev/latest/dist/index.css';
export const ENABLE_EXTERNAL_MENU = process.env.ENABLE_EXTERNAL_MENU === 'true';
export const ENABLE_INTERNAL_MENU = process.env.ENABLE_INTERNAL_MENU === 'true';
export const INTERN_INGRESS = process.env.INTERN_INGRESS === 'true';
export const LOGIN_URL = MILJO !== Miljo.LOCALHOST ? process.env.LOGIN_URL : 'http://localhost:8080';
export const LOGOUT_URL = MILJO !== Miljo.LOCALHOST ? process.env.LOGOUT_URL : 'http://localhost:8080';
export const MODIACONTEXTHOLDER_API_SCOPE =
    MILJO !== Miljo.LOCALHOST ? process.env.MODIACONTEXTHOLDER_API_SCOPE : 'dummy-scope';
export const NOTIFIKASJON_AUDIENCE = MILJO !== Miljo.LOCALHOST ? process.env.NOTIFIKASJON_AUDIENCE : 'dummy-audience';
export const NOTIFIKASJON_URL = MILJO !== Miljo.LOCALHOST ? process.env.NOTIFIKASJON_URL : 'http://localhost:8080';
export const STILLINGSTITLER_URL =
    MILJO !== Miljo.LOCALHOST ? process.env.STILLINGSTITLER_URL : 'http://localhost:8080';
export const TILTAK_PROXY_API_SCOPE = MILJO !== Miljo.LOCALHOST ? process.env.TILTAK_PROXY_API_SCOPE : 'dummy-scope';
export const IS_LABS =
    MILJO === Miljo.LOCALHOST
        ? process.env.LABS === 'true'
        : MILJO === Miljo.LABS || ![Miljo.DEV_GCP, Miljo.PROD_GCP].includes(MILJO);
export const IS_LOCALHOST = MILJO === Miljo.LOCALHOST;
