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
import * as RestService from '@/services/rest-service';
import useSWR from 'swr';
import { useSWRKeyDebounce } from '@/utils/useSWRKeyDebounce';

const BeregningMentorTilskuddSteg: FunctionComponent = () => {
    const { avtale, lagreAvtale, settOgKalkulerBeregningsverdier } = useContext(AvtaleContext);

    const keys = useSWRKeyDebounce(
        [
            avtale.gjeldendeInnhold.otpSats,
            avtale.gjeldendeInnhold.mentorValgtLonnstype,
            avtale.gjeldendeInnhold.mentorValgtLonnstypeBelop,
            avtale.gjeldendeInnhold.feriepengesats,
            avtale.gjeldendeInnhold.arbeidsgiveravgift,
            avtale.gjeldendeInnhold.mentorAntallTimer,
            avtale.gjeldendeInnhold.stillingprosent,
        ],
        50,
    );

    const { data: beregninger } = useSWR(
        avtale ? [`/avtaler/${avtale.id}/dry-run`, ...keys] : null,
        ([_key]) => RestService.lagreAvtaleDryRun(avtale),
        {
            refreshInterval: 0,
            //dedupingInterval: 500,
            revalidateOnFocus: false,
            keepPreviousData: true,
        },
    );

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
                    settVerdi={(mentorAntallTimer) => settOgKalkulerBeregningsverdier({ mentorAntallTimer })}
                />
                <VerticalSpacer rem={2} />
                <Heading spacing size="small">
                    Om mentors lønnsforhold hos arbeidsgiver
                </Heading>
                <Timeloenn
                    stillingsprosent={avtale.gjeldendeInnhold.stillingprosent}
                    mentorValgtLonnstype={avtale.gjeldendeInnhold.mentorValgtLonnstype}
                    mentorValgtLonnstypeBelop={avtale.gjeldendeInnhold.mentorValgtLonnstypeBelop}
                    mentorTimelonn={beregninger?.gjeldendeInnhold.mentorTimelonn}
                    onChange={(value) => settOgKalkulerBeregningsverdier(value)}
                />

                <Row>
                    <Column md="5">
                        <ObligatoriskTjenestepensjon
                            sats={avtale.gjeldendeInnhold.otpSats}
                            onChange={(otpSats) => settOgKalkulerBeregningsverdier({ otpSats })}
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
                <UtregningPanelMentorTilskudd {...beregninger?.gjeldendeInnhold} />
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
