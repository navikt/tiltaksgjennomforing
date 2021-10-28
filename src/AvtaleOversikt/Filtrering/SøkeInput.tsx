import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import useValidering from '@/komponenter/useValidering';
import { Søkeknapp } from 'nav-frontend-ikonknapper';
import { Input, InputProps } from 'nav-frontend-skjema';
import React, { FormEvent, FunctionComponent, useState } from 'react';

type Props = InputProps & {
    utførSøk: (søkeord: string) => void;
    valider: (verdi: string) => string | undefined;
    defaultVerdi?: string;
};

export const SøkeInput: FunctionComponent<Props> = (props) => {
    const [søkeord, setSøkeord] = useState<string>(props.defaultVerdi || '');
    const [skjemaelementfeil, setSkjemaelementfeil, valider] = useValidering(søkeord, [props.valider]);

    const utførSøk = () => {
        if (valider()) {
            props.utførSøk(søkeord);
        }
    };

    const onBlur = () => {
        valider();
    };

    const onChange = (event: FormEvent<HTMLInputElement>) => {
        setSøkeord(event.currentTarget.value.toUpperCase());
        setSkjemaelementfeil(undefined);
    };

    const enterKlikk = (event: any) => {
        if (event.key === 'Enter') {
            const nyttSøkeord = event.currentTarget.value;
            setSøkeord(nyttSøkeord);
            utførSøk();
        }
    };

    return (
        <>
            <Input
                label={props.label}
                maxLength={props.maxLength}
                placeholder={props.placeholder}
                value={søkeord}
                onChange={onChange}
                onBlur={onBlur}
                onKeyPress={enterKlikk}
                feil={skjemaelementfeil}
            />
            <VerticalSpacer rem={1} />
            <Søkeknapp onClick={utførSøk} />
        </>
    );
};
