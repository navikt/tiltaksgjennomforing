import { Input, NavFrontendInputProps } from 'nav-frontend-skjema';
import React from 'react';
import { fromFormatted, toNumberOnFocus } from '@/komponenter/form/utils/form-utils';
import useValidering from '@/komponenter/useValidering';
import { SkjemaelementFeil } from 'nav-frontend-skjema/lib/skjemaelement-feilmelding';

const DEFAULT_INPUT_MAX_LENGTH = 524288;

interface FormattedNumberInputProps extends NavFrontendInputProps {
    toFormatted: (value: any) => string;
    validatorer: Array<(value: any) => SkjemaelementFeil | undefined>;
}

const FormattedNumberInput: React.FunctionComponent<FormattedNumberInputProps> = props => {
    const { value, validatorer, toFormatted, onChange, maxLength, max, ...other } = props;
    const [feil, settFeil, sjekkInputfelt] = useValidering(value, validatorer);
    const maximumLength = maxLength ? maxLength : DEFAULT_INPUT_MAX_LENGTH;
    const onChangeOverride = (event: React.ChangeEvent<HTMLInputElement>) => {
        let numericValue = 0;
        if (event.target.value !== '') {
            numericValue = parseFloat(fromFormatted(event.target.value));
        }
        const underMax = max ? max >= numericValue : true;
        if (numericValue.toString().length <= maximumLength && underMax) {
            if (onChange !== undefined) {
                onChange(event);
            }
        }
    };

    const onBlur = (event: React.SyntheticEvent<HTMLInputElement>) => {
        settFeil(undefined);
        if (event.target instanceof HTMLInputElement && sjekkInputfelt()) {
            event.target.type = 'text';
            event.target.value = toFormatted(event.target.value);
        }
    };
    const inputRef = (ref: HTMLInputElement | null) => {
        if (ref && document.activeElement !== ref) {
            ref.type = 'text';
            ref.value = toFormatted(ref.value);
        }
    };
    return (
        <Input
            inputRef={inputRef}
            feil={feil}
            onBlur={onBlur}
            value={value || ''}
            maxLength={maxLength}
            max={max}
            onChange={onChangeOverride}
            onFocus={toNumberOnFocus}
            {...other}
        />
    );
};

export default FormattedNumberInput;
