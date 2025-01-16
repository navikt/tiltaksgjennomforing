import React, { useContext, useState } from 'react';
import { BodyShort, Label } from '@navikt/ds-react';
import { TilskuddsPeriode } from '@/types/avtale';
import { formaterDatoNy, formaterPeriodeNy, NORSK_DATO_FORMAT_NY } from '@/utils/datoUtils';
import EtikettStatus from '@/BeslutterSide/EtikettStatus';
import { formaterPenger } from '@/utils/PengeUtils';
import InfoRundtTilskuddsperioder from '@/AvtaleSide/steg/BeregningTilskudd/visningTilskuddsperioder/InfoRundtTilskuddsperioder';
import BEMHelper from '@/utils/bem';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import { AvtaleContext } from '@/AvtaleProvider';
import { getYear, addDays } from 'date-fns';
import {
    antallAktiveTilskuddsperioder,
    getIndexVisningForTilskuddsperiode,
} from '@/AvtaleSide/steg/BeregningTilskudd/visningTilskuddsperioder/visningTilskuddsperiodeUtils';

interface Properties {
    className: string;
}

const tilskuddsperiodeRad = ({
    key,
    cls,
    avtaleOpprettet,
    erNavAnsatt,
    periode,
}: {
    key?: number;
    cls: any;
    avtaleOpprettet: Date;
    erNavAnsatt: boolean;
    periode: TilskuddsPeriode;
}) => {
    const periodeAar = getYear(new Date(periode.startDato));
    // Hvis tilskuddsperioden gjelder for et tidligere år enn når avtalen er opprettet,
    // så vil vi vise en liten notis om at VTAO-satsen er basert på et lavere beløp
    const erITidligereAar = periodeAar < getYear(avtaleOpprettet);
    return (
        <div key={key} className={cls.element('tabell-innslag')}>
            <div>
                <BodyShort size="small">
                    {formaterPeriodeNy(periode.startDato, periode.sluttDato, NORSK_DATO_FORMAT_NY)}
                </BodyShort>
                {erITidligereAar && (
                    <BodyShort size="small" textColor="subtle">
                        Sats for {periodeAar}
                    </BodyShort>
                )}
            </div>
            {erNavAnsatt && (
                <BodyShort>
                    <EtikettStatus tilskuddsperiodestatus={periode.status} size="small" />
                </BodyShort>
            )}
            <BodyShort size="small" style={{ minWidth: '4rem' }}>
                {periode.beløp !== null ? formaterPenger(periode.beløp) : '-'}
            </BodyShort>
            <BodyShort size="small" style={{ minWidth: '4rem' }}>
                {formaterDatoNy(addDays(new Date(periode.sluttDato), 3).toString(), 'dd MMM yyyy')}
            </BodyShort>
        </div>
    );
};

const VisningTilskuddsperioderTabellVtao: React.FC<Properties> = ({ className }: Properties) => {
    const [visAllePerioder, setVisAllePerioder] = useState(false);
    const innloggetBruker = useContext(InnloggetBrukerContext);
    const { avtale } = useContext(AvtaleContext);
    const { startIndexVisning, sluttIndexVisning } = getIndexVisningForTilskuddsperiode(avtale, visAllePerioder);
    const cls = BEMHelper(className);
    const sistePeriode =
        antallAktiveTilskuddsperioder(avtale) - 1 > sluttIndexVisning
            ? avtale.tilskuddPeriode.at(antallAktiveTilskuddsperioder(avtale) - 1)
            : undefined;
    const avtaleOpprettet = new Date(avtale.opprettetTidspunkt);
    const erNavAnsatt = innloggetBruker.erNavAnsatt;

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
                .map((periode: TilskuddsPeriode, key: number) => {
                    return tilskuddsperiodeRad({
                        key,
                        periode,
                        avtaleOpprettet,
                        cls,
                        erNavAnsatt,
                    });
                })}
            {!visAllePerioder && sistePeriode && (
                <div>
                    <div key={1} className={cls.element('tabell-innslag')}>
                        ...
                    </div>
                    {tilskuddsperiodeRad({ cls, erNavAnsatt, avtaleOpprettet, periode: sistePeriode })}
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
