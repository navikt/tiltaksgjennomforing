import React from 'react';
import { formatterDato, NORSK_DATO_FORMAT } from '@/utils/datoUtils';
import { Button } from '@navikt/ds-react';
import BEMHelper from '@/utils/bem';
import moment from 'moment';
import { formatterPenger } from '@/utils/PengeUtils';

interface Props {
    className: string;
    gjeldendeInnholdStartdato?: string | undefined;
    gjeldendeInnholdSluttdato?: string | undefined;
    antallAktiveTilskuddsperioder: number;
    setVisAllePerioder: (value: React.SetStateAction<boolean>) => void;
    visAllePerioder: boolean;
    tiltakstype: string;
}

const InfoRundtTilskuddsperioder: React.FC<Props> = ({
    className,
    gjeldendeInnholdStartdato,
    gjeldendeInnholdSluttdato,
    antallAktiveTilskuddsperioder,
    setVisAllePerioder,
    visAllePerioder,
    tiltakstype,
}: Props) => {
    if (!(gjeldendeInnholdStartdato && gjeldendeInnholdSluttdato)) return null;

    const cls = BEMHelper(className);
    return (
        <>
            <div className={cls.element('tabell-innslag')}>
                {tiltakstype === 'VTAO' ? (
                    <>
                        {/* TODO: Vi må kanskje gå over fra måneder til år når man er over 12 måneder?  */}
                        Avtalen varer i{' '}
                        {moment(gjeldendeInnholdSluttdato).diff(moment(gjeldendeInnholdStartdato), 'months')}{' '}
                        {'måneder.'}
                        <br />
                        Det tilsvarer en refusjon til arbeisgiver på ca {formatterPenger(6808 * 12)} i året og totalt{' '}
                        {formatterPenger(antallAktiveTilskuddsperioder * 6808)} kr for hele perioden .
                    </>
                ) : (
                    <>
                        Avtalen varer fra {formatterDato(gjeldendeInnholdStartdato, NORSK_DATO_FORMAT)} til{' '}
                        {formatterDato(gjeldendeInnholdSluttdato, NORSK_DATO_FORMAT)}. Det tilsvarer{' '}
                        {antallAktiveTilskuddsperioder} tilskuddsperioder.
                    </>
                )}
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
