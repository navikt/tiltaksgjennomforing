import * as z from 'zod';
import React from 'react';
import { BodyShort, TextField } from '@navikt/ds-react';
import { Money } from '@navikt/ds-icons';
import { useController, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import EksternLenke from '@/komponenter/navigation/EksternLenke';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import { hentKontonummerForArbeidsgiver } from '@/services/rest-service';

import styles from './KidOgKontonummer.module.less';

interface Props {
    avtaleId: string;
    kid?: string;
    kontonummer?: string;
    onChange: (value: { kid?: string; kontonummer?: string }) => void;
    visOverskrift?: boolean;
}

const schema = z.object({
    kid: z
        .string()
        .regex(/^[0-9]*$/, 'KID-nummer kan kun inneholde tall')
        .min(3, 'KID-nummer må være minst 3 tegn')
        .max(25, 'KID-nummer kan maks være 25 tegn')
        .optional()
        .or(z.literal('')),
});

type Schema = { kid: string };

const KidOgKontonummer = (props: Props) => {
    const { avtaleId, kid, kontonummer, onChange, visOverskrift } = props;

    const { control, formState } = useForm<Schema>({
        mode: 'onBlur',
        resolver: zodResolver(schema),
    });

    const { field } = useController({
        control,
        name: 'kid',
        defaultValue: kid || '',
    });

    const onKidChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const arbeidsgiverKid = e.target.value;
        field.onChange(arbeidsgiverKid);

        const { success, data } = schema.safeParse({ kid: arbeidsgiverKid });
        onChange({
            kontonummer,
            kid: success && data?.kid ? data.kid : undefined,
        });
    };

    return (
        <div className={styles.kidOgKontonummer}>
            {visOverskrift && (
                <div className={styles.kidOgKontonummerLabel}>
                    <Money />
                    <BodyShort>
                        <strong>Kontonummer og KID</strong>
                    </BodyShort>
                </div>
            )}
            <div className={styles.kontonummer}>
                <TextField
                    className={styles.kontonummerInput}
                    label="Kontonummer"
                    value={kontonummer}
                    description={
                        <>
                            Hvis kontonummeret ikke stemmer så må det oppdateres hos{' '}
                            <EksternLenke href="https://www.nav.no/arbeidsgiver/endre-kontonummer">Nav.</EksternLenke>
                        </>
                    }
                    size="medium"
                    readOnly
                />
                <LagreKnapp
                    lagre={async () => {
                        const arbeidsgiverKontonummer = await hentKontonummerForArbeidsgiver(avtaleId);
                        onChange({ kontonummer: arbeidsgiverKontonummer, kid });
                    }}
                >
                    Hent kontonummer fra Nav
                </LagreKnapp>
            </div>
            <div className={styles.kid}>
                <TextField
                    {...field}
                    className={styles.kidInput}
                    description="Det er valgfritt å oppgi KID-nummer"
                    error={formState.errors.kid?.message}
                    inputMode="numeric"
                    label="KID-nummer"
                    size="medium"
                    onChange={onKidChange}
                />
            </div>
        </div>
    );
};
export default KidOgKontonummer;
