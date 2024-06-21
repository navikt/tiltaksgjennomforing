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
                Avtalen varer i {moment(gjeldendeInnholdSluttdato).diff(gjeldendeInnholdStartdato, 'years')} {'år.'}
                <br />
                Det tilsvarer en refusjon til arbeisgiver på ca {formatterPenger(6808 * 12)} i året og totalt{' '}
                {formatterPenger(antallAktiveTilskuddsperioder * 6808)} kr for hele perioden .
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
