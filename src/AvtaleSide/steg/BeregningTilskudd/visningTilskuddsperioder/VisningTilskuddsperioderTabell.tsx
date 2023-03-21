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
import {
    antallAktiveTilskuddsperioder,
    getIndexVisningForTilskuddsperiode,
} from '@/AvtaleSide/steg/BeregningTilskudd/visningTilskuddsperioder/visningTilskuddsperiodeUtils';

interface Properties {
    className: string;
}

const VisningTilskuddsperioderTabell: React.FC<Properties> = ({ className }: Properties) => {
    const [visAllePerioder, setVisAllePerioder] = useState(false);
    const innloggetBruker = useContext(InnloggetBrukerContext);
    const { avtale } = useContext(AvtaleContext);
    const { startIndexVisning, sluttIndexVisning } = getIndexVisningForTilskuddsperiode(avtale, visAllePerioder);
    const cls = BEMHelper(className);
    return (
        <div className={cls.element('tabell')}>
            <div className={cls.element('tabell-ingress')}>
                <Label>Tilskudd for periode</Label>
                {innloggetBruker.erNavAnsatt && <Label>Status</Label>}
                <Label>Tilskuddsprosent</Label>
                <Label>Inntil</Label>
            </div>
            {avtale.tilskuddPeriode
                .filter((p: TilskuddsPeriode) => p.aktiv)
                .map((periode: TilskuddsPeriode, index: number) => {
                    const nyProsent: boolean =
                        index > 0
                            ? avtale.tilskuddPeriode[index - 1].lonnstilskuddProsent !== periode.lonnstilskuddProsent
                            : false;
                    if (index < startIndexVisning || index > sluttIndexVisning) {
                        return null;
                    } else if (index !== 0 && (index === startIndexVisning || index === sluttIndexVisning)) {
                        return (
                            <div key={index} className={cls.element('tabell-innslag')}>
                                ...
                            </div>
                        );
                    }
                    return (
                        <div
                            key={index}
                            className={cls.element('tabell-innslag')}
                            style={{
                                borderTop: nyProsent ? '2px solid gray' : 'undefined',
                            }}
                        >
                            <BodyShort size="small">
                                {formatterDato(periode.startDato, NORSK_DATO_FORMAT)} -{' '}
                                {formatterDato(periode.sluttDato, NORSK_DATO_FORMAT)}
                            </BodyShort>
                            {innloggetBruker.erNavAnsatt && (
                                <BodyShort>
                                    <EtikettStatus tilskuddsperiodestatus={periode.status} size="small" />
                                </BodyShort>
                            )}
                            <BodyShort size="small">{periode.lonnstilskuddProsent}%</BodyShort>
                            <BodyShort size="small" style={{ minWidth: '4rem' }}>
                                {formatterPenger(periode.beløp)}
                            </BodyShort>
                        </div>
                    );
                })}
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
export default VisningTilskuddsperioderTabell;
