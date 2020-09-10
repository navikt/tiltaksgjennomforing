export const storForbokstav = (tekst: string) => {
    return tekst ? tekst.toLowerCase().replace(/\b\w/, v => v.toUpperCase()) : tekst;
};
