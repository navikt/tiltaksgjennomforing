import LagreKnapp, { useLagreKnapp } from '@/komponenter/LagreKnapp/LagreKnappBase';
import { inkluderingstilskuddtypeTekst } from '@/messages';
import { Inkluderingstilskuddsutgift, InkluderingstilskuddsutgiftType } from '@/types/avtale';
import { formaterPenger } from '@/utils';
import { Button, Heading, Modal, Select, Textarea, TextField, VStack } from '@navikt/ds-react';
import { FunctionComponent, useState } from 'react';
import KronerInput from '@/komponenter/form/KronerInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';
import style from './OpprettEnTilskuddsutgift.module.less';

type Props = {
    setIRedigeringsmodus: (iModus: boolean) => void;
    iRegideringsmodus: boolean;
    tilskuddsutgift: Inkluderingstilskuddsutgift[];
    leggTilTilskuddsutgift: (
        navn: string,
        beløp: number,
        beskrivelse: string,
        type: InkluderingstilskuddsutgiftType,
    ) => void;
    ledigeInkluderingstilskuddtyper: InkluderingstilskuddsutgiftType[];
    totalBeløp: number;
    inkluderingstilskuddSats: number;
};

const OpprettEnTilskuddsutgift: FunctionComponent<Props> = (props) => {
    const {
        iRegideringsmodus,
        inkluderingstilskuddSats,
        ledigeInkluderingstilskuddtyper,
        leggTilTilskuddsutgift,
        setIRedigeringsmodus,
        totalBeløp,
    } = props;

    const [leggertilTilskuddsutgift, setLeggertilTilskuddsutgift] = useState(false);

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

    const lukkModal = () => {
        setLeggertilTilskuddsutgift(false);
        setIRedigeringsmodus(false);
        reset();
    };

    const [onSubmit, lagreKnappProps] = useLagreKnapp(async () => {
        const { navn, beløp, beskrivelse, type } = getValues();
        await leggTilTilskuddsutgift(navn, beløp, beskrivelse, type);
        lukkModal();
    });

    return (
        <VStack gap="space-32" align="start">
            <Heading level="2" size="medium">
                Legg til utgift
            </Heading>

            <Button
                type="button"
                variant="secondary"
                disabled={iRegideringsmodus}
                onClick={() => {
                    setIRedigeringsmodus(true);
                    setLeggertilTilskuddsutgift(true);
                }}
            >
                Legg til ny utgift
            </Button>
            <Modal open={leggertilTilskuddsutgift} onClose={lukkModal} header={{ heading: 'Ny utgift' }} width="medium">
                {leggertilTilskuddsutgift && (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Modal.Body>
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
                                    {ledigeInkluderingstilskuddtyper.map(
                                        (currentType: InkluderingstilskuddsutgiftType) => (
                                            <option key={currentType} value={currentType}>
                                                {inkluderingstilskuddtypeTekst[currentType]}
                                            </option>
                                        ),
                                    )}
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
                                            description={'Inkludert moms'}
                                            verdi={field.value}
                                            settVerdi={field.onChange}
                                            onBlur={field.onBlur}
                                            htmlSize={21}
                                        />
                                    )}
                                />
                            </VStack>
                        </Modal.Body>
                        <Modal.Footer>
                            <LagreKnapp type="submit" size="small" {...lagreKnappProps}>
                                Lagre
                            </LagreKnapp>
                            <Button type="button" size="small" variant="secondary" onClick={lukkModal}>
                                Avbryt
                            </Button>
                        </Modal.Footer>
                    </form>
                )}
            </Modal>
        </VStack>
    );
};

export default OpprettEnTilskuddsutgift;
