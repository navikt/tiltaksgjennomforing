import React, { useState } from 'react';
import * as z from 'zod';
import BEMHelper from '@/utils/bem';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import GodkjennAvtaleMedAlleredeOpprettetTiltak from '@/komponenter/alleredeOpprettetTiltak/GodkjennAvtaleMedAlleredeOpprettetTiltak';
import GodkjenningInstruks from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/instruks/GodkjenningInstruks';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { Alert, Checkbox, CheckboxGroup } from '@navikt/ds-react';
import { sjekkOmDeltakerAlleredeErRegistrertPaaTiltak } from '@/services/rest-service';
import { useAlleredeOpprettetAvtale } from '@/komponenter/alleredeOpprettetTiltak/api/AlleredeOpprettetAvtaleProvider';
import { useAvtale } from '@/AvtaleProvider';
import LagreKnapp, { useLagreKnapp } from '@/komponenter/LagreKnapp/LagreKnappBase';

const schema = z.discriminatedUnion('isSkalGodkjennesPaVegne', [
    z.object({
        isSkalGodkjennesPaVegne: z.literal(false),
        isInformert: z.coerce.boolean(),
    }),
    z.object({
        isSkalGodkjennesPaVegne: z.literal(true),
        isInformert: z.coerce.boolean().refine((val) => val, {
            message: 'Deltaker må være informert om kravene og godkjenne innholdet i avtalen',
        }),
    }),
]);

type Schema = z.infer<typeof schema>;

