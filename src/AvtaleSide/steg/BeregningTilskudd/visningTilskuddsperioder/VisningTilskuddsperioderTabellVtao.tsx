import React, { useContext, useState } from 'react';
import { BodyShort, Label } from '@navikt/ds-react';
import { TilskuddsPeriode } from '@/types/avtale';
import { formatterDato, NORSK_DATO_FORMAT } from '@/utils/datoUtils';
import EtikettStatus from '@/BeslutterSide/EtikettStatus';
import { formatterPenger } from '@/utils/PengeUtils';
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

    return (
        <div className={cls.element('tabell')}>
            <div className={cls.element('tabell-ingress')}>
                <Label>Tilskudd for perioder</Label>
                {innloggetBruker.erNavAnsatt && <Label>Status</Label>}
                <Label>Inntil</Label>
                <Label>
                    Ubetalt
                    <br />
                    refusjon
                </Label>
            </div>
            {avtale.tilskuddPeriode
                .filter((p: TilskuddsPeriode) => p.aktiv)
                .slice(startIndexVisning, sluttIndexVisning)
                .map((periode: TilskuddsPeriode, index: number) => {
                    return (
                        <div>
                            <div key={index} className={cls.element('tabell-innslag')}>
                                <BodyShort size="small">
                                    {formatterDato(periode.startDato, NORSK_DATO_FORMAT)} -{' '}
                                    {formatterDato(periode.sluttDato, NORSK_DATO_FORMAT)}
                                </BodyShort>
                                {innloggetBruker.erNavAnsatt && (
                                    <BodyShort>
                                        <EtikettStatus tilskuddsperiodestatus={periode.status} size="small" />
                                    </BodyShort>
                                )}
                                <BodyShort size="small" style={{ minWidth: '4rem' }}>
                                    {formatterPenger(periode.beløp)}
                                </BodyShort>
                                <BodyShort size="small" style={{ minWidth: '4rem' }}>
                                    {formatterDato(periode.sluttDato, 'MMM YYYY')}
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
                        <BodyShort size="small">
                            {formatterDato(sistePeriode.startDato, NORSK_DATO_FORMAT)} -{' '}
                            {formatterDato(sistePeriode.sluttDato, NORSK_DATO_FORMAT)}
                        </BodyShort>
                        {innloggetBruker.erNavAnsatt && (
                            <BodyShort>
                                <EtikettStatus tilskuddsperiodestatus={sistePeriode.status} size="small" />
                            </BodyShort>
                        )}
                        <BodyShort size="small" style={{ minWidth: '4rem' }}>
                            {formatterPenger(sistePeriode.beløp)}
                        </BodyShort>
                        <BodyShort size="small" style={{ minWidth: '4rem' }}>
                            {formatterDato(sistePeriode.sluttDato, 'MMM YYYY')}
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
                tiltakstype={avtale.tiltakstype}
            />
        </div>
    );
};
export default VisningTilskuddsperioderTabellVtao;
