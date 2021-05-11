import React, { FunctionComponent } from 'react';
import { Avtale } from '@/types/avtale';
import StatusPanel from '@/AvtaleSide/NyAvtaleStatus/StatusPanel';
import { Normaltekst } from 'nav-frontend-typografi';
import { formatterDato, NORSK_DATO_FORMAT } from '@/utils/datoUtils';
import { ReactComponent as CheckIkon } from '@/assets/ikoner/check.svg';

interface Props {
    avtale: Avtale;
}

const Gjennomføres: FunctionComponent<Props> = ({ avtale }) => {
    // Når data er migrert skal alltid datoen være avtale.avtaleInngått
    const avtaleInngått = avtale.avtaleInngått || avtale.godkjentAvVeileder;

    return (
        <StatusPanel
            ikon={CheckIkon}
            header="Tiltaket gjennomføres"
            body={
                <Normaltekst>
                    Avtale ble inngått {formatterDato(avtaleInngått!, NORSK_DATO_FORMAT)}. Tiltaket startet{' '}
                    {formatterDato(avtale.startDato!, NORSK_DATO_FORMAT)}.
                </Normaltekst>
            }
        />
    );
};

export default Gjennomføres;
