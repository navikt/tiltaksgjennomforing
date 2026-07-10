import React, { PropsWithChildren } from 'react';
import { TextField, TextFieldProps } from '@navikt/ds-react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useController, useForm } from 'react-hook-form';

interface Props extends TextFieldProps {
    name: string;
    verdi?: string;
    settVerdi: (verdi?: string) => void;
}

const schema = (name: string, label: string) =>
    z.object({
        [name]: z
            .string({
                invalid_type_error: `${label} må være gyldig`,
                required_error: `${label} er påkrevd`,
            })
            .trim()
            .min(1, { message: `${label} er påkrevd` }),
    });

type Schema = z.infer<ReturnType<typeof schema>>;

const PakrevdInput: React.FunctionComponent<Props> = (props: PropsWithChildren<Props>) => {
    const { settVerdi, verdi, ...restProps } = props;
    const name = restProps.name;
    const label = String(restProps.label);

    const zodSchema = React.useMemo(() => schema(name, label), [name, label]);

    const { formState, control } = useForm<Schema>({
        mode: 'onBlur',
        resolver: zodResolver(zodSchema),
        values: { [name]: verdi ?? '' },
    });

    const { field } = useController({ control, name });

    const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const rawValue = e.target.value;
        field.onChange(rawValue);
        const { success, data } = zodSchema.safeParse({ [name]: rawValue });
        settVerdi(success ? data[name] : undefined);
    };

    return (
        <TextField
            {...restProps}
            {...field}
            error={formState.errors[name]?.message ?? restProps.error}
            onChange={onChange}
            inputMode="text"
            type="text"
        />
    );
};

export default PakrevdInput;
