import React from 'react';
import * as z from 'zod';
import { TextField, TextFieldProps } from '@navikt/ds-react';
import { useController, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { formaterProsent, parseProsent } from '@/utils';

export interface Props extends TextFieldProps {
    name: string;
    verdi?: number;
    settVerdi: (verdi?: number) => void;
    min?: number;
    maks?: number;
    desimaler?: boolean;
    prosentType?: 'desimalbrøk' | 'heltall';
}

const schema = (name: string, label: string, min: number, maks: number, desimaler: boolean) => {
    const validering = z
        .number({
            invalid_type_error: `${label} må være et tall`,
            required_error: `${label} er påkrevd`,
        })
        .min(min, `${label} kan ikke være mindre enn ${min}\u00A0%`)
        .max(maks, `${label} kan ikke være større enn ${maks}\u00A0%`);

    return z.object({
        [name]: z.preprocess(
            (v) => parseProsent(v),
            desimaler
                ? validering.multipleOf(0.01, `${label} kan maks ha 2 desimaler`)
                : validering.int(`${label} må være et heltall`),
        ),
    });
};

type Schema = Record<string, string>;

function ProsentInput(props: Props) {
    const {
        settVerdi,
        verdi,
        min = 0,
        maks = 100,
        desimaler = false,
        prosentType = 'desimalbrøk',
        ...restProps
    } = props;
    const name = restProps.name;
    const label = String(restProps.label);

    const zodSchema = React.useMemo(
        () => schema(name, label, min, maks, desimaler),
        [name, label, min, maks, desimaler],
    );

    const { formState, control, reset } = useForm<Schema>({
        mode: 'onBlur',
        resolver: zodResolver(zodSchema),
        values: { [name]: formaterProsent(verdi, prosentType === 'desimalbrøk') ?? '' },
        resetOptions: { keepDirtyValues: true },
    });

    const { field } = useController({ control, name });

    const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const rawValue = e.target.value;
        field.onChange(rawValue);
        const { success, data } = zodSchema.safeParse({ [name]: rawValue });
        settVerdi(success ? parseProsent(data[name], prosentType === 'desimalbrøk') : undefined);
    };

    const onBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
        const belop = formaterProsent(e.target.value) ?? '';
        field.onChange(belop);
        reset({ [name]: belop });
        field.onBlur();
        restProps.onBlur?.(e);
    };

    return (
        <>
            <TextField
                {...restProps}
                {...field}
                error={formState.errors[name]?.message ?? restProps.error}
                onChange={onChange}
                onBlur={onBlur}
                inputMode={desimaler ? 'decimal' : 'numeric'}
                type="text"
                autoComplete="off"
            />
        </>
    );
}

export default ProsentInput;
