import React, { PropsWithChildren } from 'react';
import { TextField, TextFieldProps } from '@navikt/ds-react';
import {
    isEmptyValue,
    toNumeric,
    sanitizeNumericInput,
    parseNumericCandidate,
    clamp,
} from '@/komponenter/form/utils/form-utils';
import useValidering from '@/komponenter/useValidering';
import { erNil } from '@/utils/predicates';

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
const FormattedNumberInput: React.FC<PropsWithChildren<FormattedNumberInputProps>> = (props) => {
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

    const stepProp = Number((other as any)?.step) || 1;
    const wheelStepActive = enableWheelStep && !readOnly;

    const numericMin = toNumeric(min);
    const numericMax = toNumeric(max);

    const [focused, setFocused] = React.useState(false);
    const [draft, setDraft] = React.useState<string | null>(null);
    const [feil, , sjekkInputfelt] = useValidering(value, validatorer);
    const inputRef = React.useRef<HTMLInputElement | null>(null);

    const effectiveMaxLength = maxLength ?? DEFAULT_INPUT_MAX_LENGTH;
    const rawNumber = erNil(value) ? '' : String(value);

    const formatertTall = toFormatted(rawNumber);
    const displayValue = focused
        ? (draft ?? rawNumber)
        : formatertTall === '' && rawNumber !== ''
          ? rawNumber
          : formatertTall;

    const emit = React.useCallback(
        (next: string) => {
            if (!onChange) return;
            onChange({
                target: { value: next, name: (other as any)?.name },
            } as React.ChangeEvent<HTMLInputElement>);
        },
        [onChange, other],
    );

    const handleFocus = () => {
        setDraft(rawNumber);
        setFocused(true);
    };

    const parseCandidate = React.useCallback(
        (s: string): number | undefined => {
            const parsed = parseNumericCandidate(sanitizeNumericInput(s));
            if (parsed === undefined) return undefined;
            if (numericMax !== undefined && parsed > numericMax) return undefined;
            if (numericMin !== undefined && parsed < numericMin) return undefined;
            return parsed;
        },
        [numericMin, numericMax],
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const next = e.target.value;
        if (sanitizeNumericInput(next).length > effectiveMaxLength) return;
        setDraft(next);

        if (next === '') {
            emit('');
            return;
        }

        const parsed = parseCandidate(next);

        if (parsed !== undefined) {
            emit(parsed.toString());
        }
    };

    const handleBlur = () => {
        setFocused(false);
        if (draft !== null) {
            const parsed = parseCandidate(draft);
            if (parsed === undefined) {
                emit('');
            } else {
                emit(String(clamp(parsed, numericMin, numericMax)));
            }
        }
        setDraft(null);
        sjekkInputfelt();
    };

    React.useEffect(() => {
        if (!focused) {
            sjekkInputfelt();
        }
    }, [value, focused, sjekkInputfelt]);

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
            const next = clamp(current + dir * stepProp, numericMin, numericMax);
            if (next === current) return;

            emit(String(next));
            if (focused) setDraft(String(next));
        };

        el.addEventListener('wheel', onWheel, { passive: false });
        return () => el.removeEventListener('wheel', onWheel);
    }, [wheelStepActive, value, numericMin, numericMax, focused, stepProp, emit]);

    return (
        <TextField
            ref={inputRef}
            type={showSpinners && focused && wheelStepActive ? 'number' : 'text'}
            inputMode="decimal"
            error={feil}
            onBlur={handleBlur}
            value={displayValue}
            maxLength={effectiveMaxLength}
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
