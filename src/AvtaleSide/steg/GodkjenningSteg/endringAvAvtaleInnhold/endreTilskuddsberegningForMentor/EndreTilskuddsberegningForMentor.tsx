import './EndreTilskuddsberegningForMentor.less';
import { AvtaleContext } from '@/AvtaleProvider';
import BekreftelseModal from '@/komponenter/modal/BekreftelseModal';
import { oppdateretilskuddsBeregning, oppdateretilskuddsBeregningDryRun } from '@/services/rest-service';
import { Task } from '@navikt/ds-icons/cjs';
import { Column, Container, Row } from '@/komponenter/NavGrid/Grid';
import { debounce, Heading, Link } from '@navikt/ds-react';
import React, { FunctionComponent, useCallback, useContext, useEffect, useState } from 'react';
import { Avtale, Beregningsgrunnlag } from '@/types';
import Feriepenger from '@/AvtaleSide/steg/BeregningTilskudd/Feriepenger';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import ObligatoriskTjenestepensjon from '@/AvtaleSide/steg/BeregningTilskudd/ObligatoriskTjenestepensjon';
import Arbeidsgiveravgift from '@/AvtaleSide/steg/BeregningTilskudd/Arbeidsgiveravgift';
import { EndreBeregning } from '@/AvtaleSide/steg/GodkjenningSteg/endringAvAvtaleInnhold/endreTilskudd/EndreTilskuddsberegning';
import UtregningPanelMentorTilskudd from '@/AvtaleSide/steg/BeregningTilskudd/UtregningPanelMentorTilskudd';
import BEMHelper from '@/utils/bem';
import MentorAntallTimerPerMnd from '@/AvtaleSide/steg/BeregningTilskudd/MentorAntallTimerPerMnd';
import Timeloenn from '@/AvtaleSide/steg/BeregningTilskudd/Timeloenn';

export type EndreTilskuddsberegningForMentorFelter = Pick<
    Beregningsgrunnlag,
    | 'otpSats'
    | 'feriepengesats'
    | 'arbeidsgiveravgift'
    | 'stillingprosent'
    | 'mentorAntallTimer'
    | 'mentorValgtLonnstypeBelop'
    | 'mentorValgtLonnstype'
    | 'mentorTimelonn'
>;

const cls = BEMHelper('endreTilskuddsberegningForMentor');

