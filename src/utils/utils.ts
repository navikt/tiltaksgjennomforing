export const miljo = () => {
    switch (window.location.hostname) {
        case 'arbeidsgiver.nav.no':
        case 'tiltaksgjennomforing.intern.nav.no':
            return 'prod';
        case 'tiltaksgjennomforing.intern.dev.nav.no':
        case 'tiltaksgjennomforing.ekstern.dev.nav.no':
            return 'dev';
        default:
            return 'local';
    }
};

type RemoveUndefined<T> = {
    [P in keyof T]: undefined extends T[P] ? never : null extends T[P] ? never : P;
}[keyof T];

export const fjernTommeFelterFraObjekt = <T extends object>(objekt: T): Pick<T, RemoveUndefined<T>> => {
    const copy = { ...objekt };
    const keys = Object.keys(copy) as Array<keyof T>;
    keys.forEach((key) => {
        if (copy[key] === undefined || copy[key] === null) {
            delete copy[key];
        }
    });
    return copy as Pick<T, RemoveUndefined<T>>;
};
