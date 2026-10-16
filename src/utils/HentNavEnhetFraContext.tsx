import { Avtale } from '@/types/avtale';
import React, { FunctionComponent, useContext } from 'react';
import { AvtaleContext } from '@/AvtaleProvider';

interface Props {
    enhetsnr: keyof Avtale;
    enhetsNavn: keyof Avtale;
}

const HentNavEnhetFraContext: FunctionComponent<Props> = (props: Props) => {
    const { avtale } = useContext(AvtaleContext);
    const { enhetsnr, enhetsNavn } = props;
    if (avtale[enhetsnr]) {
        const nr = avtale[enhetsnr];
        return typeof avtale[enhetsNavn] === 'string' && (avtale[enhetsNavn] as string).length > 0 ? (
            <>{(avtale[enhetsNavn] as string).concat(' - ').concat(nr as string)}</>
        ) : (
            <>{nr}</>
        );
    }
    return <em>Ikke oppgitt</em>;
};
export default HentNavEnhetFraContext;
