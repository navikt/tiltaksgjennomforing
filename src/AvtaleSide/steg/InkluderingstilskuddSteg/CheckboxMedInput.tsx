import BEMHelper from '@/utils/bem';
import { Checkbox, Input, SkjemaGruppe } from 'nav-frontend-skjema';
import React, { FunctionComponent, useState } from 'react';
import './CheckboxMedInput.less';

const cls = BEMHelper('checkboxMedInput');

interface Props {
    inputLabel: string;
    //settTilskuddsrad: (inkluderingsrad: Inkluderingsrad) => void;
    checkboxLabel: string;
    //ledigIndex: number | undefined;
    //typeTilskudd: Inkluderingstilskuddtyper;
    verdi: number | undefined;
    settVerdi: (verdi: number) => void;
}

const CheckboxMedInput: FunctionComponent<Props> = (props) => {
    const [checked, setChecked] = useState(false);
    // const [tilskuddsverdi, setTilskuddsverdi] = useState<number | undefined>(props.verdi);

    const erKunNummer = (nummer: string): boolean => /^-?\d*\.?\d*$/.test(nummer);

    // const settKostnadsrad = (): void => {
    //     if (erKunNummer(tilskuddsverdi?.toString() ?? '')) {
    //         props.settTilskuddsrad({ beløp: parseInt(tilskuddsverdi?.toString() ?? '', 10), type: props.typeTilskudd });
    //     }
    // };

    // const settVerdi = (beløp: string) => {
    //     if (erKunNummer(beløp.toString())) {
    //         setTilskuddsverdi(parseInt(beløp, 10));
    //     }
    // };

    return (
        <SkjemaGruppe feil={false}>
            <Checkbox
                className={cls.element('checkbox')}
                onClick={() => setChecked(!checked)}
                label={props.checkboxLabel}
            />
            {checked && (
                <Input
                    className={cls.element('input')}
                    label={props.inputLabel}
                    onChange={(event) => {
                        const verdi = parseInt(event.target.value);
                        !isNaN(verdi) && props.settVerdi(verdi);
                    }}
                    value={props.verdi}
                    //onBlur={() => settKostnadsrad()}
                />
            )}
        </SkjemaGruppe>
    );
};

export default CheckboxMedInput;
