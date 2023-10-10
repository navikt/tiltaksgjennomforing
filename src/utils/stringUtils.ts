export const storForbokstav = (tekst: string) => {
    return tekst ? tekst.toLowerCase().replace(/\b\w/, v => v.toUpperCase()) : tekst;
};

export const litenForbokstav = (tekst: string) => {
    return tekst ? tekst.toLowerCase() : tekst;
};

// https://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
export const escapeRegExp = (streng: string) => streng.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export const getJsonObjectFromString = (str?: string | null) => {
    if (!str) return {};
    try {
        const obj = JSON.parse(str);
        if (typeof obj === 'object') {
            return obj;
        } else {
            return {};
        }
    } catch (e) {
        return {};
    }
}