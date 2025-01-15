import React, { useContext, useEffect, useState } from 'react';
import { BodyShort, Label } from '@navikt/ds-react';
import { TilskuddsPeriode } from '@/types/avtale';
import { formatterDato, NORSK_DATO_FORMAT } from '@/utils/datoUtils';
import EtikettStatus from '@/BeslutterSide/EtikettStatus';
import { formaterPenger } from '@/utils/PengeUtils';
import InfoRundtTilskuddsperioder from '@/AvtaleSide/steg/BeregningTilskudd/visningTilskuddsperioder/InfoRundtTilskuddsperioder';
import BEMHelper from '@/utils/bem';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import { AvtaleContext } from '@/AvtaleProvider';
import moment from 'moment';
import {
    antallAktiveTilskuddsperioder,
    getIndexVisningForTilskuddsperiode,
} from '@/AvtaleSide/steg/BeregningTilskudd/visningTilskuddsperioder/visningTilskuddsperiodeUtils';

interface Properties {
    className: string;
}

const VisningTilskuddsperioderTabellVtao: React.FC<Properties> = ({ className }: Properties) => {
    const [visAllePerioder, setVisAllePerioder] = useState(false);
    const innloggetBruker = useContext(InnloggetBrukerContext);
    const { avtale } = useContext(AvtaleContext);
    const { startIndexVisning, sluttIndexVisning } = getIndexVisningForTilskuddsperiode(avtale, visAllePerioder);
    const cls = BEMHelper(className);
    const sistePeriode = avtale.tilskuddPeriode.at(antallAktiveTilskuddsperioder(avtale) - 1);
    const sistePeriodeAar = sistePeriode ? moment(sistePeriode?.startDato).year() : undefined;
    const sistePeriodeErITidligereAar = sistePeriodeAar
        ? sistePeriodeAar < moment(avtale.opprettetTidspunkt).year()
        : false;

    return (
        <div className={cls.element('tabell')}>
            <div className={cls.element('tabell-ingress')}>
                <Label>Tilskudd for perioder</Label>
                {innloggetBruker.erNavAnsatt && <Label>Status</Label>}
                <Label>Inntil</Label>
                <Label>Utbetales</Label>
            </div>
            {avtale.tilskuddPeriode
                .filter((p: TilskuddsPeriode) => p.aktiv)
                .slice(startIndexVisning, sluttIndexVisning)
                .map((periode: TilskuddsPeriode, index: number) => {
                    const periodeAar = moment(periode.startDato).year();
                    const erITidligereAar = periodeAar < moment(avtale.opprettetTidspunkt).year();
                    return (
                        <div>
                            <div key={index} className={cls.element('tabell-innslag')}>
                                <div>
                                    <BodyShort size="small">
                                        {formatterDato(periode.startDato, NORSK_DATO_FORMAT)} -{' '}
                                        {formatterDato(periode.sluttDato, NORSK_DATO_FORMAT)}
                                    </BodyShort>
                                    {erITidligereAar && (
                                        <BodyShort size="small" textColor="subtle">
                                            Sats for {periodeAar}
                                        </BodyShort>
                                    )}
                                </div>
                                {innloggetBruker.erNavAnsatt && (
                                    <BodyShort>
                                        <EtikettStatus tilskuddsperiodestatus={periode.status} size="small" />
                                    </BodyShort>
                                )}
                                <BodyShort size="small" style={{ minWidth: '4rem' }}>
                                    {periode.beløp !== null ? formaterPenger(periode.beløp) : '-'}
                                </BodyShort>
                                <BodyShort size="small" style={{ minWidth: '4rem' }}>
                                    {formatterDato(moment(periode.sluttDato).add(3, 'days').toString(), 'DD MMM YYYY')}
                                </BodyShort>
                            </div>
                        </div>
                    );
                })}
            {!visAllePerioder && sistePeriode && (
                <div>
                    <div key={1} className={cls.element('tabell-innslag')}>
                        ...
                    </div>
                    <div className={cls.element('tabell-innslag')}>
                        <div>
                            <BodyShort size="small">
                                {formatterDato(sistePeriode.startDato, NORSK_DATO_FORMAT)} -{' '}
                                {formatterDato(sistePeriode.sluttDato, NORSK_DATO_FORMAT)}
                            </BodyShort>
                            {sistePeriodeErITidligereAar && (
                                <BodyShort size="small" textColor="subtle">
                                    Sats for {sistePeriodeAar}
                                </BodyShort>
                            )}
                        </div>
                        {innloggetBruker.erNavAnsatt && (
                            <BodyShort>
                                <EtikettStatus tilskuddsperiodestatus={sistePeriode.status} size="small" />
                            </BodyShort>
                        )}
                        <BodyShort size="small" style={{ minWidth: '4rem' }}>
                            {sistePeriode.beløp !== null ? formaterPenger(sistePeriode.beløp) : '-'}
                        </BodyShort>
                        <BodyShort size="small" style={{ minWidth: '4rem' }}>
                            {formatterDato(moment(sistePeriode.sluttDato).add(3, 'days').toString(), 'DD MMM YYYY')}
                        </BodyShort>
                    </div>
                </div>
            )}
            <InfoRundtTilskuddsperioder
                className={cls.className}
                gjeldendeInnholdStartdato={avtale.gjeldendeInnhold.startDato}
                gjeldendeInnholdSluttdato={avtale.gjeldendeInnhold.sluttDato}
                antallAktiveTilskuddsperioder={antallAktiveTilskuddsperioder(avtale)}
                setVisAllePerioder={setVisAllePerioder}
                visAllePerioder={visAllePerioder}
            />
        </div>
    );
};
export default VisningTilskuddsperioderTabellVtao;
