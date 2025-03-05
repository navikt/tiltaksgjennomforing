import React from 'react';
import { Alert, Heading } from '@navikt/ds-react';
import { Rolle } from '@/types/innlogget-bruker';
import { useAvtaleKreverAktsomhet } from '@/services/use-rest';
import { useInnloggetBruker } from '@/InnloggingBoundary/InnloggingBoundary';

import { container } from './HemmeligAdresseVarsel.module.less';

interface props {
    avtaleId: string;
}

const ROLLER_SOM_KREVER_KONTROLL: Rolle[] = ['VEILEDER'];

const HemmeligAdresseVarsel = ({ avtaleId }: props) => {
    const { rolle } = useInnloggetBruker();
    const isKreverKontroll = ROLLER_SOM_KREVER_KONTROLL.includes(rolle);
    const { data: avtaleKreverAktsomhet } = useAvtaleKreverAktsomhet(isKreverKontroll ? avtaleId : undefined);

    if (!avtaleKreverAktsomhet) {
        return null;
    }

    return (
        <Alert variant={'warning'} className={container}>
            <Heading spacing size="small" level="3">
                Hemmelig adresse
            </Heading>
            Denne personen har hemmelig adresse og du må derfor utvise aktsomhet.
        </Alert>
    );
};
export default HemmeligAdresseVarsel;
