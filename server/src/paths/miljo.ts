export enum Miljo {
    LABS = 'LABS',
    DEV_GCP = 'DEV_GCP',
    PROD_GCP = 'PROD_GCP',
    LOCALHOST = 'LOCALHOST',
}

enum Env {
    PROD = 'prod',
    DEV = 'dev',
}

export function getMiljo() {
    switch (process.env.MILJO ?? '') {
        case 'dev-gcp-labs':
            return Miljo.LABS;
        case 'dev-gcp':
            return Miljo.DEV_GCP;
        case 'prod-gcp':
            return Miljo.PROD_GCP;
        default:
            return Miljo.LOCALHOST;
    }
}

export function getEnv(): Env {
    return getMiljo() === Miljo.PROD_GCP ? Env.PROD : Env.DEV;
}
