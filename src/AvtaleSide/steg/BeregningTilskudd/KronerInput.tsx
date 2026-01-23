import React, { useState } from 'react';
import { TextField } from '@navikt/ds-react';
import * as z from 'zod';
import { formaterNorskeTallFraInput, parseNorskeTallFraInput } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useController, useForm } from 'react-hook-form';

interface Props {
    label: string;
    verdi?: number;
    settVerdi: (verdi?: number) => void;
    description?: string;
    size?: 'medium' | 'small';
}

const schema = z.object({
    belop: z.preprocess(
        parseNorskeTallFraInput,
        z
            .number({
                invalid_type_error: 'Beløp må være et tall',
                required_error: 'Beløp er påkrevd',
            })
            .int('Beløp må være et helt tall')
            .min(1, 'Beløp må være minst 1'),
    ),
});

type Schema = { belop: string };

function KronerInput(props: Props) {
    const { settVerdi, verdi } = props;
    const [isFocused, setIsFocused] = useState(false);

    const { formState, control } = useForm<Schema>({
        mode: 'onBlur',
        resolver: zodResolver(schema),
        values: {
            belop: formaterNorskeTallFraInput(verdi?.toString() ?? ''),
        },
    });

    const { field } = useController({
        control,
        name: 'belop',
    });

    const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const belop = e.target.value;
        field.onChange(belop);

        const { success, data } = schema.safeParse({ belop });
        if (success && data?.belop !== undefined) {
            settVerdi(data.belop);
        } else if (!belop || belop.trim() === '') {
            settVerdi(undefined);
        }
    };

    const onBlur: React.FocusEventHandler<HTMLInputElement> = () => {
        field.onBlur();
        setIsFocused(false);
    };

    const onFocus: React.FocusEventHandler<HTMLInputElement> = () => {
        setIsFocused(true);
    };

    const displayValue = formaterNorskeTallFraInput(field.value);
    const valueWithKr = !isFocused && !formState.errors.belop && field.value ? displayValue + ' kr' : displayValue;

    return (
        <TextField
            {...field}
            error={formState.errors.belop?.message}
            label={props.label}
            onChange={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
            size={props.size}
            inputMode="numeric"
            value={valueWithKr}
            description={props.description}
        />
    );
}

export default KronerInput;
