import React from 'react';
import { formaterDato, NORSK_DATO_FORMAT } from '@/utils/datoUtils';
import { BodyShort, Button } from '@navikt/ds-react';

interface Props {
    className: string;
    gjeldendeInnholdStartdato?: string | undefined;
    gjeldendeInnholdSluttdato?: string | undefined;
    antallAktiveTilskuddsperioder: number;
    setVisAllePerioder: () => void;
    visAllePerioder: boolean;
}

const InfoRundtTilskuddsperioder: React.FC<Props> = ({
    gjeldendeInnholdStartdato,
    gjeldendeInnholdSluttdato,
    antallAktiveTilskuddsperioder,
    setVisAllePerioder,
    visAllePerioder,
}: Props) => {
    if (!(gjeldendeInnholdStartdato && gjeldendeInnholdSluttdato)) return null;

    return (
        <>
            <BodyShort size="small">
                Avtalen varer fra {formaterDato(gjeldendeInnholdStartdato, NORSK_DATO_FORMAT)} til{' '}
                {formaterDato(gjeldendeInnholdSluttdato, NORSK_DATO_FORMAT)}. Det tilsvarer{' '}
                {antallAktiveTilskuddsperioder} tilskuddsperioder.
            </BodyShort>
            <Button size="small" onClick={() => setVisAllePerioder()}>
                {visAllePerioder ? 'Skjul periopder' : 'Vis alle perioder'}
            </Button>
        </>
    );
};
export default InfoRundtTilskuddsperioder;
