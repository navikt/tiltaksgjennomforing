import { AvtaleContext } from '@/AvtaleProvider';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import ValutaInput from '@/komponenter/form/ValutaInput';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import BEMHelper from '@/utils/bem';
import { Column, Row } from '@/komponenter/NavGrid/Grid';
import { Heading } from '@navikt/ds-react';
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

const cls = BEMHelper('beregningTilskuddSteg');

const BeregningTilskuddSteg: FunctionComponent = () => {
    const innloggetBruker = useContext(InnloggetBrukerContext);

    const { avtale, lagreAvtale } = useContext(AvtaleContext);

    return (
        <Innholdsboks utfyller="veileder_og_arbeidsgiver">
            <SkjemaTittel>Beregning av tilskudd</SkjemaTittel>
            {avtale.tiltakstype !== 'SOMMERJOBB' && <KvalifiseringsgruppeSats cls={cls} />}
            {avtale.tiltakstype === 'SOMMERJOBB' && <OppgiLonnstilskuddprosent />}
            <Heading size="small" className={cls.element('lonn-tittel')}>
                Lønn per måned i faktisk stillingsprosent inkludert faste og uregelmessige tillegg
            </Heading>
            <HvaMenesMedDette className={cls.className} />
            <Manedslonn cls={cls} />
            <Feriepenger cls={cls} />
            <ObligatoriskTjenestepensjon cls={cls} />
            <Arbeidsgiveravgift cls={cls} />
            <Row className={cls.element('rad-kontonummer')}>
                <Column md="12" className={cls.element('kontonummer')}>
                    <HenteKontonummer/>
                </Column>
            </Row>

            <VerticalSpacer rem={2} />
            <UtregningPanel {...avtale.gjeldendeInnhold} tiltakstype={avtale.tiltakstype} />
            <VerticalSpacer rem={1.25} />
            {innloggetBruker.erNavAnsatt &&
                avtale.gjeldendeInnhold.stillingprosent !== undefined &&
                avtale.gjeldendeInnhold.stillingprosent > 0 &&
                avtale.gjeldendeInnhold.stillingprosent < 100 && (
                    <ValutaInput
                        disabled={true}
                        name="manedslonn100%"
                        size="small"
                        label="Lønn ved 100% stilling"
                        value={avtale.gjeldendeInnhold.manedslonn100pst}
                    />
                )}
            <VerticalSpacer rem={2} />
            <VisningTilskuddsperioder />
            <VerticalSpacer rem={2} />
            <LagreKnapp lagre={lagreAvtale} label={'Lagre'} suksessmelding={'Avtale lagret'} />
        </Innholdsboks>
    );
};

export default BeregningTilskuddSteg;
