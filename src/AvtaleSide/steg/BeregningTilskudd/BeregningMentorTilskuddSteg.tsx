import { AvtaleContext } from '@/AvtaleProvider';
import AvtaleStatus from '@/AvtaleSide/AvtaleStatus/AvtaleStatus';
import React, { FunctionComponent, useContext } from 'react';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import { BodyShort, Heading } from '@navikt/ds-react';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import ObligatoriskTjenestepensjon from '@/AvtaleSide/steg/BeregningTilskudd/ObligatoriskTjenestepensjon';
import Arbeidsgiveravgift from '@/AvtaleSide/steg/BeregningTilskudd/Arbeidsgiveravgift';
import Feriepenger from '@/AvtaleSide/steg/BeregningTilskudd/Feriepenger';
import { Column, Row } from '@/komponenter/NavGrid/Grid';
import KidOgKontonummer from '@/komponenter/form/kid-og-kontonummer';
import UtregningPanelMentorTilskudd from '@/AvtaleSide/steg/BeregningTilskudd/UtregningPanelMentorTilskudd';
import VisningTilskuddsperioder from '@/AvtaleSide/steg/BeregningTilskudd/visningTilskuddsperioder/VisningTilskuddsperioder';
import MentorAntallTimerPerMnd from '@/AvtaleSide/steg/BeregningTilskudd/MentorAntallTimerPerMnd';
import Timeloenn from '@/AvtaleSide/steg/BeregningTilskudd/Timeloenn';

const BeregningMentorTilskuddSteg: FunctionComponent = () => {
    const { avtale, lagreAvtale, settOgKalkulerBeregningsverdierDebounced, settOgKalkulerBeregningsverdier } =
        useContext(AvtaleContext);

    return (
        <>
            <AvtaleStatus />
            <Innholdsboks>
                <SkjemaTittel>Beregning av tilskudd til mentor</SkjemaTittel>
                <BodyShort spacing>
                    Tilskuddet dekker mentorens ordinære timelønn og ev. sosiale avgifter for de timene som er avtalt
                    for mentoroppgaven.
                </BodyShort>
                <MentorAntallTimerPerMnd
                    verdi={avtale.gjeldendeInnhold.mentorAntallTimer}
                    settVerdi={(mentorAntallTimer) => {
                        settOgKalkulerBeregningsverdierDebounced({ mentorAntallTimer });
                    }}
                />
                <VerticalSpacer rem={2} />
                <Heading spacing size="small">
                    Om mentors lønnsforhold hos arbeidsgiver
                </Heading>
                <Timeloenn
                    stillingsprosent={avtale.gjeldendeInnhold.stillingprosent}
                    mentorValgtLonnstype={avtale.gjeldendeInnhold.mentorValgtLonnstype}
                    mentorValgtLonnstypeBelop={avtale.gjeldendeInnhold.mentorValgtLonnstypeBelop}
                    mentorTimelonn={avtale.gjeldendeInnhold.mentorTimelonn}
                    onChangeImmediate={(value) => settOgKalkulerBeregningsverdier(value)}
                    onChangeDebounced={(value) => settOgKalkulerBeregningsverdierDebounced(value)}
                />

                <Row>
                    <Column md="5">
                        <ObligatoriskTjenestepensjon
                            sats={avtale.gjeldendeInnhold.otpSats}
                            onChange={(otpSats) => settOgKalkulerBeregningsverdierDebounced({ otpSats })}
                        />
                    </Column>
                </Row>
                <VerticalSpacer rem={1.5} />
                <Row>
                    <Column md="5">
                        <Arbeidsgiveravgift
                            sats={avtale.gjeldendeInnhold.arbeidsgiveravgift}
                            onChange={(arbeidsgiveravgift) => settOgKalkulerBeregningsverdier({ arbeidsgiveravgift })}
                        />
                    </Column>
                    <Column md="5">
                        <Feriepenger
                            sats={avtale.gjeldendeInnhold.feriepengesats}
                            onChange={(feriepengesats) => settOgKalkulerBeregningsverdier({ feriepengesats })}
                        />
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
