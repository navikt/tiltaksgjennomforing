import { Avtale } from '@/types/avtale';
import React, { useContext } from 'react';
import { AvtaleContext } from '@/AvtaleProvider';

export const SetEnhet = (enhetsnr: keyof Avtale, enhetsNavn: keyof Avtale) => {
    const { avtale } = useContext(AvtaleContext);
    if (avtale[enhetsnr]) {
        const nr = avtale[enhetsnr];
        return typeof avtale[enhetsNavn] === 'string' && (avtale[enhetsNavn] as string).length > 0
            ? (avtale[enhetsNavn] as string).concat(' - ').concat(nr as string)
            : nr;
    }
    return <em>Ikke Oppgitt</em>;
};
