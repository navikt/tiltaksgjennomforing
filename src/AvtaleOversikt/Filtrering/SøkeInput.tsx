import useValidering from '@/komponenter/useValidering';
import { Button } from '@navikt/ds-react';
import { Search } from '@navikt/ds-icons';
import { Input, InputProps } from 'nav-frontend-skjema';
import React, { FormEvent, FunctionComponent, useState } from 'react';

type Props = InputProps & {
    utførSøk: (søkeord: string) => void;
    valider: (verdi: string) => string | undefined;
    defaultVerdi?: string;
    onChangeCallback?: () => void;
    buttonSpinner?: boolean;
};

export const SøkeInput: FunctionComponent<Props> = (props) => {
    const [søkeord, setSøkeord] = useState<string>(props.defaultVerdi || '');
    const [skjemaelementfeil, setSkjemaelementfeil, valider] = useValidering(søkeord, [props.valider]);

    const utførSøk = () => (valider() ? props.utførSøk(søkeord) : void 0);

    const onBlur = () => valider();

    const onChange = (event: FormEvent<HTMLInputElement>) => {
        setSøkeord(event.currentTarget.value.toUpperCase());
        setSkjemaelementfeil(undefined);
        if (props.onChangeCallback) {
            props.onChangeCallback();
        }
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
            <Button icon={<Search />} iconPosition="right" onClick={utførSøk} loading={props.buttonSpinner}>
                Søk
            </Button>
        </>
    );
};
