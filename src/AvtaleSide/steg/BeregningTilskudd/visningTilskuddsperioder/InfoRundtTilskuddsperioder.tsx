import React from 'react';
import { formaterDato, NORSK_DATO_FORMAT } from '@/utils/datoUtils';
import { Button } from '@navikt/ds-react';
import BEMHelper from '@/utils/bem';

interface Props {
    className: string;
    gjeldendeInnholdStartdato?: string | undefined;
    gjeldendeInnholdSluttdato?: string | undefined;
    antallAktiveTilskuddsperioder: number;
    setVisAllePerioder: (value: React.SetStateAction<boolean>) => void;
    visAllePerioder: boolean;
}

const InfoRundtTilskuddsperioder: React.FC<Props> = ({
    className,
    gjeldendeInnholdStartdato,
    gjeldendeInnholdSluttdato,
    antallAktiveTilskuddsperioder,
    setVisAllePerioder,
    visAllePerioder,
}: Props) => {
    if (!(gjeldendeInnholdStartdato && gjeldendeInnholdSluttdato)) return null;

    const cls = BEMHelper(className);
    return (
        <>
            <div className={cls.element('tabell-innslag')}>
                Avtalen varer fra {formaterDato(gjeldendeInnholdStartdato, NORSK_DATO_FORMAT)} til{' '}
                {formaterDato(gjeldendeInnholdSluttdato, NORSK_DATO_FORMAT)}. Det tilsvarer{' '}
                {antallAktiveTilskuddsperioder} tilskuddsperioder.
            </div>
            {!visAllePerioder && (
                <Button size="small" onClick={() => setVisAllePerioder(true)}>
                    Vis alle perioder
                </Button>
            )}
        </>
    );
};
export default InfoRundtTilskuddsperioder;
