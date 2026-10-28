import LagreKnapp, { useLagreKnapp } from '@/komponenter/LagreKnapp/LagreKnappBase';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { inkluderingstilskuddtypeTekst } from '@/messages';
import { Inkluderingstilskuddsutgift, InkluderingstilskuddsutgiftType } from '@/types/avtale';
import { formaterPenger } from '@/utils';
import { Button, Heading, Modal, Select, Textarea, TextField } from '@navikt/ds-react';
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
        name: string,
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
        name: z.string().refine((verdi) => verdi.trim().length > 0, 'Vennligst oppgi et navn på utgiften'),
        type: z.custom<InkluderingstilskuddsutgiftType>(
            (verdi) => ledigeInkluderingstilskuddtyper.some((type) => type === verdi),
            'Vennligst velg en type utgift',
        ),
        beskrivelse: z
            .string()
            .max(1000, 'Beskrivelsen kan ikke være lengre enn 1000 tegn')
            .refine((verdi) => verdi.trim().length > 0, 'Vennligst oppgi en beskrivelse'),
        beløp: z
            .number({ required_error: 'Vennligst oppgi et kostnadsoverslag' })
            .int('Pris inntil må være et heltall')
            .min(1, 'Pris inntil må være minst 1 kr')
            .max(
                inkluderingstilskuddSats - totalBeløp,
                `Det totale beløpet overskrider det maksimale beløpet på ${formaterPenger(inkluderingstilskuddSats)}`,
            ),
    });
    const { register, control, handleSubmit, formState, getValues, reset } = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: { name: '', beskrivelse: '' },
    });

    const lukkModal = () => {
        setLeggertilTilskuddsutgift(false);
        setIRedigeringsmodus(false);
        reset();
    };

    const [onSubmit, lagreKnappProps] = useLagreKnapp(async () => {
        const { name, beløp, beskrivelse, type } = getValues();
        await leggTilTilskuddsutgift(name, beløp, beskrivelse, type);
        lukkModal();
    });

    return (
        <div>
            <Heading level="2" size="medium">
                Legg til utgift
            </Heading>
            <VerticalSpacer rem={2} />

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
                            <TextField
                                {...register('name')}
                                label="Navn på utgift"
                                description="En kort beskrivelse av utgiften"
                                className={style.halvBredde}
                                error={formState.errors.name?.message}
                            />
                            <VerticalSpacer rem={1} />
                            <Select
                                {...register('type')}
                                error={formState.errors.type?.message}
                                label="Kategori"
                                className={style.halvBredde}
                            >
                                <option value="">Velg type utgift</option>
                                {ledigeInkluderingstilskuddtyper.map((currentType: InkluderingstilskuddsutgiftType) => (
                                    <option key={currentType} value={currentType}>
                                        {inkluderingstilskuddtypeTekst[currentType]}
                                    </option>
                                ))}
                            </Select>
                            <VerticalSpacer rem={1} />
                            <Textarea
                                {...register('beskrivelse')}
                                label="Begrunnelse"
                                className={style.begrunnelse}
                                description="Beskriv kort hvorfor denne utgiften er nødvendig"
                                maxLength={1000}
                                error={formState.errors.beskrivelse?.message}
                            />
                            <VerticalSpacer rem={1} />
                            <Controller
                                name="beløp"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <KronerInput
                                        error={fieldState.error?.message}
                                        name={field.name}
                                        className={style.belop}
                                        label="Pris inntil"
                                        description={'Inkludert moms'}
                                        verdi={field.value}
                                        settVerdi={field.onChange}
                                        onBlur={field.onBlur}
                                    />
                                )}
                            />
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
        </div>
    );
};

export default OpprettEnTilskuddsutgift;
