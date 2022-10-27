import useValidering from '@/komponenter/useValidering';
import { Button } from '@navikt/ds-react';
import { Search } from '@navikt/ds-icons';
import BEMHelper from '@/utils/bem';
import { Input, InputProps } from 'nav-frontend-skjema';
import React, { FormEvent, FunctionComponent, useState } from 'react';
import './SøkeInput.less';

type Props = InputProps & {
    className: string;
    utførSøk: (søkeord: string) => void;
    valider: (verdi: string) => string | undefined;
    defaultVerdi?: string;
    onChangeCallback?: () => void;
    buttonSpinner?: boolean;
};

export const SøkeInput: FunctionComponent<Props> = (props) => {
    const cls = BEMHelper(props.className);
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
        <div className={cls.className}>
            <Input
                className={cls.element('input-sok')}
                label={props.label}
                placeholder={props.placeholder}
                value={søkeord}
                onChange={onChange}
                onBlur={onBlur}
                onKeyPress={enterKlikk}
                feil={skjemaelementfeil}
            />
            <Button
                className={cls.element('button')}
                icon={<Search />}
                iconPosition="right"
                onClick={utførSøk}
                loading={props.buttonSpinner}
            >
                Søk
            </Button>
        </div>
    );
};
