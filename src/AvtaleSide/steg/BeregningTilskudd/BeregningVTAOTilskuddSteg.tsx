import { AvtaleContext } from '@/AvtaleProvider';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import ValutaInput from '@/komponenter/form/ValutaInput';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import BEMHelper from '@/utils/bem';
import { Column, Row } from '@/komponenter/NavGrid/Grid';
import { BodyShort, Heading } from '@navikt/ds-react';
import React, { FunctionComponent, useContext } from 'react';
import KvalifiseringsgruppeSats from './KvalifiseringsgruppeSats/KvalifiseringsgruppeSats';
import OppgiLonnstilskuddprosent from './OppgiLonnstilskuddprosent';
import UtregningPanel from './UtregningPanel';
import VisningTilskuddsperioder from '@/AvtaleSide/steg/BeregningTilskudd/visningTilskuddsperioder/VisningTilskuddsperioder';
import HenteKontonummer from '@/komponenter/form/henteKontornummer/HenteKontonummer';
import HvaMenesMedDette from '@/AvtaleSide/steg/BeregningTilskudd/HvaMenesMedDette';
import Manedslonn from '@/AvtaleSide/steg/BeregningTilskudd/Manedslonn';
import Feriepenger from '@/AvtaleSide/steg/BeregningTilskudd/Feriepenger';
import ObligatoriskTjenestepensjon from '@/AvtaleSide/steg/BeregningTilskudd/ObligatoriskTjenestepensjon';
import Arbeidsgiveravgift from '@/AvtaleSide/steg/BeregningTilskudd/Arbeidsgiveravgift';
import './BeregningTilskuddSteg.less';
import AvtaleStatus from '@/AvtaleSide/AvtaleStatus/AvtaleStatus';

const cls = BEMHelper('beregningTilskuddSteg');

const BeregningTilskuddSteg: FunctionComponent = () => {
    const innloggetBruker = useContext(InnloggetBrukerContext);

    const { avtale, lagreAvtale } = useContext(AvtaleContext);

    return (
        <>
            <AvtaleStatus />
            <Innholdsboks>
                <SkjemaTittel>Beregning av VTAO</SkjemaTittel>
                <Heading level="2" size="small" className={cls.element('lonn-tittel')}>
                    Lønn per måned er max 6808,- kr
                </Heading>
                <HvaMenesMedDette className={cls.className} />
                <BodyShort size="small">6808,-</BodyShort>
                <Manedslonn cls={cls} />
                <Row className={cls.element('rad-kontonummer')}>
                    <Column md="12" className={cls.element('kontonummer')}>
                        <HenteKontonummer />
                    </Column>
                </Row>
                <VerticalSpacer rem={2} />
                <VisningTilskuddsperioder />
                <VerticalSpacer rem={2} />
                <LagreKnapp lagre={lagreAvtale} label={'Lagre'} suksessmelding={'Avtale lagret'} />
            </Innholdsboks>
        </>
    );
};

export default BeregningTilskuddSteg;
