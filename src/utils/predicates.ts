/**
 * Sjekker om en verdi er null eller undefined
 */
export const erNil = (x: any): x is null | undefined => x === null || x === undefined;

/**
 * Sjekker om en verdi er en tom tekststreng (med mellomrom foran og bak teksten trimmet vekk)
 */
export const erTomTekst = (x: any): x is string => typeof x === 'string' && x.trim() === '';
