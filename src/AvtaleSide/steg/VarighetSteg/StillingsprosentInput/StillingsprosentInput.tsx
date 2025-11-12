import React from 'react';
import * as z from 'zod';
import { TextField } from '@navikt/ds-react';
import { useController, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { formaterNorskeTallFraInput, parseNorskeTallFraInput } from '@/utils';

interface Props {
    label: string;
    verdi?: number;
    settVerdi: (verdi?: number) => void;
    size?: 'medium' | 'small';
}

const schema = z.object({
    stillingsprosent: z.preprocess(
        (x: string | undefined): number | undefined => parseNorskeTallFraInput(x),
        z
            .number({
                error: (err) =>
                    err.input === undefined ? 'Stillingsprosent er påkrevd' : 'Stillingsprosent være et tall',
            })
            .multipleOf(0.01, 'Stillingsprosent kan maks ha 2 desimaler')
            .min(0.1, 'Stillingsprosent må være større enn 0')
            .max(100, 'Stillingsprosent må være mindre enn eller lik 100'),
    ),
});

function StillingsprosentInput(props: Props) {
    const { settVerdi, verdi } = props;

    const { formState, control } = useForm({
        mode: 'onBlur',
        resolver: zodResolver(schema),
    });

    const { field } = useController({
        control,
        name: 'stillingsprosent',
        defaultValue: formaterNorskeTallFraInput(verdi?.toString() ?? ''),
    });

    const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const stillingsprosent = e.target.value;
        field.onChange(stillingsprosent);

        const { success, data } = schema.safeParse({ stillingsprosent });
        settVerdi(success ? data?.stillingsprosent : undefined);
    };

    return (
        <TextField
            {...field}
            error={formState.errors.stillingsprosent?.message}
            label={props.label}
            onChange={onChange}
            size={props.size}
            type="tel"
            value={formaterNorskeTallFraInput(field.value)}
        />
    );
}

export default StillingsprosentInput;
