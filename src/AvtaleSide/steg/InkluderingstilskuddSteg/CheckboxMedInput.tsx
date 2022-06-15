import {Checkbox, Input, SkjemaGruppe} from 'nav-frontend-skjema';
import React, {FunctionComponent, useState} from 'react';
import BEMHelper from "@/utils/bem";
import './CheckboxMedInput.less';

const cls = BEMHelper('checkboxMedInput');

interface Props {
    inputLabel : string;
    inputValue: (value:number) => void;
    checkboxLabel: string;
}

const CheckboxMedInput: FunctionComponent<Props> = ({inputLabel,inputValue, checkboxLabel}) => {

    const [checked , setChecked] = useState(false)
    const [value, setValue] = useState()
    /*const [feil, setFeil, sjekkInputfelt] = useValidering(verdi, [
        (verdi) => {
            if (!verdi) {
                return 'Telefonnummer er påkrevd';
            }
        },
        (verdi) => {
            if (verdi > 1136700) {
                return 'Det totale kostnadsoverslaget overskrider det årlige maksimalbeløpet';
            }
        },
    ]);
   // const [kostnadsoverslag, setKostnadsoverslag] = useState<string>("")

   // inputValue(kostnadsoverslag)

    return (
        <Input
            bredde="S"
            label={props.label}
            value={props.verdi || ''}
            feil={feil}
            onChange={(event) => {
                const verdi = event.target.value.replace(/\D/g, '');
                props.settVerdi(verdi);
                setFeil(undefined);
            }}
            onBlur={sjekkInputfelt}
            type="tel"
            maxLength={8}
        />
    );

    const [feil, setFeil, sjekkInputfelt] = useValidering(props.verdi, [
        (verdi) => {
            if (!verdi) {
                return 'Telefonnummer er påkrevd';
            }
        },
        (verdi) => {
            if (verdi && !/^\d{8}$/.test(verdi)) {
                return 'Telefonnummer må bestå av 8 siffer';
            }
        },
    ]);
   */
    return (
        <SkjemaGruppe  feil={false}>
            <Checkbox className={cls.element('checkbox')} onClick={() => setChecked(!checked)}
                label={checkboxLabel}   />
            {checked &&
                <Input className={cls.element('input')} label={inputLabel} value={value} pattern={"[0-9*]"}
                       disabled={false} onBlur={(event) => inputValue(parseFloat(event.target.value))}/>
            }
        </SkjemaGruppe>
    );
};

export default CheckboxMedInput;
