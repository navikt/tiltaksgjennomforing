import React from 'react';
import { Alert, Heading } from '@navikt/ds-react';

import styles from './ObligatoriskTjenestepensjon.module.less';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import classNames from 'classnames';
import ProsentInput, { Props as ProsentInputProps } from '@/komponenter/form/ProsentInput';

type Props = Omit<ProsentInputProps, 'label' | 'name' | 'description' | 'min' | 'maks' | 'desimaler' | 'prosentType'>;

const OTP_TERSKEL = 0.25;

function ObligatoriskTjenestepensjon(props: Props) {
    const { verdi, ...restProps } = props;

    return (
        <>
            <ProsentInput
                {...props}
                verdi={verdi}
                className={classNames(styles.beregningInput, restProps.className)}
                name="otpSats"
                label="Obligatorisk tjenestepensjon (OTP)"
                description="OTP slik den fremgår i den ansattes pensjonsordning hos arbeidsgivers pensjonsleverandør"
                min={0}
                maks={30}
                desimaler
            />
            {(verdi ?? 0) > OTP_TERSKEL && (
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
}

export default ObligatoriskTjenestepensjon;
