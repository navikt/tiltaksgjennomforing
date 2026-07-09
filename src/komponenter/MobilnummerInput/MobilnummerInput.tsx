import React from 'react';
import { Alert } from '@navikt/ds-react';
import classNames from 'classnames';

import TelefonnummerInput, { Props as TelefonnummerInputProps } from '@/komponenter/form/TelefonnummerInput';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { NORSK_MOBILNUMMER_REGEX, NORSK_TELEFONNUMMER_REGEX } from '@/utils';
import { useAvtale } from '@/AvtaleProvider';

import styles from './MobilnummerInput.module.less';

type Props = TelefonnummerInputProps;

const TILTAK_MED_MANUELL_REFUSJON = [
    'MIDLERTIDIG_LONNSTILSKUDD',
    'VARIG_LONNSTILSKUDD',
    'FIREARIG_LONNSTILSKUDD',
    'SOMMERJOBB',
];

function MobilnummerInput(props: Props) {
    const { verdi, ...restProps } = props;
    const {
        avtale: { tiltakstype },
    } = useAvtale();

    return (
        <div className={styles.telefonnummerInputContainer}>
            <TelefonnummerInput
                {...props}
                verdi={verdi}
                className={classNames(styles.telefonnummerInput, restProps.className)}
            />
            {verdi && NORSK_TELEFONNUMMER_REGEX.test(verdi) && !NORSK_MOBILNUMMER_REGEX.test(verdi) && (
                <>
                    <VerticalSpacer rem={1} />
                    <Alert variant="warning" size="small">
                        Det anbefales å bruke et mobilnummer. Vi bruker varsling på SMS for å opplyse om status på
                        avtalen
                        {TILTAK_MED_MANUELL_REFUSJON.includes(tiltakstype) &&
                            ' og frister på når refusjon må sendes inn'}
                        .
                    </Alert>
                </>
            )}
        </div>
    );
}

export default MobilnummerInput;
