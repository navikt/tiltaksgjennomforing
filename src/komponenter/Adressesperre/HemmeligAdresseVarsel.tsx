import React from 'react';
import { Alert, Heading } from '@navikt/ds-react';
import { Rolle } from '@/types/innlogget-bruker';
import { useAvtaleKreverAktsomhet } from '@/services/use-rest';
import { useInnloggetBruker } from '@/InnloggingBoundary/InnloggingBoundary';

import { container } from './HemmeligAdresseVarsel.module.less';
import { Diskresjonskode } from '@/types';

interface props {
    avtaleId: string;
}

const ROLLER_SOM_KREVER_KONTROLL: Rolle[] = ['VEILEDER'];

const kode6eller7 = (diskresjonskode?: Diskresjonskode) => {
    switch (diskresjonskode) {
        case Diskresjonskode.STRENGT_FORTROLIG_UTLAND:
        case Diskresjonskode.STRENGT_FORTROLIG:
            return '- Kode 6';
        case Diskresjonskode.FORTROLIG:
            return '- Kode 7';
        default:
            return '';
    }
};

const HemmeligAdresseVarsel = ({ avtaleId }: props) => {
    const { rolle } = useInnloggetBruker();
    const isKreverKontroll = ROLLER_SOM_KREVER_KONTROLL.includes(rolle);
    const { data: aktsomhet } = useAvtaleKreverAktsomhet(isKreverKontroll ? avtaleId : undefined);

    if (!aktsomhet || !aktsomhet.kreverAktsomhet) {
        return null;
    }

    return (
        <Alert variant={'warning'} className={container}>
            <Heading spacing size="small" level="3">
                Hemmelig adresse {kode6eller7(aktsomhet.diskresjonskode)}
            </Heading>
            Denne personen har hemmelig adresse og du må derfor utvise aktsomhet.
        </Alert>
    );
};
export default HemmeligAdresseVarsel;
