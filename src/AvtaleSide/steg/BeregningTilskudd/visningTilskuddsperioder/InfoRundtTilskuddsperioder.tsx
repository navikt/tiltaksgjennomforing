import React from 'react';
import { formaterDato, NORSK_DATO_FORMAT } from '@/utils/datoUtils';
import { BodyShort, Button } from '@navikt/ds-react';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';

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
            <VerticalSpacer rem={1} />
            <Button size="small" onClick={() => setVisAllePerioder()}>
                {visAllePerioder ? 'Skjul perioder' : 'Vis alle perioder'}
            </Button>
        </>
    );
};
export default InfoRundtTilskuddsperioder;
