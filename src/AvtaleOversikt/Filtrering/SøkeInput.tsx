import useValidering from '@/komponenter/useValidering';
import BEMHelper from '@/utils/bem';
import { Search } from '@navikt/ds-icons';
import { Button, TextField, TextFieldProps } from '@navikt/ds-react';
import { FormEvent, FunctionComponent, useState } from 'react';
import './SøkeInput.less';

type Props = TextFieldProps & {
    className: string;
    utførsøk: (søkeord: string) => void;
    valider: (verdi: string) => string | undefined;
    defaultverdi?: string;
    onChangeCallback?: () => void;
    buttonSpinner?: boolean;
};

export const SøkeInput: FunctionComponent<Props> = (props) => {
    const cls = BEMHelper(props.className);
    const [søkeord, setSøkeord] = useState<string>(props.defaultverdi || '');
    const [skjemaelementfeil, setSkjemaelementfeil, valider] = useValidering(søkeord, [props.valider]);

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

    console.log('HEPP');

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
