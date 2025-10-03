import {
    isEmptyValue,
    toNumeric,
    sanitizeNumericInput,
    parseNumericCandidate,
    clamp,
    stepNumber,
} from '@/komponenter/form/utils/form-utils';

import useValidering from '@/komponenter/useValidering';

import { erNil } from '@/utils/predicates';
import { TextField, TextFieldProps } from '@navikt/ds-react';
import React, { PropsWithChildren } from 'react';

const DEFAULT_INPUT_MAX_LENGTH = 524288;

interface FormattedNumberInputProps extends TextFieldProps {
    toFormatted: (value: any) => string;
    validatorer: Array<(value: any) => string | undefined>;
    enableWheelStep?: boolean;
    showSpinners?: boolean;
}

/**
 * Testet via: FormattedNumberInput.spec.txs ///
 */
const FormattedNumberInput: React.FunctionComponent<FormattedNumberInputProps> = (
    props: PropsWithChildren<FormattedNumberInputProps>,
) => {
    const {
        value,
        validatorer,
        toFormatted,
        onChange,
        maxLength,
        max,
        min,
        enableWheelStep = true,
        showSpinners = true,
        readOnly,
        ...other
    } = props;

    const wheelStepActive = enableWheelStep && !readOnly;

    const numericMin = toNumeric(min);
    const numericMax = toNumeric(max);

    const [focused, setFocused] = React.useState(false);
    const [draft, setDraft] = React.useState<string | null>(null);
    const [feil, settFeil, sjekkInputfelt] = useValidering(value, validatorer);
    const inputRef = React.useRef<HTMLInputElement | null>(null);

    const maximumLength = maxLength ?? DEFAULT_INPUT_MAX_LENGTH;
    const rawNumber = erNil(value) ? '' : String(value);

    const formatertTall = toFormatted(rawNumber);
    const displayValue = focused
        ? (draft ?? rawNumber)
        : formatertTall === '' && rawNumber !== ''
          ? rawNumber
          : formatertTall;

    const emit = (next: string) => {
        if (!onChange) return;
        onChange({
            target: { value: next, name: (other as any)?.name },
        } as React.ChangeEvent<HTMLInputElement>);
    };

    const handleFocus = () => {
        setDraft(rawNumber);
        setFocused(true);
    };

    const parseCandidate = (s: string): number | undefined => {
        const parsed = parseNumericCandidate(sanitizeNumericInput(s));
        if (parsed === undefined) return undefined;
        if (numericMax !== undefined && parsed > numericMax) return undefined;
        if (numericMin !== undefined && parsed < numericMin) return undefined;
        return parsed;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const next = e.target.value;

        if (sanitizeNumericInput(next).length > maximumLength) return;
        setDraft(next);
        const parsed = parseCandidate(next);

        if (parsed === undefined) return;
        emit(parsed.toString());
    };

    const handleBlur = () => {
        setFocused(false);

        if (draft !== null) {
            const parsed = parseNumericCandidate(sanitizeNumericInput(draft));
            if (parsed === undefined) {
                emit('');
            } else {
                emit(clamp(parsed, numericMin, numericMax).toString());
            }
        }

        setDraft(null);
        settFeil(undefined);
        sjekkInputfelt();
    };

    React.useEffect(() => {
        if (!wheelStepActive) return;
        const el = inputRef.current;
        if (!el) return;

        const onWheel = (ev: WheelEvent) => {
            if (document.activeElement !== el) return;
            ev.preventDefault();

            const current = parseFloat(isEmptyValue(value) ? '0' : String(value));
            if (Number.isNaN(current)) return;

            const dir: 1 | -1 = ev.deltaY < 0 ? 1 : -1;
            const next = stepNumber(current, dir, numericMin, numericMax);

            if (next === current) return;
            emit(String(next));
            if (focused) setDraft(String(next));
        };

        el.addEventListener('wheel', onWheel, { passive: false });
        return () => el.removeEventListener('wheel', onWheel);
    }, [wheelStepActive, value, numericMin, numericMax, focused]);

    return (
        <TextField
            ref={inputRef}
            type={showSpinners && focused && wheelStepActive ? 'number' : 'text'}
            inputMode="decimal"
            error={feil}
            onBlur={handleBlur}
            value={displayValue}
            maxLength={maxLength}
            max={max}
            min={min}
            onChange={handleChange}
            onFocus={handleFocus}
            readOnly={readOnly}
            {...other}
        />
    );
};

export default FormattedNumberInput;
