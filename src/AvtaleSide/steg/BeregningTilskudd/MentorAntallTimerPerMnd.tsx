import React from 'react';
import * as z from 'zod';
import { Alert, Heading, TextField } from '@navikt/ds-react';
import { useController, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import styles from './MentorAntallTimerPerMnd.module.less';
import { formaterNorskeTallFraInput, parseNorskeTallFraInput } from '@/utils';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';

interface Props {
    verdi?: number;
    settVerdi: (verdi?: number) => void;
}

const ANTALL_TIMER_NORMAL_ARBEIDSUKE = 40; // https://www.arbeidstilsynet.no/arbeidstid-og-organisering/arbeidstid/
const NORMAL_ARBEIDSTID_PER_MND = (ANTALL_TIMER_NORMAL_ARBEIDSUKE * 52) / 12;

const schema = z.object({
    mentorAntallTimerPerMnd: z.preprocess(
        parseNorskeTallFraInput,
        z
            .number({
                invalid_type_error: 'Antall timer må være et tall',
                required_error: 'Antall timer er påkrevd',
            })
            .int('Antall timer må være et heltall')
            .min(1, 'Antall timer må være større enn 0')
            .max(999, 'Antall timer kan ikke overstige 999 timer'),
    ),
});

type Schema = { mentorAntallTimerPerMnd: string };

function MentorAntallTimerPerMnd(props: Props) {
    const { settVerdi, verdi } = props;

    const { formState, control } = useForm<Schema>({
        mode: 'onBlur',
        resolver: zodResolver(schema),
    });

    const { field } = useController({
        control,
        name: 'mentorAntallTimerPerMnd',
        defaultValue: formaterNorskeTallFraInput(verdi?.toString() ?? ''),
    });

    const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const mentorAntallTimerPerMnd = e.target.value;
        field.onChange(mentorAntallTimerPerMnd);

        const { success, data } = schema.safeParse({ mentorAntallTimerPerMnd });
        settVerdi(success ? data?.mentorAntallTimerPerMnd : undefined);
    };

    const value = parseNorskeTallFraInput(field.value);

    return (
        <>
            <TextField
                className={styles.antallTimerInput}
                {...field}
                error={formState.errors.mentorAntallTimerPerMnd?.message}
                label="Antall timer med mentor per måned"
                onChange={onChange}
                type="tel"
                description="Arbeidsgiver er pliktig til å kontakte Nav for å få oppdatert avtalen dersom behovet for antall timer avviker fra det som er avtalt."
            />
            {(value ?? 0) > NORMAL_ARBEIDSTID_PER_MND && (
                <>
                    <VerticalSpacer rem={0.5} />
                    <Alert variant="warning" size="small">
                        <Heading size="xsmall">Kontroller at antall timer er korrekt.</Heading>
                        Antall timer overstiger normal arbeidstid per måned.
                    </Alert>
                </>
            )}
        </>
    );
}

export default MentorAntallTimerPerMnd;
