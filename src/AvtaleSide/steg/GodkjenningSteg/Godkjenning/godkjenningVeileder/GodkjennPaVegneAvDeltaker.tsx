import React, { useState } from 'react';
import * as z from 'zod';
import { Alert, Checkbox, CheckboxGroup } from '@navikt/ds-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import BEMHelper from '@/utils/bem';
import GodkjennAvtaleMedAlleredeOpprettetTiltak from '@/komponenter/alleredeOpprettetTiltak/GodkjennAvtaleMedAlleredeOpprettetTiltak';
import GodkjenningInstruks from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/instruks/GodkjenningInstruks';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import LagreKnapp, { useLagreKnapp } from '@/komponenter/LagreKnapp/LagreKnappBase';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { sjekkOmDeltakerAlleredeErRegistrertPaaTiltak } from '@/services/rest-service';
import { useAlleredeOpprettetAvtale } from '@/komponenter/alleredeOpprettetTiltak/api/AlleredeOpprettetAvtaleProvider';
import { useAvtale } from '@/AvtaleProvider';

const schema = z.discriminatedUnion('isSkalGodkjennesPaVegne', [
    z.object({
        isSkalGodkjennesPaVegne: z.literal(false),
        isInformert: z.coerce.boolean(),
        godkjentPaVegneAvGrunner: z.string().array(),
    }),
    z.object({
        isSkalGodkjennesPaVegne: z.literal(true),
        isInformert: z.coerce.boolean().refine((val) => val, {
            message: 'Deltaker må være informert om kravene og godkjenne innholdet i avtalen',
        }),
        godkjentPaVegneAvGrunner: z
            .enum(['ikkeBankId', 'reservert', 'digitalKompetanse'])
            .array()
            .min(1, { message: 'Oppgi minst én grunn for godkjenning på vegne av deltaker' }),
    }),
]);

type Schema = z.infer<typeof schema>;

function GodkjennPaVegneAvDeltaker() {
    const cls = BEMHelper('godkjenning');
    const { avtale, godkjenn, godkjennPaVegneAvDeltaker } = useAvtale();
    const { deltakerFnr, tiltakstype, id, gjeldendeInnhold, godkjentAvDeltaker } = avtale;
    const { startDato, sluttDato, harFamilietilknytning } = gjeldendeInnhold;
    const { alleredeRegistrertAvtale, setAlleredeRegistrertAvtale } = useAlleredeOpprettetAvtale();
    const [isGodkjenningsModalApen, setGodkjenningsModalApen] = useState<boolean>(false);
    const isKanGodkjennesPaVegneAv = !godkjentAvDeltaker;

    const { register, handleSubmit, formState, watch, getValues } = useForm({
        defaultValues: {
            isInformert: false,
            isSkalGodkjennesPaVegne: false,
            godkjentPaVegneAvGrunner: [],
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
        const { isSkalGodkjennesPaVegne, godkjentPaVegneAvGrunner } = getValues();

        if (isSkalGodkjennesPaVegne) {
            await godkjennPaVegneAvDeltaker({
                ikkeBankId: godkjentPaVegneAvGrunner.includes('ikkeBankId'),
                reservert: godkjentPaVegneAvGrunner.includes('reservert'),
                digitalKompetanse: godkjentPaVegneAvGrunner.includes('digitalKompetanse'),
                arenaMigreringDeltaker: false,
            });
        } else {
            await godkjenn();
        }
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
                                Jeg skal godkjenne på vegne av deltakeren
                            </Checkbox>
                            {watch('isSkalGodkjennesPaVegne') && (
                                <>
                                    <div className={cls.element('checkbox-wrapper')}>
                                        <CheckboxGroup
                                            legend="Godkjenn på vegne av deltaker valg"
                                            error={formState.errors.godkjentPaVegneAvGrunner?.message}
                                        >
                                            <Checkbox {...register('godkjentPaVegneAvGrunner')} value="ikkeBankId">
                                                har ikke BankID
                                            </Checkbox>
                                            <Checkbox {...register('godkjentPaVegneAvGrunner')} value="reservert">
                                                har reservert seg mot digitale tjenester
                                            </Checkbox>
                                            <Checkbox
                                                {...register('godkjentPaVegneAvGrunner')}
                                                value="digitalKompetanse"
                                            >
                                                mangler digital kompetanse
                                            </Checkbox>
                                        </CheckboxGroup>
                                    </div>
                                    <CheckboxGroup
                                        legend="Bekreftelse på at kravene og innholdet i avtalen er informert om"
                                        className={cls.element('skjema-gruppe')}
                                        error={formState.errors.isInformert?.message}
                                    >
                                        <Checkbox value={true} {...register('isInformert')}>
                                            Deltakeren er informert om kravene og godkjenner innholdet i avtalen.
                                        </Checkbox>
                                    </CheckboxGroup>
                                </>
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
                    <LagreKnapp type="submit" className={cls.element('lagreKnapp')} {...lagreKnappProps}>
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

export default GodkjennPaVegneAvDeltaker;
