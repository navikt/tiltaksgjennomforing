import React from 'react';
import { Alert, Heading } from '@navikt/ds-react';
import { useAvtaleKreverAktsomhet } from '@/services/use-rest';

import { container } from './HemmeligAdresseVarsel.module.less';
import { Diskresjonskode, Rolle } from '@/types';

interface Props {
    avtaleId: string;
}

export const isSkalViseAdresseVarsel = (rolle: Rolle) => {
    return ['ARBEIDSGIVER', 'BESLUTTER', 'MENTOR', 'VEILEDER'].includes(rolle);
};

const kode6eller7 = (diskresjonskode?: Diskresjonskode) => {
    switch (diskresjonskode) {
        case Diskresjonskode.STRENGT_FORTROLIG_UTLAND:
        case Diskresjonskode.STRENGT_FORTROLIG:
            return ' - Kode 6';
        case Diskresjonskode.FORTROLIG:
            return ' - Kode 7';
        default:
            return '';
    }
};

const HemmeligAdresseVarsel = (props: Props) => {
    const { avtaleId } = props;
    const { data: aktsomhet } = useAvtaleKreverAktsomhet(avtaleId);

    if (!aktsomhet?.kreverAktsomhet) {
        return null;
    }

    return (
        <Alert variant="warning" className={container}>
            <Heading spacing size="small" level="3">
                Hemmelig adresse{kode6eller7(aktsomhet.diskresjonskode)}
            </Heading>
            Denne personen har hemmelig adresse og du må derfor utvise aktsomhet.
        </Alert>
    );
};
export default HemmeligAdresseVarsel;
