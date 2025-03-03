import React from 'react';
import { Alert, Heading, Loader } from '@navikt/ds-react';
import { useAvtaleKreverAktsomhet } from '@/services/use-rest';
import { useParams } from 'react-router-dom';

interface props {
    avtaleId?: string;
}

const HemmeligAdresseVarsel = () => {
    const { avtaleId } = useParams<{ avtaleId: string }>();
    const { data: avtaleKreverAktsomhet } = useAvtaleKreverAktsomhet(avtaleId);

   if (!avtaleKreverAktsomhet) {
       return null;
   }

    return (
        <Alert variant={'warning'}>
            <Heading spacing size="small" level="3">
                Hemmelig adresse
            </Heading>
            Denne personen har hemmelig adresse og du må derfor utvise aktsomhet.
        </Alert>
    );
};
export default HemmeligAdresseVarsel;
