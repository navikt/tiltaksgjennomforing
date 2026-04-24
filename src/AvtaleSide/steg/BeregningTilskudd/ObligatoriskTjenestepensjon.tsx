import React from 'react';
import ProsentInput from '@/komponenter/form/ProsentInput';
import { formaterNorskeTall, parsProsentFraInput } from '@/utils';
import styles from './ObligatoriskTjenestepensjon.module.less';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { Alert, Heading } from '@navikt/ds-react';

type ObligatoriskTjenestepensjonProps = {
    sats?: number;
    onChange: (sats?: number) => void;
};

const OTP_TERSKEL = 0.25;

const ObligatoriskTjenestepensjon: React.FC<ObligatoriskTjenestepensjonProps> = (
    props: ObligatoriskTjenestepensjonProps,
) => {
    const { sats, onChange } = props;

    const hoyOtp = (sats || 0) > OTP_TERSKEL;

    return (
        <>
            <ProsentInput
                className={styles.beregningInput}
                name="tjenestepensjon"
                label="Obligatorisk tjenestepensjon (OTP)"
                min={0}
                max={30}
                maxLength={4}
                autoComplete="off"
                description="OTP slik den fremgår i den ansattes pensjonsordning hos arbeidsgivers pensjonsleverandør"
                value={sats !== undefined && sats !== null ? formaterNorskeTall(sats * 100) : ''}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    onChange(parsProsentFraInput(event.target.value));
                }}
            />
            {hoyOtp && (
                <>
                    <VerticalSpacer rem={0.5} />
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
