import { toNumberOnFocus } from '@/komponenter/form/utils/form-utils';
import useValidering from '@/komponenter/useValidering';
import { TextField, TextFieldProps } from '@navikt/ds-react';
import React from 'react';

const DEFAULT_INPUT_MAX_LENGTH = 524288;

interface FormattedNumberInputProps extends TextFieldProps {
    toFormatted: (value: any) => string;
    validatorer: Array<(value: any) => string | undefined>;
}

/**
 * Testet via: FormattedNumberInput.spec.txs ///
 */
const FormattedNumberInput: React.FunctionComponent<FormattedNumberInputProps> = (props) => {
    const { value, validatorer, toFormatted, onChange, maxLength, max, ...other } = props;
    const [tallVerdi, setVerdi] = React.useState(value);
    const [feil, settFeil, sjekkInputfelt] = useValidering(value, validatorer);

    const maximumLength = maxLength ? maxLength : DEFAULT_INPUT_MAX_LENGTH;
    const onChangeOverride = (event: React.ChangeEvent<HTMLInputElement>) => {
        const originalVerdi = event.target.value.replace(',', '.');
        if (originalVerdi.length === 0) {
            applyOnChange(event, '');
            return;
        }
        const numericValue = parseFloat(originalVerdi);
        const underMax = max ? max >= numericValue : true;
        const erTallInnenforGrense = () => numericValue.toString().length <= maximumLength && underMax;
        if (erTallInnenforGrense()) {
            applyOnChange(event, numericValue.toString());
        } else {
            applyOnChange(event, max + '');
        }
    };

    const applyOnChange = (event: React.ChangeEvent<HTMLInputElement>, targetValue: string) => {
        if (onChange) {
            event.target.value = targetValue;
            onChange(event);
            setVerdi(targetValue);
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
        <TextField
            ref={inputRef}
            error={feil}
            onBlur={onBlur}
            value={tallVerdi || ''}
            maxLength={maxLength}
            max={max}
            onChange={onChangeOverride}
            onFocus={toNumberOnFocus}
            {...other}
        />
    );
};

export default FormattedNumberInput;
