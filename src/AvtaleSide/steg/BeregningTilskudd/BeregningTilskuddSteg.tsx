import { useAvtale } from '@/AvtaleProvider';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import BEMHelper from '@/utils/bem';
import { Column, Row } from '@/komponenter/NavGrid/Grid';
import { Heading, Label } from '@navikt/ds-react';
import React, { FunctionComponent, useContext } from 'react';
import KvalifiseringsgruppeSats from './KvalifiseringsgruppeSats/KvalifiseringsgruppeSats';
import OppgiLonnstilskuddprosent from './OppgiLonnstilskuddprosent';
import VisningTilskuddsperioder from '@/AvtaleSide/steg/BeregningTilskudd/visningTilskuddsperioder/VisningTilskuddsperioder';
import KidOgKontonummer from '@/komponenter/form/kid-og-kontonummer';
import HvaMenesMedDette from '@/AvtaleSide/steg/BeregningTilskudd/HvaMenesMedDette';
import Manedslonn from '@/AvtaleSide/steg/BeregningTilskudd/Manedslonn';
import Feriepenger from '@/AvtaleSide/steg/BeregningTilskudd/Feriepenger';
import ObligatoriskTjenestepensjon from '@/AvtaleSide/steg/BeregningTilskudd/ObligatoriskTjenestepensjon';
import Arbeidsgiveravgift from '@/AvtaleSide/steg/BeregningTilskudd/Arbeidsgiveravgift';
import './BeregningTilskuddSteg.less';
import AvtaleStatus from '@/AvtaleSide/AvtaleStatus/AvtaleStatus';
import UtregningPanel from '@/AvtaleSide/steg/BeregningTilskudd/UtregningPanel';

const cls = BEMHelper('beregningTilskuddSteg');

const BeregningTilskuddSteg: FunctionComponent = () => {
    const innloggetBruker = useContext(InnloggetBrukerContext);
    const { avtale, lagreAvtale, settOgKalkulerBeregningsverdier } = useAvtale();

    return (
        <>
            <AvtaleStatus />
            <Innholdsboks>
                <SkjemaTittel>Beregning av tilskudd</SkjemaTittel>
                {avtale.tiltakstype !== 'SOMMERJOBB' && <KvalifiseringsgruppeSats cls={cls} />}
                {avtale.tiltakstype === 'SOMMERJOBB' && <OppgiLonnstilskuddprosent />}
                <Heading level="3" size="small" className={cls.element('lonn-tittel')}>
                    Lønn per måned i faktisk stillingsprosent inkludert faste og uregelmessige tillegg
                </Heading>
                <HvaMenesMedDette className={cls.className} />
                <Manedslonn cls={cls} />
                <Row className={cls.element('rad')}>
                    <Column md="8" className={cls.element('feriepenger')}>
                        <Feriepenger
                            sats={avtale.gjeldendeInnhold.feriepengesats}
                            onChange={(feriepengesats) => settOgKalkulerBeregningsverdier({ feriepengesats })}
                        />
                    </Column>
                </Row>
                <Row className={cls.element('rad')}>
                    <Column md="8" className={cls.element('tjenestepensjon')}>
                        <ObligatoriskTjenestepensjon
                            sats={avtale.gjeldendeInnhold.otpSats}
                            onChange={(otpSats) => settOgKalkulerBeregningsverdier({ otpSats })}
                        />
                    </Column>
                </Row>
                <Row className={cls.element('rad')}>
                    <Column md="8" className={cls.element('arbeidsgiveravgift')}>
                        <Arbeidsgiveravgift
                            sats={avtale.gjeldendeInnhold.arbeidsgiveravgift}
                            onChange={(arbeidsgiveravgift) => settOgKalkulerBeregningsverdier({ arbeidsgiveravgift })}
                        />
                    </Column>
                </Row>
                <Row>
                    <Column md="12">
                        <KidOgKontonummer />
                    </Column>
                </Row>
                <UtregningPanel {...avtale.gjeldendeInnhold} tiltakstype={avtale.tiltakstype} />
                <VerticalSpacer rem={1.25} />
                {innloggetBruker.erNavAnsatt &&
                    avtale.gjeldendeInnhold.stillingprosent !== undefined &&
                    avtale.gjeldendeInnhold.stillingprosent > 0 &&
                    avtale.gjeldendeInnhold.stillingprosent < 100 && (
                        <>
                            <Label>Lønn ved 100% stilling: {avtale.gjeldendeInnhold.manedslonn100pst} kr</Label>
                            <VerticalSpacer rem={1} />
                        </>
                    )}
                <VisningTilskuddsperioder />
                <VerticalSpacer rem={1} />
                <LagreKnapp lagre={lagreAvtale} suksessmelding={'Avtale lagret'}>
                    Lagre
                </LagreKnapp>
            </Innholdsboks>
        </>
    );
};

export default BeregningTilskuddSteg;
