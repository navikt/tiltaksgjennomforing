import { Checkbox, Input, SkjemaGruppe } from 'nav-frontend-skjema';
import React, { ChangeEvent, FunctionComponent, useState } from 'react';
import BEMHelper from '@/utils/bem';
import './CheckboxMedInput.less';
import { Inkluderingstilskuddtyper } from '@/types/avtale';
import { Inkluderingsrad } from '@/AvtaleSide/steg/InkluderingstilskuddSteg/InkluderingsTilleggsutgifterCheckboxer';

const cls = BEMHelper('checkboxMedInput');

interface Props {
    inputLabel: string;
    settTilskuddsrad: (inkluderingsrad: Inkluderingsrad) => void;
    checkboxLabel: string;
    ledigIndex: number | undefined;
    typeTilskudd: Inkluderingstilskuddtyper;
    verdi: number | undefined;
}

const CheckboxMedInput: FunctionComponent<Props> = ({
    inputLabel,
    settTilskuddsrad,
    checkboxLabel,
    ledigIndex,
    typeTilskudd,
    verdi,
}) => {
    const [checked, setChecked] = useState(false);
    const [tilskuddsverdi, setTilskuddsverdi] = useState<number | undefined>(verdi);

    const erKunNummer = (nummer: string): boolean => /^-?\d*\.?\d*$/.test(nummer);

    const settKostnadsrad = (): void => {
        if (erKunNummer(tilskuddsverdi?.toString() ?? '')) {
            settTilskuddsrad({ beløp: parseInt(tilskuddsverdi?.toString() ?? '', 10), type: typeTilskudd });
        }
    };

    const settVerdi = (beløp: string) => {
        if (erKunNummer(beløp.toString())) {
            setTilskuddsverdi(parseInt(beløp, 10));
        }
    };

    return (
        <SkjemaGruppe feil={false}>
            <Checkbox className={cls.element('checkbox')} onClick={() => setChecked(!checked)} label={checkboxLabel} />
            {checked && (
                <Input
                    className={cls.element('input')}
                    label={inputLabel}
                    disabled={false}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => settVerdi(event.target.value)}
                    value={verdi}
                    onBlur={() => settKostnadsrad()}
                />
            )}
        </SkjemaGruppe>
    );
};

export default CheckboxMedInput;
