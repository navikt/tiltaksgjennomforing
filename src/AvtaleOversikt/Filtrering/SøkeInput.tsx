import useValidering from '@/komponenter/useValidering';
import BEMHelper from '@/utils/bem';
import { Search } from '@navikt/ds-icons';
import { Button, TextField, TextFieldProps } from '@navikt/ds-react';
import { FormEvent, FunctionComponent, useEffect, useState } from 'react';
import './SøkeInput.less';

type Props = TextFieldProps & {
    className: string;
    utførsøk: (søkeord: string) => void;
    valider: (verdi: string) => string | undefined;
    defaultverdi?: string;
    verdi?: string;
    onChangeCallback?: () => void;
    buttonSpinner?: boolean;
};

export const SøkeInput: FunctionComponent<Props> = (props) => {
    const cls = BEMHelper(props.className);
    const [søkeord, setSøkeord] = useState<string>(props.verdi || props.defaultverdi || '');
    const [skjemaelementfeil, setSkjemaelementfeil, valider] = useValidering(søkeord, [props.valider]);

    // Ved å legge inn denne effekten vil vi ha et mellomledd som oppdaterer inputfeltet hvis
    // verdi-prop endrer seg, men komponenten vil ikke være fullstendig "managed" av verdien.
    // Dette gjør vi for at søkeinput skal kunne oppdateres av eksterne endringer feks når man navigerer
    // frem og tilbake i browser-historikk.
    useEffect(() => { setSøkeord(props.verdi || '') }, [props.verdi]);

    const utførSøk = (): void => (valider() ? props.utførsøk(søkeord) : void 0);

    const onBlur = (): boolean => valider();

    const onChange = (event: FormEvent<HTMLInputElement>): void => {
        setSøkeord(event.currentTarget.value.toUpperCase());
        setSkjemaelementfeil(undefined);
        if (props.onChangeCallback) {
            props.onChangeCallback();
        }
    };

    const enterKlikk = (event: any): void => {
        if (event.key === 'Enter') {
            const nyttSøkeord = event.currentTarget.value;
            setSøkeord(nyttSøkeord);
            utførSøk();
        }
    };

    return (
        <div className={cls.className}>
            <TextField
                className={cls.element('input-sok')}
                label={props.label}
                placeholder={props.placeholder}
                value={søkeord}
                onChange={onChange}
                onBlur={onBlur}
                onKeyPress={enterKlikk}
                error={skjemaelementfeil}
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
