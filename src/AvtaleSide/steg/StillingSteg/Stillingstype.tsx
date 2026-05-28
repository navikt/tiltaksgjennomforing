import React, { useMemo } from 'react';
import { useController, useForm } from 'react-hook-form';
import * as z from 'zod';
import type { Avtaleinnhold, Stillingstype, TiltaksType } from '@/types';
import { stillingstype as stillingstypeVerider } from '@/messages';
import { zodResolver } from '@hookform/resolvers/zod';
import { addYears, isBefore } from 'date-fns';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import RadioBlocks from '@/komponenter/radioblocks/RadioBlocks';

interface Props {
    tiltakstype?: TiltaksType;
    avtaleInnhold?: Avtaleinnhold;
    settVerdi: (verdi?: Stillingstype) => void;
}

const refineStillingstype = (startDato?: string, sluttDato?: string) => (val: Stillingstype) => {
    if (!startDato || !sluttDato) {
        return true;
    }
    return isBefore(sluttDato, addYears(startDato, val === 'MIDLERTIDIG' ? 2 : 4));
};

const lagSchema = (tiltakstype?: TiltaksType, startDato?: string, sluttDato?: string) => {
    const stillingstypeEnum = z.enum(['FAST', 'MIDLERTIDIG'], { required_error: 'Feltet er påkrevd' });

    if (tiltakstype !== 'FIREARIG_LONNSTILSKUDD') {
        return z.object({ stillingstype: z.preprocess((val) => val ?? undefined, stillingstypeEnum) });
    }

    return z.object({
        stillingstype: z.preprocess(
            (val) => val ?? undefined,
            stillingstypeEnum
                .refine(
                    refineStillingstype(startDato, sluttDato),
                    'Avtalen kan ikke ha varighet over 2 år ved midlertidig stilling',
                )
                .refine(
                    refineStillingstype(startDato, sluttDato),
                    'Avtalen kan ikke ha varighet over 4 år ved fast stilling',
                ),
        ),
    });
};

type Schema = z.infer<ReturnType<typeof lagSchema>>;

const Stillingstype = (props: Props) => {
    const { tiltakstype, avtaleInnhold, settVerdi } = props;

    const { startDato, sluttDato } = avtaleInnhold || {};
    const schema = useMemo(() => lagSchema(tiltakstype, startDato, sluttDato), [tiltakstype, startDato, sluttDato]);

    const { control, formState } = useForm<Schema>({
        defaultValues: {
            stillingstype: avtaleInnhold?.stillingstype,
        },
        mode: 'onChange',
        resolver: zodResolver(schema),
    });

    const { field } = useController({
        control,
        name: 'stillingstype',
    });

    const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const stillingstype = e.target.value;
        field.onChange(stillingstype);

        const { success, data } = schema.safeParse({ stillingstype });
        settVerdi(success ? data?.stillingstype : undefined);
    };

    return (
        <>
            <RadioBlocks
                legend="Er stillingen fast eller midlertidig?"
                values={stillingstypeVerider}
                selectedValue={field.value}
                onChange={onChange}
                direction="row"
                error={formState.errors.stillingstype?.message}
            />
            <VerticalSpacer rem={2} />
        </>
    );
};

export default Stillingstype;
