import { AvtaleContext } from '@/AvtaleProvider';
import GodkjennPaVegneAvBeggeParter from '@/AvtaleSide/steg/GodkjenningSteg/Godkjenning/godkjenningVeileder/GodkjennPaVegneAvBeggeParter';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { Alert } from '@navikt/ds-react';
import React, { FunctionComponent, useContext, useState } from 'react';
import GodkjenningInstruks from '../../Oppsummering/instruks/GodkjenningInstruks';
import GodkjennPaVegneAvArbeidsgiver from './GodkjennPaVegneAvArbeidsgiver';
import GodkjennPaVegneAvDeltaker from './GodkjennPaVegneAvDeltaker';
import GodkjennAvtaleMedAlleredeOpprettetTiltak from '@/komponenter/alleredeOpprettetTiltak/GodkjennAvtaleMedAlleredeOpprettetTiltak';
import { AlleredeOpprettetAvtaleContext } from '@/komponenter/alleredeOpprettetTiltak/api/AlleredeOpprettetAvtaleProvider';
import { fetchdata } from '@/komponenter/alleredeOpprettetTiltak/api/alleredeUtils';
import BEMHelper from '@/utils/bem';

const GodkjenningVeileder: FunctionComponent = () => {
    const cls = BEMHelper('godkjenning');
    const { avtale, godkjenn } = useContext(AvtaleContext);
    const { deltakerFnr, tiltakstype, id, gjeldendeInnhold } = avtale;
    const { startDato, sluttDato } = gjeldendeInnhold;
    const { alleredeRegistrertAvtale, setAlleredeRegistrertAvtale } = useContext(AlleredeOpprettetAvtaleContext);
    const [skalGodkjennesPaVegne, setSkalGodkjennesPaVegne] = useState<boolean>(false);
    const [godkjenningsModalIsOpen, setGodkjenningsModalIsOpen] = useState<boolean>(false);

    const kunGodkjentAvDeltaker = avtale.godkjentAvDeltaker && !avtale.godkjentAvArbeidsgiver;
    const kunGodkjentAvArbeidsgiver = avtale.godkjentAvArbeidsgiver && !avtale.godkjentAvDeltaker;
    const ikkeGodkjentAvNoen = !avtale.godkjentAvDeltaker && !avtale.godkjentAvArbeidsgiver;

    return (
        <Innholdsboks  className={cls.className} ariaLabel={'Godkjenn avtalen'}>
            <SkjemaTittel>Godkjenn avtalen</SkjemaTittel>
            <GodkjenningInstruks />
            {((avtale.tiltakstype !== 'SOMMERJOBB' && !avtale.godkjentAvDeltaker) ||
                (avtale.tiltakstype === 'SOMMERJOBB' && kunGodkjentAvArbeidsgiver)) && (
                <GodkjennPaVegneAvDeltaker
                    skalGodkjennesPaVegne={skalGodkjennesPaVegne}
                    setSkalGodkjennesPaVegne={setSkalGodkjennesPaVegne}
                />
            )}
            {(avtale.tiltakstype === 'SOMMERJOBB') && kunGodkjentAvDeltaker && (
                <GodkjennPaVegneAvArbeidsgiver
                    skalGodkjennesPaVegne={skalGodkjennesPaVegne}
                    setSkalGodkjennesPaVegne={setSkalGodkjennesPaVegne}
                />
            )}
            {(avtale.tiltakstype === 'SOMMERJOBB') && ikkeGodkjentAvNoen && (
                <GodkjennPaVegneAvBeggeParter
                    skalGodkjennesPaVegne={skalGodkjennesPaVegne}
                    setSkalGodkjennesPaVegne={setSkalGodkjennesPaVegne}
                />
            )}
            {avtale.gjeldendeInnhold.harFamilietilknytning && (
                <>
                    <Alert variant="warning">OBS! Det er oppgitt at deltaker har en relasjon med arbeidsgiver</Alert>
                    <VerticalSpacer rem={1} />
                </>
            )}

            {!skalGodkjennesPaVegne && (
                <>
                    <LagreKnapp
                        className={cls.element('lagreKnapp')}
                        lagre={() =>
                            fetchdata({
                                deltakerFnr,
                                tiltakstype,
                                id,
                                startDato,
                                sluttDato,
                                alleredeRegistrertAvtale,
                                setAlleredeRegistrertAvtale,
                                setGodkjenningsModalIsOpen,
                                godkjenn,
                            })
                        }
                        label="Godkjenn avtalen"
                    />
                    <GodkjennAvtaleMedAlleredeOpprettetTiltak
                        godkjenn={godkjenn}
                        modalIsOpen={godkjenningsModalIsOpen}
                        setModalIsOpen={setGodkjenningsModalIsOpen}
                    />
                </>
            )}
        </Innholdsboks>
    );
};

export default GodkjenningVeileder;
