import styles from './EndreTilskuddsberegningForMentor.module.less';
import { useAvtale } from '@/AvtaleProvider';
import BekreftelseModal from '@/komponenter/modal/BekreftelseModal';
import { oppdateretilskuddsBeregning, oppdateretilskuddsBeregningDryRun } from '@/services/rest-service';
import { debounce, Heading, HGrid, Link } from '@navikt/ds-react';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { Avtale, Beregningsgrunnlag } from '@/types';
import Feriepenger from '@/AvtaleSide/steg/BeregningTilskudd/Feriepenger';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import ObligatoriskTjenestepensjon from '@/AvtaleSide/steg/BeregningTilskudd/ObligatoriskTjenestepensjon';
import Arbeidsgiveravgift from '@/AvtaleSide/steg/BeregningTilskudd/Arbeidsgiveravgift';
import { EndreBeregning } from '@/AvtaleSide/steg/GodkjenningSteg/endringAvAvtaleInnhold/endreTilskudd/EndreTilskuddsberegning';
import UtregningPanelMentorTilskudd from '@/AvtaleSide/steg/BeregningTilskudd/UtregningPanelMentorTilskudd';
import MentorAntallTimerPerMnd from '@/AvtaleSide/steg/BeregningTilskudd/MentorAntallTimerPerMnd';
import Timeloenn from '@/AvtaleSide/steg/BeregningTilskudd/Timeloenn';
import { erNil } from '@/utils/predicates';
import { TasklistIcon } from '@navikt/aksel-icons';

type EndreTilskuddsberegningForMentorFelter = Pick<
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

const kalkulerNyBeregningsverdi = debounce(
    async (
        avtale: Avtale,
        endreBeregning: EndreBeregning,
        settNyAvtale: React.Dispatch<React.SetStateAction<Avtale>>,
    ) => {
        try {
            const oppdatertAvtale = await oppdateretilskuddsBeregningDryRun(avtale, endreBeregning);
            settNyAvtale((prevState) => ({ ...prevState, ...oppdatertAvtale }));
        } catch (error) {
            console.warn('feilet med å oppdatere utregningene: ', error);
        }
    },
    250,
);

const EndreTilskuddsberegningForMentor: FunctionComponent = () => {
    const [modalApen, setModalApen] = useState(false);
    const { avtale, hentAvtale } = useAvtale();
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

    useEffect(() => {
        // Send inn nåværende avtale + endrede felt slik at dry-run bruker oppdaterte verdier
        kalkulerNyBeregningsverdi(
            { ...avtale, gjeldendeInnhold: { ...avtale.gjeldendeInnhold, ...nyBeregning } },
            nyBeregning,
            settNyAvtale,
        );
    }, [avtale, nyBeregning]);

    const lukkModal = () => {
        setModalApen(false);
    };

    const kallOppdateretilskuddsBeregning = async () => {
        await oppdateretilskuddsBeregning(avtale, nyBeregning);
        await hentAvtale();
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
                    <TasklistIcon />
                </div>
                Endre beregning av tilskudd
            </Link>
            <BekreftelseModal
                className={styles.modal}
                avbrytelseTekst="Avbryt"
                bekreftelseTekst="Endre"
                oversiktTekst="Endre beregning av tilskudd"
                modalIsOpen={modalApen}
                bekreftOnClick={kallOppdateretilskuddsBeregning}
                lukkModal={lukkModal}
            >
                <HGrid className={styles.modalInnhold} columns={1} gap="space-16">
                    <MentorAntallTimerPerMnd
                        verdi={nyBeregning.mentorAntallTimer}
                        settVerdi={(mentorAntallTimer) => settOgKalkulerBeregningsverdier({ mentorAntallTimer })}
                    />
                    <VerticalSpacer rem={1} />
                    <Heading size="small" spacing>
                        Om mentors lønnsforhold hos arbeidsgiver
                    </Heading>
                    <Timeloenn
                        stillingsprosent={nyBeregning.stillingprosent}
                        mentorValgtLonnstype={
                            erNil(nyBeregning.mentorValgtLonnstype) ? 'ÅRSLØNN' : nyBeregning.mentorValgtLonnstype
                        }
                        mentorValgtLonnstypeBelop={nyBeregning.mentorValgtLonnstypeBelop}
                        mentorTimelonn={nyAvtale.gjeldendeInnhold.mentorTimelonn}
                        onChange={settOgKalkulerBeregningsverdier}
                    />
                    <ObligatoriskTjenestepensjon
                        sats={nyBeregning.otpSats}
                        onChange={(otpSats) => settOgKalkulerBeregningsverdier({ otpSats })}
                    />
                    <HGrid columns={2} gap="space-16">
                        <Arbeidsgiveravgift
                            sats={nyBeregning.arbeidsgiveravgift}
                            onChange={(arbeidsgiveravgift) => settOgKalkulerBeregningsverdier({ arbeidsgiveravgift })}
                        />
                        <Feriepenger
                            sats={nyBeregning.feriepengesats}
                            onChange={(feriepengesats) => settOgKalkulerBeregningsverdier({ feriepengesats })}
                        />
                    </HGrid>
                    <UtregningPanelMentorTilskudd {...nyAvtale.gjeldendeInnhold} />
                </HGrid>
            </BekreftelseModal>
        </>
    );
};

export default EndreTilskuddsberegningForMentor;
