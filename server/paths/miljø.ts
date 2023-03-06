export enum Miljø {
    LABS = 'LABS',
    DEV_GCP = 'DEV_GCP',
    PROD_GCP = 'PROD_GCP',
    LOCALHOST = 'LOCALHOST',
}

export function getMiljø() {
    switch (process.env.NAIS_CLUSTER_NAME ?? '') {
        case 'labs-gcp':
            return Miljø.LABS;
        case 'dev-gcp':
            return Miljø.DEV_GCP;
        case 'prod-gcp':
            return Miljø.PROD_GCP;
        default:
            return Miljø.LOCALHOST;
    }
}
