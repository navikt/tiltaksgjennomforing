import React, { useContext, useEffect, useState } from 'react';
import { Input } from 'nav-frontend-skjema';
import { AvtaleContext } from '@/AvtaleProvider';
import BEMHelper from '@/utils/bem';

interface Props {
    min: number;
    max: number;
    label: string;
    name: string;
    bredde?: 'fullbredde' | 'XXL' | 'XL' | 'L' | 'M' | 'S' | 'XS' | 'XXS';
}

const cls = BEMHelper('beregningTilskuddSteg');

const OtpInputFelt: React.FunctionComponent<Props> = props => {
    const STANDARD_OTPSATS: string = '2.0';

    const { max, min, ...other } = props;
    const context = useContext(AvtaleContext);

    const fjernProsentTegn = (input: string): string => input.split('%')[0];

    const getOtpSats = (): string => (context.avtale.otpSats ? context.avtale.otpSats.toString() : STANDARD_OTPSATS);

    const setInputVerdien = (): string => {
        const otpSats = parseFloat(getOtpSats());
        if (otpSats && !isNaN(otpSats)) {
            if (otpSats < 1) {
                const konvertertOtpSats = otpSats * 100;
                return konvertertOtpSats.toString().concat('%');
            }
            return otpSats.toString().concat('%');
        }
        return STANDARD_OTPSATS.concat('%');
    };

    const [inputVerdi, setInputVerdi] = useState<string | undefined>(setInputVerdien());

    useEffect(() => {
        context.lagreAvtale();
    }, [context.avtale.otpSats]);

    const getInputVerdi = (): string => {
        if (inputVerdi) {
            return fjernProsentTegn(inputVerdi);
        }
        return STANDARD_OTPSATS;
    };

    const onInputBlurEvent = (): void => {
        const nyProsentVerdi: number = validerNyProsentSats(getInputVerdi(), min, max);
        context.settAvtaleVerdier({ otpSats: nyProsentVerdi });
        setInputVerdi(nyProsentVerdi.toString().concat('%'));
    };

    const validerNyProsentSats = (nyProsentSats: string | undefined, minimum: number, maximum: number): number => {
        if (nyProsentSats) {
            const verdi = parseFloat(nyProsentSats);
            if (!isNaN(verdi) && verdi >= minimum && verdi <= maximum) {
                return verdi;
            }
        }
        return parseFloat(STANDARD_OTPSATS);
    };

    const inputVerdiBleForandretEvent = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const validertInput = matchInputVerdiMedLovligVerdi(fjernProsentTegn(event.target.value));
        if (validertInput) {
            setInputVerdi(validertInput[0].replace(',', '.'));
        }
    };

    const matchInputVerdiMedLovligVerdi = (inputVtallet: string): null | string[] => {
        return inputVtallet.match(/^(([0-9]{1})|([0-2]{1})([0-9]{1})?|30$)?([,|\.]{1})?(([,|\.]{1}?)([0-9]{1,2}))?$/g);
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
