import { AvtaleContext } from '@/AvtaleProvider';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import BEMHelper from '@/utils/bem';
import { Column, Row } from '@/komponenter/NavGrid/Grid';
import { BodyShort, Heading, TextField } from '@navikt/ds-react';
import { FunctionComponent, useContext } from 'react';
import VisningTilskuddsperioder from '@/AvtaleSide/steg/BeregningTilskudd/visningTilskuddsperioder/VisningTilskuddsperioder';
import HenteKontonummer from '@/komponenter/form/henteKontornummer/HenteKontonummer';
import './BeregningTilskuddSteg.less';
import AvtaleStatus from '@/AvtaleSide/AvtaleStatus/AvtaleStatus';
import VisueltDisabledInputFelt from '@/komponenter/VisueltDisabledInputFelt/VisueltDisabledInputFelt';
import VisningTilskuddsperioderVtao from './visningTilskuddsperioder/VisningTilskuddsperioderVtao';

const cls = BEMHelper('beregningTilskuddSteg');

const BeregningTilskuddSteg: FunctionComponent = () => {
    const innloggetBruker = useContext(InnloggetBrukerContext);

    const { avtale, lagreAvtale } = useContext(AvtaleContext);

    return (
        <>
            <AvtaleStatus />
            <Innholdsboks>
                <SkjemaTittel>Beregning av tilskudd</SkjemaTittel>
                <Heading level="2" size="small" className={cls.element('lonn-tittel')}>
                    Hvor mye dekker tilskuddet?
                </Heading>
                <BodyShort size="small">
                    Arbeidsgiveren får et tilskudd fra NAV for varig tilrettelagt arbeid. Tilskuddssatsen er 6 808
                    kroner per måned. Satsen settes årlig av departementet og avtale- og refusjonsløsningen vil
                    automatisk oppdateres når det kommer nye satser.
                </BodyShort>
                <VerticalSpacer rem={2} />
                <div className={cls.element('rad')}>
                    <VisueltDisabledInputFelt
                        label="Månedlig tilskuddssats"
                        description="Sats for 2024"
                        tekst={'6808 kr'}
                    />
                </div>
                <VisningTilskuddsperioderVtao></VisningTilskuddsperioderVtao>
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

export default BeregningTilskuddSteg;
