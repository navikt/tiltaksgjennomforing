import React from 'react';
import { Alert, Heading } from '@navikt/ds-react';
import { useAvtaleKreverAktsomhet } from '@/services/use-rest';
import BEMHelper from '@/utils/bem';
import './hemmeligAdresseVarsel.less';

const cls = BEMHelper('hemmelig-adresse-varsel');

interface props {
    avtaleId: string;
}

const HemmeligAdresseVarsel = ({ avtaleId }: props) => {
    const { data: avtaleKreverAktsomhet } = useAvtaleKreverAktsomhet(avtaleId);

    if (!avtaleKreverAktsomhet) {
        return null;
    }

    return (
        <>
            <Alert variant={'warning'} className={cls.className}>
                <Heading spacing size="small" level="3">
                    Hemmelig adresse
                </Heading>
                Denne personen har hemmelig adresse og du må derfor utvise aktsomhet.
            </Alert>
        </>
    );
};
export default HemmeligAdresseVarsel;
