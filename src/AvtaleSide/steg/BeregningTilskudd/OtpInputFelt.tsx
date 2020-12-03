import React, { useContext, useState } from 'react';
import { Input, NavFrontendInputProps } from 'nav-frontend-skjema';
import { AvtaleContext } from '@/AvtaleProvider';
import BEMHelper from '@/utils/bem';

interface Props {
    min: number;
    max: number;
    label: string;
    name: string;
    bredde?: 'fullbredde' | 'XXL' | 'XL' | 'L' | 'M' | 'S' | 'XS' | 'XXS';
    onBlur: () => void;
}

const cls = BEMHelper('beregningTilskuddSteg');

const OtpInputFelt: React.FunctionComponent<Props & NavFrontendInputProps> = props => {
    const STANDARD_OTPSATS: string = '2.0';

    const { max, min, onBlur, ...other } = props;
    const context = useContext(AvtaleContext);

    const fjernProsentTegn = (input: string): string => input.split('%')[0];

    const getOtpSats = (): string => (context.avtale.otpSats ? context.avtale.otpSats.toString() : STANDARD_OTPSATS);

    const setInputVerdiLokalt = (): string => {
        const otpSats = parseFloat(getOtpSats());
        if (otpSats && !isNaN(otpSats)) {
            if (otpSats < 1) {
                const konvertertOtpSats = otpSats * 100;
                return konvertertOtpSats.toFixed(2).concat('%');
            }
            return otpSats.toString().concat('%');
        }
        return STANDARD_OTPSATS.concat('%');
    };

    const [inputVerdi, setInputVerdi] = useState<string | undefined>(setInputVerdiLokalt());

    const onInputBlurEvent = (event: React.FocusEvent<HTMLInputElement>) => {
        if (inputVerdi) {
            setInputVerdi(inputVerdi.concat('%'));
        } else if (inputVerdi === '') {
            setInputVerdi(STANDARD_OTPSATS.concat('%'));
        }
        onBlur(event);
    };

    const validerNyProsentSats = (nyProsentSats: string | undefined, minimum: number, maximum: number): boolean => {
        if (nyProsentSats) {
            const verdi = parseFloat(nyProsentSats);
            if (!isNaN(verdi) && verdi >= minimum && verdi <= maximum) {
                return true;
            }
        }
        return false;
    };

    const setInputVerdien = (lokalverdi: string, avtaleverdi: string) => {
        context.settAvtaleVerdier({ otpSats: parseFloat(avtaleverdi) / 100 });
        setInputVerdi(lokalverdi);
    };

    const inputVerdiBleForandretEvent = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const validertInput = matchInputVerdiMedLovligVerdi(fjernProsentTegn(event.target.value));

        if (validertInput && validertInput[0] !== '') {
            const filtrertInputTall = validertInput[0].replace(',', '.');
            if (validerNyProsentSats(filtrertInputTall, min, max)) {
                return setInputVerdien(filtrertInputTall, filtrertInputTall);
            }
            return setInputVerdien(STANDARD_OTPSATS, STANDARD_OTPSATS);
        } else if (event.target.value === '') {
            return setInputVerdien(event.target.value, STANDARD_OTPSATS);
        }
    };

    const matchInputVerdiMedLovligVerdi = (inputVtallet: string): null | string[] => {
        const validereTallMellom0og30 = new RegExp(
            /^(([0-9]{1})|([0-2]{1})([0-9]{1})?|30$)?([,|.]{1})?(([,|.]{1}?)([0-9]{1,2}))?$/g
        );
        return inputVtallet.match(validereTallMellom0og30);
    };

    return (
        <div className={cls.element('otpSats')}>
            <Input
                value={inputVerdi}
                max={max}
                min={min}
                type="text"
                onBlur={onInputBlurEvent}
                placeholder="0 - 30 %"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => inputVerdiBleForandretEvent(event)}
                {...other}
            />
        </div>
    );
};
export default OtpInputFelt;
