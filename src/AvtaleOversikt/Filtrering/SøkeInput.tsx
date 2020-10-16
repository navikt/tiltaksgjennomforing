import * as React from 'react';
import { FormEvent, FunctionComponent, useState } from 'react';
import { Input } from 'nav-frontend-skjema';
import { Søkeknapp } from 'nav-frontend-ikonknapper';
import useValidering from '@/komponenter/useValidering';
import { SkjemaelementFeil } from 'nav-frontend-skjema/lib/skjemaelement-feilmelding';
import { NavFrontendInputProps } from 'nav-frontend-skjema/lib/input';

type Props = NavFrontendInputProps & {
    utførSøk: (søkeord: string) => void;
    valider: (verdi: string) => SkjemaelementFeil | undefined;
};

export const SøkeInput: FunctionComponent<Props> = props => {
    const [søkeord, setSøkeord] = useState<string>('');
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
        setSøkeord(event.currentTarget.value);
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
            {!props.hidden && <Søkeknapp onClick={utførSøk} />}
        </>
    );
};
