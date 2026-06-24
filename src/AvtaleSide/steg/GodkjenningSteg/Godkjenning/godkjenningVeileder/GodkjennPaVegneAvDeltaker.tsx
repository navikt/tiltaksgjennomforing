import { useRef, useState } from 'react';
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
import { kanDeltakerMottaPost, sjekkOmDeltakerAlleredeErRegistrertPaaTiltak } from '@/services/rest-service';
import { useAlleredeOpprettetAvtale } from '@/komponenter/alleredeOpprettetTiltak/api/AlleredeOpprettetAvtaleProvider';
import { useAvtale } from '@/AvtaleProvider';
import { FeilkodeError } from '@/types';
import InnsatsbehovVarselModal from '@/AvtaleSide/steg/GodkjenningSteg/InnsatsbehovVarselModal/InnsatsbehovVarselModal';
import ManglendeAdresseOgReservertDialog from './ManglendeAdresseOgReservertDialog';

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
    const { avtale, godkjenn, godkjennPaVegneAvDeltaker, hentAvtale } = useAvtale();
    const { deltakerFnr, tiltakstype, id, gjeldendeInnhold, godkjentAvDeltaker } = avtale;
    const { startDato, sluttDato, harFamilietilknytning } = gjeldendeInnhold;
    const { alleredeRegistrertAvtale, setAlleredeRegistrertAvtale } = useAlleredeOpprettetAvtale();
    const [isGodkjenningsModalApen, setGodkjenningsModalApen] = useState<boolean>(false);
    const isKanGodkjennesPaVegneAv = !godkjentAvDeltaker;
    const [innsatsbehovVarselModalIsOpen, setInnsatsbehovVarselModalIsOpen] = useState(false);
    const [manglerAdresseOgReservertDialogIsOpen, setManglerAdresseOgReservertDialogIsOpen] = useState(false);
    const harLukketManglerAdresseOgReservertDialog = useRef(false);

    const { register, handleSubmit, formState, watch, getValues, reset } = useForm<Schema>({
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
            try {
                await onLagre();
            } catch (err) {
                if (err instanceof FeilkodeError && err.message === 'OPPFOLGINGSTATUS_ENDRET') {
                    setInnsatsbehovVarselModalIsOpen(true);
                } else {
                    throw err;
                }
            }
        }
    });
    const onGodkjennSubmit = handleSubmit(onSubmit);

    const onLagre = async () => {
        const { isSkalGodkjennesPaVegne, godkjentPaVegneAvGrunner } = getValues();

        if (harLukketManglerAdresseOgReservertDialog.current) {
            harLukketManglerAdresseOgReservertDialog.current = false;
        } else if (!(await kanDeltakerMottaPost(id))) {
            setManglerAdresseOgReservertDialogIsOpen(true);
            return;
        }

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

    const onLukkManglerAdresseOgReservertDialog = () => {
        harLukketManglerAdresseOgReservertDialog.current = true;
        setManglerAdresseOgReservertDialogIsOpen(false);
    };

    return (
        <>
            <form onSubmit={onGodkjennSubmit}>
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
            {innsatsbehovVarselModalIsOpen && (
                <InnsatsbehovVarselModal
                    onClose={async () => {
                        setInnsatsbehovVarselModalIsOpen(false);
                        setGodkjenningsModalApen(false);
                        await hentAvtale();
                        reset();
                    }}
                />
            )}
            <GodkjennAvtaleMedAlleredeOpprettetTiltak
                alleredeRegistrertAvtale={alleredeRegistrertAvtale.avtaler}
                isApen={isGodkjenningsModalApen}
                onLagre={onLagre}
                onLukk={() => setGodkjenningsModalApen(false)}
                feilkodeDialog={
                    <ManglendeAdresseOgReservertDialog
                        open={manglerAdresseOgReservertDialogIsOpen}
                        onClose={onLukkManglerAdresseOgReservertDialog}
                    />
                }
            />
            <ManglendeAdresseOgReservertDialog
                open={manglerAdresseOgReservertDialogIsOpen && !isGodkjenningsModalApen}
                onClose={onLukkManglerAdresseOgReservertDialog}
            />
        </>
    );
}

export default GodkjennPaVegneAvDeltaker;
