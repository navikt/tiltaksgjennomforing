import { Avtale } from '@/types/avtale';
import React, { FunctionComponent, useContext } from 'react';
import { AvtaleContext } from '@/AvtaleProvider';
import BEMHelper from '@/utils/bem';

interface Props {
    enhetsnr: keyof Avtale;
    enhetsNavn: keyof Avtale;

    className: string;
}

const HentNavEnhetFraContext: FunctionComponent<Props> = (props: Props) => {
    const cls = BEMHelper(props.className);
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
    return <em className={cls.element('info-verdi')}>Ikke oppgitt</em>;
};
export default HentNavEnhetFraContext;
