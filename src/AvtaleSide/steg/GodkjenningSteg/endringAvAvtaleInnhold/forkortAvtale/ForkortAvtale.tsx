import { AvtaleContext } from '@/AvtaleProvider';
import SlikVilTilskuddsperioderSeUt from '@/AvtaleSide/Oppgavelinje/SlikVilTilskuddsperioderSeUt';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import BekreftelseModal from '@/komponenter/modal/BekreftelseModal';
import { forkortAvtale, forkortAvtaleDryRun } from '@/services/rest-service';
import { TilskuddsPeriode } from '@/types/avtale';
import { handterFeil } from '@/utils/apiFeilUtils';
import { Notes } from '@navikt/ds-icons/cjs';
import { BodyShort, debounce, Label, Link, Radio, RadioGroup, Textarea } from '@navikt/ds-react';
import React, { FunctionComponent, useContext, useEffect, useMemo, useState } from 'react';
import BEMHelper from '@/utils/bem';
import DatovelgerForlengOgForkort from '@/komponenter/datovelger/DatovelgerForlengOgForkort';
import { formaterDato, formaterDatoHvisDefinert, NORSK_DATO_FORMAT } from '@/utils/datoUtils';
import './forkortAvtale.less';
import { addDays } from 'date-fns';
import * as z from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const grunn = ['Begynt i arbeid', 'Fått tilbud om annet tiltak', 'Syk', 'Ikke møtt', 'Fullført', 'Annet'] as const;
const grunnSchema = z.enum(grunn, { errorMap: () => ({ message: 'Grunn må velges' }) });

const schema = (min: Date, max: Date) =>
    z
        .object({
            grunn: grunnSchema,
            sluttDato: z.preprocess(
                (value) => (!value || value === '' ? undefined : value),
                z.coerce
                    .date({ errorMap: () => ({ message: 'Sluttdato må ha formatet dd.mm.åååå' }) })
                    .max(max, { message: `Sluttdato kan senest være ${formaterDato(max, NORSK_DATO_FORMAT)}` })
                    .min(min, { message: `Sluttdato kan tidligst være ${formaterDato(min, NORSK_DATO_FORMAT)}` }),
            ),
            annetGrunn: z.string().max(500, 'Begrunnelse kan ikke være lengre enn 500 tegn').optional(),
        })
        .refine((data) => (data.grunn === 'Annet' ? data.annetGrunn && data.annetGrunn.trim().length : true), {
            message: 'Begrunnelse må fylles ut når "Annet" er valgt',
            path: ['annetGrunn'],
        });

type Schema = { grunn: z.infer<typeof grunnSchema>; sluttDato: string; annetGrunn?: string };

