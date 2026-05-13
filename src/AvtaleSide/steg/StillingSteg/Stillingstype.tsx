import React, { useMemo } from 'react';
import { RadioGroup } from '@navikt/ds-react';
import { useController, useForm } from 'react-hook-form';
import * as z from 'zod';

import RadioPanel from '@/komponenter/radiopanel/RadioPanel';
import type { Avtaleinnhold, Stillingstype, TiltaksType } from '@/types';
import { stillingstype } from '@/messages';

import { zodResolver } from '@hookform/resolvers/zod';
import { differenceInYears } from 'date-fns';

interface Props {
    tiltakstype?: TiltaksType;
    avtaleInnhold?: Avtaleinnhold;
    className?: string;
    settVerdi: (verdi?: Stillingstype) => void;
}

export const finnAvtalensVarighet = (innhold: Avtaleinnhold) => {
    const { startDato, sluttDato } = innhold;
    return startDato && sluttDato ? differenceInYears(sluttDato, startDato) : undefined;
};

const lagSchema = (durationYears?: number) =>
    z.object({
        stillingstype: z.preprocess(
            (val) => val ?? undefined,
            z
                .enum(['FAST', 'MIDLERTIDIG'], { required_error: 'Feltet er påkrevd' })
                .refine(
                    (val) => !(val === 'MIDLERTIDIG' && durationYears && durationYears > 2),
                    'Avtalen kan ikke ha varighet over 2 år ved midlertidig stilling',
                )
                .refine(
                    (val) => !(val === 'FAST' && durationYears && durationYears > 4),
                    'Avtalen kan ikke ha varighet over 4 år ved fast stilling',
                ),
        ),
    });

type Schema = z.infer<ReturnType<typeof lagSchema>>;

const Stillingstype = (props: Props) => {
    const { tiltakstype, avtaleInnhold, settVerdi, className } = props;

    const { startDato, sluttDato } = avtaleInnhold || {};
    const avtaleVarighet = useMemo(() => {
        if (tiltakstype !== 'FIREARIG_LONNSTILSKUDD' || !startDato || !sluttDato) {
            return undefined;
        }
        return differenceInYears(sluttDato, startDato);
    }, [tiltakstype, startDato, sluttDato]);

    const schema = lagSchema(avtaleVarighet);

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
