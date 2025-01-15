import { AvtaleContext } from '@/AvtaleProvider';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import BEMHelper from '@/utils/bem';
import { Column, Row } from '@/komponenter/NavGrid/Grid';
import { BodyShort, Heading } from '@navikt/ds-react';
import { FunctionComponent, useContext, useEffect, useState } from 'react';
import HenteKontonummer from '@/komponenter/form/henteKontornummer/HenteKontonummer';
import './BeregningTilskuddSteg.less';
import AvtaleStatus from '@/AvtaleSide/AvtaleStatus/AvtaleStatus';
import VisueltDisabledInputFelt from '@/komponenter/VisueltDisabledInputFelt/VisueltDisabledInputFelt';
import VisningTilskuddsperioderVtao from './visningTilskuddsperioder/VisningTilskuddsperioderVtao';
import { hentVtaoSats } from '@/services/rest-service';
import { formaterPenger } from '@/utils/PengeUtils';
import { format } from 'date-fns';

const cls = BEMHelper('beregningTilskuddSteg');

const BeregningVTAOTilskuddSteg: FunctionComponent = () => {
    const { avtale, lagreAvtale } = useContext(AvtaleContext);

    const [sats, setSats] = useState<{ aar: number; belop: number }>({ aar: NaN, belop: NaN });

    const satsBelop = isNaN(sats.belop) ? '...' : formaterPenger(sats.belop);
    const satsAar = isNaN(sats.aar) ? '...' : sats.aar;

    useEffect(() => {
        hentVtaoSats(format(new Date(avtale.opprettetTidspunkt), 'yyyy-MM-dd')).then((data) => {
            setSats(data);
        });
    }, [avtale]);

    return (
        <>
            <AvtaleStatus />
            <Innholdsboks>
                <SkjemaTittel>Beregning av tilskudd</SkjemaTittel>
                <Heading level="2" size="small" className={cls.element('lonn-tittel')}>
                    Hvor mye dekker tilskuddet?
                </Heading>
                <BodyShort size="small">
                    Arbeidsgiveren får et tilskudd fra NAV for varig tilrettelagt arbeid. Tilskuddssatsen er {satsBelop}{' '}
                    per måned. Satsen settes årlig av departementet og avtale- og refusjonsløsningen vil automatisk
                    oppdateres når det kommer nye satser.
                </BodyShort>
                <VerticalSpacer rem={2} />
                <div className={cls.element('rad')}>
                    <VisueltDisabledInputFelt
                        label="Månedlig tilskuddssats"
                        description={`Sats for ${satsAar}`}
                        tekst={satsBelop}
                    />
                </div>
                <VisningTilskuddsperioderVtao />
                <Row className={cls.element('rad-kontonummer')}>
                    <Column md="12" className={cls.element('kontonummer')}>
                        <HenteKontonummer />
                    </Column>
                </Row>
                <VerticalSpacer rem={2} />
                <LagreKnapp lagre={lagreAvtale} suksessmelding="Avtale lagret">
                    Lagre
                </LagreKnapp>
            </Innholdsboks>
        </>
    );
};

export default BeregningVTAOTilskuddSteg;
