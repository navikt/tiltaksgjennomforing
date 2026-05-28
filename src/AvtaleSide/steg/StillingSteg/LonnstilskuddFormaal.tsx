import React, { useMemo } from 'react';
import { useController, useForm } from 'react-hook-form';
import * as z from 'zod';
import type { LonnstilskuddFormaal, TiltaksType } from '@/types';
import { lonnstilskuddFormaal as lonnstilskuddFormaalVerdier } from '@/messages';
import { zodResolver } from '@hookform/resolvers/zod';
import RadioBlocks from '@/komponenter/radioblocks/RadioBlocks';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';

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
        <>
            <RadioBlocks
                legend="Hva er formålet med avtalen?"
                values={lonnstilskuddFormaalVerdier}
                selectedValue={verdi}
                onChange={onChange}
                direction="row"
            />
            <VerticalSpacer rem={2} />
        </>
    );
};

export default LonnstilskuddFormaal;
