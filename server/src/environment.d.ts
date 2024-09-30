declare global {
    namespace NodeJS {
        interface ProcessEnv {
            AAD_REDIRECT_URL: string;
            APIGW_URL: string;
            API_AUDIENCE: string;
            ARBEIDSGIVER_DIALOG_URL: string;
            DECORATOR_EXTERNAL_URL: string;
            ENABLE_EXTERNAL_MENU: string;
            ENABLE_INTERNAL_MENU: string;
            INTERN_INGRESS: string;
            LOGIN_URL: string;
            LOGOUT_URL: string;
            MILJO: string;
            MODIACONTEXTHOLDER_API_SCOPE: string;
            NOTIFIKASJON_AUDIENCE: string;
            NOTIFIKASJON_URL: string;
            STILLINGSTITLER_URL: string;
            TILTAK_PROXY_API_SCOPE: string;
        }
    }
}

export {};