function GodkjennPaVegneAvFlereParter() {
    const cls = BEMHelper('godkjenning');
    const {
        avtale,
        godkjenn,
        godkjennPaVegneAvDeltaker,
        godkjennPaVegneAvArbeidsgiver,
        godkjennPaVegneAvDeltakerOgArbeidsgiver,
    } = useAvtale();
    const { deltakerFnr, tiltakstype, id, gjeldendeInnhold, godkjentAvDeltaker, godkjentAvArbeidsgiver } = avtale;
    const { startDato, sluttDato, harFamilietilknytning } = gjeldendeInnhold;
    const { alleredeRegistrertAvtale, setAlleredeRegistrertAvtale } = useAlleredeOpprettetAvtale();
    const [isGodkjenningsModalApen, setGodkjenningsModalApen] = useState<boolean>(false);

    const isKunGodkjentAvDeltaker = godkjentAvDeltaker && !godkjentAvArbeidsgiver;
    const isKunGodkjentAvArbeidsgiver = godkjentAvArbeidsgiver && !godkjentAvDeltaker;
    const isIkkeGodkjentAvNoen = !godkjentAvDeltaker && !godkjentAvArbeidsgiver;
    const isKanGodkjennesPaVegneAv = !godkjentAvDeltaker || !godkjentAvArbeidsgiver;

    const { register, handleSubmit, formState, watch, getValues } = useForm({
        defaultValues: {
            isInformert: false,
            isSkalGodkjennesPaVegne: false,
        },
        resolver: zodResolver(schema),
    });

    const [onSubmit, lagreKnappProps] = useLagreKnapp(async () => {
        const listeAvtalerDeltakerAlleredeRegistrert = await sjekkOmDeltakerAlleredeErRegistrertPaaTiltak(
            deltakerFnr,
            tiltakstype,
            id,
            startDato ?? null,
            sluttDato ?? null,
        );

        if (listeAvtalerDeltakerAlleredeRegistrert.length > 0) {
            setAlleredeRegistrertAvtale({
                ...alleredeRegistrertAvtale,
                avtaler: listeAvtalerDeltakerAlleredeRegistrert,
                deltaker: deltakerFnr,
            });
            setGodkjenningsModalApen(true);
        } else {
            await onLagre();
        }
    });

    const onLagre = async () => {
        const { isSkalGodkjennesPaVegne } = getValues();

        if (isSkalGodkjennesPaVegne && isKunGodkjentAvArbeidsgiver) {
            return await godkjennPaVegneAvDeltaker({
                ikkeBankId: false,
                reservert: false,
                digitalKompetanse: false,
                arenaMigreringDeltaker: true,
            });
        }

        if (isSkalGodkjennesPaVegne && isKunGodkjentAvDeltaker) {
            return await godkjennPaVegneAvArbeidsgiver({
                klarerIkkeGiFaTilgang: false,
                vetIkkeHvemSomKanGiTilgang: false,
                farIkkeTilgangPersonvern: false,
                arenaMigreringArbeidsgiver: true,
            });
        }

        if (isSkalGodkjennesPaVegne && isIkkeGodkjentAvNoen) {
            return await godkjennPaVegneAvDeltakerOgArbeidsgiver({
                godkjentPaVegneAvDeltakerGrunn: {
                    ikkeBankId: false,
                    reservert: false,
                    digitalKompetanse: false,
                    arenaMigreringDeltaker: true,
                },
                godkjentPaVegneAvArbeidsgiverGrunn: {
                    klarerIkkeGiFaTilgang: false,
                    vetIkkeHvemSomKanGiTilgang: false,
                    farIkkeTilgangPersonvern: false,
                    arenaMigreringArbeidsgiver: true,
                },
            });
        }

        await godkjenn();
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Innholdsboks className={cls.className} ariaLabel={'Godkjenn avtalen'}>
                    <SkjemaTittel>Godkjenn avtalen</SkjemaTittel>
                    <GodkjenningInstruks />
                    {isKanGodkjennesPaVegneAv && (
                        <div className={cls.element('godkjenn-pa-vegne-av')}>
                            <Checkbox {...register('isSkalGodkjennesPaVegne')}>
                                {isKunGodkjentAvDeltaker && <>Jeg skal godkjenne på vegne av arbeidsgiver</>}
                                {isKunGodkjentAvArbeidsgiver && <>Jeg skal godkjenne på vegne av deltakeren</>}
                                {isIkkeGodkjentAvNoen && (
                                    <>Jeg skal godkjenne på vegne av deltakeren og arbeidsgiveren</>
                                )}
                            </Checkbox>
                            {watch('isSkalGodkjennesPaVegne') && (
                                <CheckboxGroup
                                    legend="Bekreftelse på at kravene og innholdet i avtalen er informert om"
                                    className={cls.element('skjema-gruppe')}
                                    error={formState.errors.isInformert?.message}
                                >
                                    <Checkbox value={true} {...register('isInformert')}>
                                        {isKunGodkjentAvArbeidsgiver && (
                                            <>Deltakeren er informert om kravene og godkjenner innholdet i avtalen.</>
                                        )}
                                        {isKunGodkjentAvDeltaker && (
                                            <>
                                                Arbeidsgiveren er informert om kravene og godkjenner innholdet i
                                                avtalen.
                                            </>
                                        )}
                                        {isIkkeGodkjentAvNoen && (
                                            <>
                                                Deltakeren og arbeidsgiveren er informert om kravene og godkjenner
                                                innholdet i avtalen.
                                            </>
                                        )}
                                    </Checkbox>
                                </CheckboxGroup>
                            )}
                        </div>
                    )}
                    {harFamilietilknytning && (
                        <>
                            <Alert variant="warning">
                                OBS! Det er oppgitt at deltaker har en relasjon med arbeidsgiver
                            </Alert>
                            <VerticalSpacer rem={1} />
                        </>
                    )}
                    <LagreKnapp className={cls.element('lagreKnapp')} type="submit" {...lagreKnappProps}>
                        Godkjenn avtalen
                    </LagreKnapp>
                </Innholdsboks>
            </form>
            <GodkjennAvtaleMedAlleredeOpprettetTiltak
                alleredeRegistrertAvtale={alleredeRegistrertAvtale.avtaler}
                isApen={isGodkjenningsModalApen}
                onLagre={onLagre}
                onLukk={() => setGodkjenningsModalApen(false)}
            />
        </>
    );
}

export default GodkjennPaVegneAvFlereParter;
