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
    antallDagerPerUke: z.preprocess(
        parseNorskeTallFraInput,
        z
            .number({
                invalid_type_error: 'Antall dager være et tall',
                required_error: 'Antall dager er påkrevd',
            })
            .min(0.1, 'Antall dager må være større enn 0')
            .max(7, 'Antall dager må være mindre enn eller lik 7'),
    ),
});

type Schema = { antallDagerPerUke: string };

function AntallDagerInput(props: Props) {
    const { settVerdi, verdi } = props;

    const { formState, control } = useForm<Schema>({
        mode: 'onBlur',
        resolver: zodResolver(schema),
    });

    const { field } = useController({
        control,
        name: 'antallDagerPerUke',
        defaultValue: formaterNorskeTallFraInput(verdi?.toString() ?? ''),
    });

    const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const antallDagerPerUke = e.target.value;
        field.onChange(antallDagerPerUke);

        const { success, data } = schema.safeParse({ antallDagerPerUke });
        settVerdi(success ? data?.antallDagerPerUke : undefined);
    };

    return (
        <TextField
            {...field}
            error={formState.errors.antallDagerPerUke?.message}
            label={props.label}
            onChange={onChange}
            size={props.size}
            type="tel"
            value={formaterNorskeTallFraInput(field.value)}
        />
    );
}

export default AntallDagerInput;
