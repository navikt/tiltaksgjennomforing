import { toNumberOnFocus } from '@/komponenter/form/utils/form-utils';
import useValidering from '@/komponenter/useValidering';
import { erNil } from '@/utils/predicates';
import { TextField, TextFieldProps } from '@navikt/ds-react';
import {
    ChangeEvent,
    FunctionComponent,
    PropsWithChildren,
    ReactNode,
    RefObject,
    SyntheticEvent,
    useState,
} from 'react';

const DEFAULT_INPUT_MAX_LENGTH = 524288;

interface FormattedNumberInputProps extends TextFieldProps {
    toFormatted: (value: any) => string;
    validatorer: Array<(value: any) => string | undefined>;
    className?: string;
    feil?: ReactNode | boolean;
    inputClassName?: string;
    inputRef?: ((element: HTMLInputElement | null) => any) | RefObject<HTMLInputElement>;
    description?: ReactNode;
    name?: string;
    mini?: boolean;
}

/**
 * Testet via: FormattedNumberInput.spec.txs ///
 */
const FormattedNumberInput: FunctionComponent<FormattedNumberInputProps> = (
    props: PropsWithChildren<FormattedNumberInputProps>,
) => {
    const { value, validatorer, toFormatted, onChange, maxLength, max, ...other } = props;
    const [tallVerdi, setVerdi] = useState(value);
    const [feil, settFeil, sjekkInputfelt] = useValidering(value, validatorer);

    const maximumLength = maxLength ? maxLength : DEFAULT_INPUT_MAX_LENGTH;
    const onChangeOverride = (event: ChangeEvent<HTMLInputElement>) => {
        const originalVerdi = event.target.value.replace(',', '.');
        if (originalVerdi.length === 0) {
            applyOnChange(event, '');
            return;
        }
        const numericValue = parseFloat(originalVerdi);
        const underMax = max ? Number(max) >= numericValue : true;
        const erTallInnenforGrense = () => numericValue.toString().length <= maximumLength && underMax;
        if (erTallInnenforGrense()) {
            applyOnChange(event, numericValue.toString());
        } else {
            applyOnChange(event, max + '');
        }
    };

    const applyOnChange = (event: ChangeEvent<HTMLInputElement>, targetValue: string) => {
        if (onChange) {
            event.target.value = targetValue;
            onChange(event);
            setVerdi(targetValue);
        }
    };

    const onBlur = (event: SyntheticEvent<HTMLInputElement>) => {
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
            value={erNil(tallVerdi) ? '' : tallVerdi}
            maxLength={maxLength}
            max={max}
            onChange={onChangeOverride}
            onFocus={toNumberOnFocus}
            {...other}
        />
    );
};

export default FormattedNumberInput;