const ForkortAvtale: FunctionComponent = () => {
    const avtaleContext = useContext(AvtaleContext);
    const cls = BEMHelper('forkortAvtale');

    const [modalApen, setModalApen] = useState(false);
    const [tilskuddsperioder, setTilskuddsperioder] = useState<TilskuddsPeriode[]>([]);

    const minDate = new Date(avtaleContext.avtale.gjeldendeInnhold.startDato!);
    const maxDate = addDays(avtaleContext.avtale.gjeldendeInnhold.sluttDato!, -1);

    const { formState, register, control, watch, trigger, getValues, setError, subscribe } = useForm<Schema>({
        mode: 'onBlur',
        resolver: zodResolver(schema(minDate, maxDate)),
        defaultValues: {
            grunn: grunn[0],
            sluttDato: formaterDato(avtaleContext.avtale.gjeldendeInnhold.sluttDato!, 'yyyy-MM-dd'),
            annetGrunn: '',
        },
    });

    const dryRun = useMemo(() => {
        let gammelSluttDato: string | undefined = undefined;

        return debounce(async (nySluttDato: string, isValid?: boolean) => {
            if (nySluttDato === gammelSluttDato) {
                return;
            }
            if (!isValid) {
                setTilskuddsperioder([]);
                return;
            }
            try {
                const nyAvtale = await forkortAvtaleDryRun(avtaleContext.avtale, nySluttDato);
                setTilskuddsperioder(nyAvtale.tilskuddPeriode);
                gammelSluttDato = nySluttDato;
            } catch (error: any) {
                handterFeil(error, (message) => {
                    setError('sluttDato', { message });
                });
            }
        }, 500);
    }, [avtaleContext.avtale, setTilskuddsperioder, setError]);

    useEffect(() => {
        const unsubscribe = subscribe({
            formState: { values: true, isValid: true },
            callback: ({ values, errors }) => {
                dryRun(values.sluttDato, !errors?.sluttDato);
            },
        });

        return () => {
            unsubscribe();
        };
    }, [subscribe]);

    const lukkModal = (): void => {
        setModalApen(false);
        setTilskuddsperioder([]);
    };

    const forkort = async () => {
        const isValid = await trigger(); // Revalidate all fields
        if (!isValid) {
            return;
        }
        const { sluttDato, grunn, annetGrunn } = getValues();
        await forkortAvtale(avtaleContext.avtale, sluttDato, grunn, annetGrunn);
        await avtaleContext.hentAvtale();
        lukkModal();
    };

    return (
        <>
            <div>
                <Link
                    onClick={(event) => {
                        event.stopPropagation();
                        setModalApen(true);
                    }}
                    href="#"
                    role="menuitem"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <div aria-hidden={true}>
                        <Notes style={{ marginRight: '0.5rem' }} />
                    </div>
                    Forkort avtale
                </Link>
            </div>

            <BekreftelseModal
                style={{ maxWidth: '100%' }}
                avbrytelseTekst="Avbryt"
                bekreftelseTekst="Forkort"
                oversiktTekst="Forkort avtale"
                modalIsOpen={modalApen}
                bekreftOnClick={forkort}
                lukkModal={lukkModal}
            >
                <div className={cls.className}>
                    <div className={cls.element('navarende-sluttdato')}>
                        <Label>Nåværende sluttdato for avtalen</Label>
                        <VerticalSpacer rem={0.5} />
                        <BodyShort>
                            {formaterDato(avtaleContext.avtale.gjeldendeInnhold.sluttDato!, NORSK_DATO_FORMAT)}
                        </BodyShort>
                    </div>

                    <Controller
                        name="sluttDato"
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <DatovelgerForlengOgForkort
                                legend="Velg ny sluttdato for avtalen"
                                value={value}
                                onChangeHåndtereNyDato={(dato?: string) => {
                                    onChange(dato);
                                    onBlur();
                                }}
                                minDate={formaterDato(minDate, 'yyyy-MM-dd')}
                                maxDate={formaterDato(maxDate, 'yyyy-MM-dd')}
                                error={formState.errors.sluttDato?.message}
                            />
                        )}
                    />

                    <VerticalSpacer rem={1} />
                    <Controller
                        name="grunn"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <RadioGroup
                                legend="Hvorfor forkortes avtalen?"
                                value={value}
                                onChange={onChange}
                                error={formState.errors.grunn?.message}
                            >
                                {grunn.map((label: string) => (
                                    <Radio key={label} name="grunn" value={label} role="menuitemradio">
                                        {label}
                                    </Radio>
                                ))}
                            </RadioGroup>
                        )}
                    />
                    {watch('grunn') === 'Annet' && (
                        <Textarea
                            label=""
                            aria-label="Begrunnelse"
                            placeholder="Begrunnelse (påkrevd)"
                            error={formState.errors.annetGrunn?.message}
                            maxLength={500}
                            role="textbox"
                            {...register('annetGrunn')}
                        />
                    )}
                    <VerticalSpacer rem={2} />
                    <SlikVilTilskuddsperioderSeUt
                        overskrift="Slik vil tilskuddsperiodene se ut etter at avtalen forkortes"
                        tilskuddsperioder={tilskuddsperioder}
                    />
                </div>
            </BekreftelseModal>
        </>
    );
};

export default ForkortAvtale;
