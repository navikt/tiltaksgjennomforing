declare global {
    namespace NodeJS {
        interface ProcessEnv {
            TILTAK_PROXY_API_SCOPE: string;
            MODIACONTEXTHOLDER_API_SCOPE: string;
            APIGW_URL: string;
        }
    }
}

export {};
