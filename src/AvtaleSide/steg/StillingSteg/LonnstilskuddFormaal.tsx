import React, { useMemo } from 'react';
import { RadioGroup } from '@navikt/ds-react';
import { useController, useForm } from 'react-hook-form';
import * as z from 'zod';

import RadioPanel from '@/komponenter/radiopanel/RadioPanel';
import type { LonnstilskuddFormaal, TiltaksType } from '@/types';
import { lonnstilskuddFormaal as lonnstilskuddFormaalMsg } from '@/messages';

import { zodResolver } from '@hookform/resolvers/zod';

interface Props {
    tiltakstype?: TiltaksType;
    className?: string;
    settVerdi: (verdi?: LonnstilskuddFormaal) => void;
    verdi?: LonnstilskuddFormaal;
}

const lagSchema = (tiltakstype?: TiltaksType) => {
    const stillingstypeEnum = z.enum(['SKAFFE_ARBEID', 'BEHOLDE_ARBEID'], { required_error: 'Feltet er påkrevd' });

    if (tiltakstype !== 'FIREARIG_LONNSTILSKUDD') {
        return z.object({ lonnstilskuddFormaal: z.preprocess((val) => val ?? undefined, stillingstypeEnum) });
    }

    return z.object({
        lonnstilskuddFormaal: z.preprocess(
            (val) => val ?? undefined,
            stillingstypeEnum.refine(
                (val) => val === 'SKAFFE_ARBEID',
                'Fireårig lønnstilskudd for unge kan ikke brukes til å beholde arbeid',
            ),
        ),
    });
};

type Schema = z.infer<ReturnType<typeof lagSchema>>;

const LonnstilskuddFormaal = (props: Props) => {
    const { tiltakstype, settVerdi, className, verdi } = props;

    const schema = useMemo(() => lagSchema(tiltakstype), [tiltakstype]);

    const { control, formState } = useForm<Schema>({
        defaultValues: {
            lonnstilskuddFormaal: verdi,
        },
        mode: 'onChange',
        resolver: zodResolver(schema),
    });

    const { field } = useController({
        control,
        name: 'lonnstilskuddFormaal',
    });

    const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const lonnstilskuddFormaal = e.target.value;
        field.onChange(lonnstilskuddFormaal);

        const { success, data } = schema.safeParse({ lonnstilskuddFormaal });
        settVerdi(success ? data?.lonnstilskuddFormaal : undefined);
    };

    return (
        <RadioGroup
            {...field}
            legend="Hva er formålet med avtalen?"
            className={className}
            error={formState.errors.lonnstilskuddFormaal?.message}
        >
            {['SKAFFE_ARBEID', 'BEHOLDE_ARBEID'].map((str) => {
                const type = str as LonnstilskuddFormaal;
                return (
                    <RadioPanel key={type} value={type} checked={field.value === type} onChange={onChange}>
                        {lonnstilskuddFormaalMsg[type]}
                    </RadioPanel>
                );
            })}
        </RadioGroup>
    );
};

export default LonnstilskuddFormaal;