const EndreTilskuddsberegningForMentor: FunctionComponent = () => {
    const [modalApen, setModalApen] = useState(false);
    const avtaleContext = useContext(AvtaleContext);
    const { avtale } = useContext(AvtaleContext);
    const [nyAvtale, settNyAvtale] = useState<Avtale>(avtale);
    const [nyBeregning, setNyBeregning] = useState<EndreTilskuddsberegningForMentorFelter>({
        stillingprosent: nyAvtale.gjeldendeInnhold.stillingprosent,
        otpSats: nyAvtale.gjeldendeInnhold.otpSats,
        feriepengesats: nyAvtale.gjeldendeInnhold.feriepengesats,
        arbeidsgiveravgift: nyAvtale.gjeldendeInnhold.arbeidsgiveravgift,
        mentorAntallTimer: nyAvtale.gjeldendeInnhold.mentorAntallTimer,
        mentorValgtLonnstype: nyAvtale.gjeldendeInnhold.mentorValgtLonnstype,
        mentorValgtLonnstypeBelop: nyAvtale.gjeldendeInnhold.mentorValgtLonnstypeBelop,
    });

    const kalkulerNyBeregningsverdi = useCallback(
        debounce(async (avtale: Avtale, endreBeregning: EndreBeregning) => {
            try {
                const oppdatertAvtale = await oppdateretilskuddsBeregningDryRun(avtale, endreBeregning);
                settNyAvtale((prevState) => ({ ...prevState, ...oppdatertAvtale }));
            } catch (error) {
                console.warn('feilet med å oppdatere utregningene: ', error);
            }
        }, 250),
        [],
    );

    useEffect(() => {
        // Send inn nåværende avtale + endrede felt slik at dry-run bruker oppdaterte verdier
        kalkulerNyBeregningsverdi(
            { ...avtale, gjeldendeInnhold: { ...avtale.gjeldendeInnhold, ...nyBeregning } },
            nyBeregning,
        );
    }, [avtale, nyBeregning, kalkulerNyBeregningsverdi]);

    const lukkModal = () => {
        setModalApen(false);
    };

    const kallOppdateretilskuddsBeregning = async () => {
        await oppdateretilskuddsBeregning(avtaleContext.avtale, nyBeregning);
        await avtaleContext.hentAvtale();
        setModalApen(false);
    };

    const settOgKalkulerBeregningsverdier = (verdier: Partial<EndreTilskuddsberegningForMentorFelter>) => {
        setNyBeregning((prevState) => ({
            ...prevState,
            ...verdier,
        }));
    };

    return (
        <>
            <Link
                style={{ display: 'flex', alignItems: 'center' }}
                onClick={(event) => {
                    event.stopPropagation();
                    setModalApen(true);
                }}
                href="#"
                role="menuitem"
            >
                <div style={{ marginRight: '0.5rem' }} aria-hidden={true}>
                    <Task />
                </div>
                Endre beregning av tilskudd
            </Link>
            <BekreftelseModal
                style={{ width: '40rem' }}
                avbrytelseTekst="Avbryt"
                bekreftelseTekst="Endre"
                oversiktTekst="Endre beregning av tilskudd"
                modalIsOpen={modalApen}
                bekreftOnClick={kallOppdateretilskuddsBeregning}
                lukkModal={lukkModal}
            >
                <div className={cls.element('pakrevd-wrapper')}>
                    <Container fluid={true}>
                        <MentorAntallTimerPerMnd
                            verdi={nyBeregning.mentorAntallTimer}
                            settVerdi={(mentorAntallTimer) => settOgKalkulerBeregningsverdier({ mentorAntallTimer })}
                        />
                        <VerticalSpacer rem={2} />
                        <Heading size="small" spacing>
                            Om mentors lønnsforhold hos arbeidsgiver
                        </Heading>
                        <Timeloenn
                            stillingsprosent={nyBeregning.stillingprosent}
                            mentorValgtLonnstype={nyBeregning.mentorValgtLonnstype}
                            mentorValgtLonnstypeBelop={nyBeregning.mentorValgtLonnstypeBelop}
                            mentorTimelonn={nyAvtale.gjeldendeInnhold.mentorTimelonn}
                            onChange={settOgKalkulerBeregningsverdier}
                        />

                        <Row>
                            <Column md="5">
                                <ObligatoriskTjenestepensjon
                                    sats={nyBeregning.otpSats}
                                    onChange={(otpSats) => settOgKalkulerBeregningsverdier({ otpSats })}
                                />
                            </Column>
                        </Row>
                        <VerticalSpacer rem={1.5} />
                        <Row>
                            <Column md="5">
                                <Arbeidsgiveravgift
                                    sats={nyBeregning.arbeidsgiveravgift}
                                    onChange={(arbeidsgiveravgift) =>
                                        settOgKalkulerBeregningsverdier({ arbeidsgiveravgift })
                                    }
                                />
                            </Column>
                            <Column md="5">
                                <Feriepenger
                                    sats={nyBeregning.feriepengesats}
                                    onChange={(feriepengesats) => settOgKalkulerBeregningsverdier({ feriepengesats })}
                                />
                            </Column>
                        </Row>
                        <VerticalSpacer rem={1} />
                        <UtregningPanelMentorTilskudd {...nyAvtale.gjeldendeInnhold} />
                    </Container>
                </div>
            </BekreftelseModal>
        </>
    );
};

export default EndreTilskuddsberegningForMentor;
