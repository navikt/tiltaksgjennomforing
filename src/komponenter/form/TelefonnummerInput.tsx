import React from 'react';
import { TextField, TextFieldProps } from '@navikt/ds-react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useController, useForm } from 'react-hook-form';

import { formaterNorskeTelefonnummer, NORSK_TELEFONNUMMER_REGEX, parseNorskeTelefonnummer } from '@/utils';

export interface Props extends TextFieldProps {
    name: string;
    verdi?: string;
    settVerdi: (verdi?: string) => void;
}

const schema = (name: string, label: string) =>
    z.object({
        [name]: z.preprocess(
            parseNorskeTelefonnummer,
            z
                .string({
                    invalid_type_error: `${label} er ugyldig`,
                    required_error: `${label} er påkrevd`,
                })
                .regex(NORSK_TELEFONNUMMER_REGEX, `${label} er ugyldig`),
        ),
    });

type Schema = z.infer<ReturnType<typeof schema>>;

function TelefonnummerInput(props: Props) {
    const { settVerdi, verdi, ...restProps } = props;
    const name = restProps.name;
    const label = String(restProps.label);

    const zodSchema = React.useMemo(() => schema(name, label), [name, label]);

    const { formState, control, reset } = useForm<Schema>({
        mode: 'onBlur',
        resolver: zodResolver(zodSchema),
        values: { [name]: formaterNorskeTelefonnummer(verdi) ?? '' },
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
        const tlf = formaterNorskeTelefonnummer(e.target.value) ?? '';
        field.onChange(tlf);
        reset({ [name]: tlf });
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
            inputMode="tel"
            type="tel"
        />
    );
}

export default TelefonnummerInput;
