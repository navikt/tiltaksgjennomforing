import React, { useEffect, useState } from 'react';
import { Alert, Heading, TextField } from '@navikt/ds-react';
import { formaterNorskeTall, parseNorskeTallFraInput } from '@/utils';
import styles from './ObligatoriskTjenestepensjon.module.less';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';

type ObligatoriskTjenestepensjonProps = {
    sats?: number;
    onChange: (sats?: number) => void;
};

const OTP_TERSKEL = 25;

const parseOgValider = (value: string): { tall?: number; feil?: string } => {
    if (!value.trim()) return {};
    const tall = parseNorskeTallFraInput(value);
    if (tall === undefined || isNaN(tall)) return { feil: 'OTP må være et tall' };
    if (tall < 0) return { feil: 'Kan ikke være negativ' };
    if (tall > 30) return { feil: 'Kan ikke være mer enn 30 %' };
    return { tall };
};

const formatertSats = (sats: number | undefined) =>
    formaterNorskeTall(sats !== undefined ? sats * 100 : undefined) ?? '';

const ObligatoriskTjenestepensjon: React.FC<ObligatoriskTjenestepensjonProps> = ({ sats, onChange }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [rawValue, setRawValue] = useState(() => formatertSats(sats));

    useEffect(() => {
        if (!isFocused) setRawValue(formatertSats(sats));
    }, [sats, isFocused]);

    const { tall, feil } = parseOgValider(rawValue);

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const raw = e.target.value.replaceAll('%', '').trim();
        setRawValue(raw);
        const { tall } = parseOgValider(raw);
        onChange(tall !== undefined ? tall / 100 : undefined);
    };

    const displayValue = !isFocused && !feil && rawValue ? rawValue + ' %' : rawValue;

    return (
        <>
            <TextField
                name="sats"
                className={styles.beregningInput}
                error={feil}
                label="Obligatorisk tjenestepensjon (OTP)"
                description="OTP slik den fremgår i den ansattes pensjonsordning hos arbeidsgivers pensjonsleverandør"
                onChange={handleChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                inputMode="decimal"
                autoComplete="off"
                value={displayValue}
            />
            {(tall ?? 0) > OTP_TERSKEL && (
                <>
                    <VerticalSpacer rem={1} />
                    <Alert variant="warning" size="small">
                        <Heading size="xsmall">Kontroller at obligatorisk tjenestepensjon er korrekt</Heading>
                        Obligatorisk tjenestepensjon er svært sjeldent høyere enn 25%
                    </Alert>
                </>
            )}
        </>
    );
};

export default ObligatoriskTjenestepensjon;
