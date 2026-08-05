import React from 'react';
import { TextField, TextFieldProps } from '@navikt/ds-react';
import * as z from 'zod';
import { formaterPenger, parsePenger } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useController, useForm } from 'react-hook-form';

interface Props extends TextFieldProps {
    name: string;
    verdi?: number;
    settVerdi: (verdi?: number) => void;
}

const schema = (name: string, label: string) =>
    z.object({
        [name]: z.preprocess(
            parsePenger,
            z
                .number({
                    invalid_type_error: `${label} må være et tall`,
                    required_error: `${label} er påkrevd`,
                })
                .int(`${label} må være et heltall`)
                .min(1, `${label} må være minst 1 kr`),
        ),
    });

type Schema = Record<string, string>;

function KronerInput(props: Props) {
    const { settVerdi, verdi, ...restProps } = props;
    const name = restProps.name;
    const label = String(restProps.label);

    const zodSchema = React.useMemo(() => schema(name, label), [name, label]);

    const { formState, control, reset } = useForm<Schema>({
        mode: 'onBlur',
        resolver: zodResolver(zodSchema),
        values: { [name]: formaterPenger(verdi) ?? '' },
        resetOptions: { keepDirtyValues: true },
    });

    const { field } = useController({ control, name });

    const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const rawValue = e.target.value;
        field.onChange(rawValue);
        const { success, data } = zodSchema.safeParse({ [name]: rawValue });
        settVerdi(success ? data[name] : undefined);
    };

    const onBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
        const belop = formaterPenger(e.target.value) ?? '';
        field.onChange(belop);
        reset({ [name]: belop });
        field.onBlur();
        restProps.onBlur?.(e);
    };

    return (
        <TextField
            {...restProps}
            {...field}
            error={formState.errors[name]?.message ?? restProps.error}
            onChange={onChange}
            onBlur={onBlur}
            inputMode="numeric"
            type="text"
            autoComplete="off"
        />
    );
}

export default KronerInput;
