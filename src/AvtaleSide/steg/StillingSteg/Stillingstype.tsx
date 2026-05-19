import React, { useMemo } from 'react';
import { RadioGroup } from '@navikt/ds-react';
import { useController, useForm } from 'react-hook-form';
import * as z from 'zod';

import RadioPanel from '@/komponenter/radiopanel/RadioPanel';
import type { Avtaleinnhold, Stillingstype, TiltaksType } from '@/types';
import { stillingstype } from '@/messages';

import { zodResolver } from '@hookform/resolvers/zod';
import { addYears, isBefore } from 'date-fns';

interface Props {
    tiltakstype?: TiltaksType;
    avtaleInnhold?: Avtaleinnhold;
    className?: string;
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
    const { tiltakstype, avtaleInnhold, settVerdi, className } = props;

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
        <RadioGroup
            {...field}
            legend="Er stillingen fast eller midlertidig?"
            className={className}
            error={formState.errors.stillingstype?.message}
        >
            {['FAST', 'MIDLERTIDIG'].map((str) => {
                const type = str as Stillingstype;
                return (
                    <RadioPanel key={type} value={type} checked={field.value === type} onChange={onChange}>
                        {stillingstype[type]}
                    </RadioPanel>
                );
            })}
        </RadioGroup>
    );
};

export default Stillingstype;
