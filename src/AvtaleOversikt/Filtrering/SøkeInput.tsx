import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import useValidering from '@/komponenter/useValidering';
import BEMHelper from '@/utils/bem';
import { Search } from '@navikt/ds-icons';
import { Button } from '@navikt/ds-react';
import { Input, InputProps } from 'nav-frontend-skjema';
import { FormEvent, FunctionComponent, useState } from 'react';
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
                {...props}
                className={cls.element('input-sok')}
                label={props.label}
                placeholder={props.placeholder}
                value={søkeord}
                onChange={onChange}
                onBlur={onBlur}
                onKeyPress={enterKlikk}
                feil={skjemaelementfeil}
            />
            <VerticalSpacer rem={.5}/>
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
