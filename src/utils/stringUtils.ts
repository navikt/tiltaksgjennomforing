export const storForbokstav = (tekst: string) => {
    return tekst ? tekst.toLowerCase().replace(/\b\w/, (v) => v.toUpperCase()) : tekst;
};

export const litenForbokstav = (tekst: string) => {
    return tekst ? tekst.toLowerCase() : tekst;
};

export const kunStorForbokstav = (tekst: string) => {
    return tekst ? tekst.replace(/\b\w/, (v) => v.toUpperCase()) : tekst;
};

// https://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
export const escapeRegExp = (streng: string) => streng.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
