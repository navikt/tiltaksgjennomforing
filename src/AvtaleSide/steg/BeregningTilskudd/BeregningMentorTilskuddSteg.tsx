import { AvtaleContext } from '@/AvtaleProvider';
import BEMHelper from '@/utils/bem';
import AvtaleStatus from '@/AvtaleSide/AvtaleStatus/AvtaleStatus';
import React, { FunctionComponent, useContext } from 'react';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import { BodyShort, Heading } from '@navikt/ds-react';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import Timeloenn from '@/AvtaleSide/steg/BeregningTilskudd/Timeloenn';
import ObligatoriskTjenestepensjon from '@/AvtaleSide/steg/BeregningTilskudd/ObligatoriskTjenestepensjon';
import Arbeidsgiveravgift from '@/AvtaleSide/steg/BeregningTilskudd/Arbeidsgiveravgift';
import Feriepenger from '@/AvtaleSide/steg/BeregningTilskudd/Feriepenger';
import { Column, Row } from '@/komponenter/NavGrid/Grid';
import KidOgKontonummer from '@/komponenter/form/kid-og-kontonummer';
import UtregningPanelMentorTilskudd from '@/AvtaleSide/steg/BeregningTilskudd/UtregningPanelMentorTilskudd';
import VisningTilskuddsperioder from '@/AvtaleSide/steg/BeregningTilskudd/visningTilskuddsperioder/VisningTilskuddsperioder';
import MentorAntallTimerPerMnd from '@/AvtaleSide/steg/BeregningTilskudd/MentorAntallTimerPerMnd';

const cls = BEMHelper('beregningMentorTilskuddSteg');

const BeregningMentorTilskuddSteg: FunctionComponent = () => {
    const { avtale, lagreAvtale, settOgKalkulerBeregningsverdier } = useContext(AvtaleContext);

    return (
        <>
            <AvtaleStatus />
            <Innholdsboks className={cls.className}>
                <SkjemaTittel>Beregning av tilskudd til mentor</SkjemaTittel>
                <BodyShort spacing>
                    Tilskuddet dekker mentorens ordinære timelønn og ev. sosiale avgifter for de timene som er avtalt
                    for mentoroppgaven.
                </BodyShort>
                <MentorAntallTimerPerMnd
                    verdi={avtale.gjeldendeInnhold.mentorAntallTimer}
                    settVerdi={(mentorAntallTimer) => {
                        settOgKalkulerBeregningsverdier({ mentorAntallTimer });
                    }}
                />
                <VerticalSpacer rem={2} />
                <Heading spacing size="small">
                    Om mentors lønnsforhold hos arbeidsgiver
                </Heading>
                <Timeloenn />
                <Row>
                    <Column md="6">
                        <ObligatoriskTjenestepensjon />
                    </Column>
                </Row>
                <VerticalSpacer rem={2} />
                <Row>
                    <Column md="6">
                        <Arbeidsgiveravgift />
                    </Column>
                    <Column md="6">
                        <Feriepenger />
                    </Column>
                </Row>
                <VerticalSpacer rem={2} />
                <Row>
                    <Column md="12">
                        <KidOgKontonummer />
                    </Column>
                </Row>
                <UtregningPanelMentorTilskudd {...avtale.gjeldendeInnhold} />
                <VerticalSpacer rem={1} />
                <VisningTilskuddsperioder />
                <VerticalSpacer rem={1} />
                <LagreKnapp lagre={lagreAvtale} suksessmelding={'Avtale lagret'}>
                    Lagre
                </LagreKnapp>
            </Innholdsboks>
        </>
    );
};
export default BeregningMentorTilskuddSteg;
