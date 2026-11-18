import LagreKnapp, { useLagreKnapp } from '@/komponenter/LagreKnapp/LagreKnappBase';
import KronerInput from '@/komponenter/form/KronerInput';
import { inkluderingstilskuddtypeTekst } from '@/messages';
import { InkluderingstilskuddsutgiftType } from '@/types/avtale';
import { formaterPenger } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, HStack, Select, Textarea, TextField, VStack } from '@navikt/ds-react';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';
import style from './TilskuddsutgiftSkjema.module.less';

export type TilskuddsutgiftSkjemaProps = {
    leggTilTilskuddsutgift: (
        navn: string,
        beløp: number,
        beskrivelse: string,
        type: InkluderingstilskuddsutgiftType,
    ) => void;
    ledigeInkluderingstilskuddtyper: InkluderingstilskuddsutgiftType[];
    totalBeløp: number;
    inkluderingstilskuddSats: number;
    onLagret?: () => void;
    onAvbryt?: () => void;
    lagretekst?: string;
};

const TilskuddsutgiftSkjema = ({
    leggTilTilskuddsutgift,
    ledigeInkluderingstilskuddtyper,
    totalBeløp,
    inkluderingstilskuddSats,
    onLagret,
    onAvbryt,
    lagretekst = 'Legg til utgift',
}: TilskuddsutgiftSkjemaProps) => {
    const schema = z.object({
        navn: z
            .string()
            .trim()
            .min(1, 'Vennligst oppgi et navn på utgiften')
            .max(100, 'Navnet kan ikke være lengre enn 100 tegn'),
        type: z.custom<InkluderingstilskuddsutgiftType>(
            (verdi) => ledigeInkluderingstilskuddtyper.some((type) => type === verdi),
            'Vennligst velg en type utgift',
        ),
        beskrivelse: z
            .string()
            .trim()
            .min(1, 'Vennligst oppgi en beskrivelse')
            .max(1000, 'Beskrivelsen kan ikke være lengre enn 1000 tegn'),
        beløp: z
            .number({ required_error: 'Vennligst oppgi et kostnadsoverslag' })
            .max(
                inkluderingstilskuddSats - totalBeløp,
                `Det totale beløpet overskrider det maksimale beløpet på ${formaterPenger(inkluderingstilskuddSats)}`,
            ),
    });
    const { register, control, handleSubmit, formState, getValues, reset } = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: { navn: '', beskrivelse: '' },
    });

    const [onSubmit, lagreKnappProps] = useLagreKnapp(async () => {
        const { navn, beløp, beskrivelse, type } = getValues();
        await leggTilTilskuddsutgift(navn, beløp, beskrivelse, type);
        reset();
        onLagret?.();
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <VStack gap="space-32">
                <VStack gap="space-16">
                    <TextField
                        {...register('navn')}
                        label="Navn på utgift"
                        description="En kort beskrivelse av utgiften"
                        error={formState.errors.navn?.message}
                        htmlSize={37}
                    />
                    <Select
                        {...register('type')}
                        error={formState.errors.type?.message}
                        label="Kategori"
                        className={style.halvBredde}
                    >
                        <option value="">Velg type utgift</option>
                        {ledigeInkluderingstilskuddtyper.map((currentType) => (
                            <option key={currentType} value={currentType}>
                                {inkluderingstilskuddtypeTekst[currentType]}
                            </option>
                        ))}
                    </Select>
                    <Textarea
                        {...register('beskrivelse')}
                        label="Begrunnelse"
                        className={style.begrunnelse}
                        description="Beskriv kort hvorfor denne utgiften er nødvendig"
                        maxLength={1000}
                        error={formState.errors.beskrivelse?.message}
                    />
                    <Controller
                        name="beløp"
                        control={control}
                        render={({ field, fieldState }) => (
                            <KronerInput
                                error={fieldState.error?.message}
                                name={field.name}
                                label="Beløp inntil"
                                description="Inkludert moms"
                                verdi={field.value}
                                settVerdi={field.onChange}
                                onBlur={field.onBlur}
                                htmlSize={21}
                            />
                        )}
                    />
                </VStack>
                <HStack gap="space-16">
                    <LagreKnapp type="submit" size="small" {...lagreKnappProps}>
                        {lagretekst}
                    </LagreKnapp>
                    <Button
                        type="button"
                        size="small"
                        variant="secondary"
                        onClick={() => {
                            reset();
                            onAvbryt?.();
                        }}
                    >
                        Avbryt
                    </Button>
                </HStack>
            </VStack>
        </form>
    );
};

export default TilskuddsutgiftSkjema;
