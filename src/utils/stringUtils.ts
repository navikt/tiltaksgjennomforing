import _ from 'lodash';
export const storForbokstav = (tekst: string) => {
    return tekst ? tekst.toLowerCase().replace(/\b\w/, v => v.toUpperCase()) : tekst;
};

export const litenForbokstav = (tekst: string) => {
    return tekst ? tekst.toLowerCase() : tekst;
};

// https://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
export const escapeRegExp = (streng: string) => streng.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export const fjernTommeFelterFraObjekt = (objekt: any) => _.pickBy(objekt);

export const lagObjektAvSearchParams = (searchParams: URLSearchParams) => {
    const objekt: any = {};
    searchParams.forEach((value, key) => {
        objekt[key] = value;
    });
    return objekt;
}