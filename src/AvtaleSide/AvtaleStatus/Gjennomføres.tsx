import { ReactComponent as CheckIkon } from '@/assets/ikoner/check.svg';
import StatusPanel from '@/AvtaleSide/AvtaleStatus/StatusPanel';
import { Avtale } from '@/types/avtale';
import { formatterDato, NORSK_DATO_FORMAT } from '@/utils/datoUtils';
import { Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';

interface Props {
    avtale: Avtale;
}

const Gjennomføres: FunctionComponent<Props> = ({ avtale }) => {
    return (
        <StatusPanel
            ikon={CheckIkon}
            header="Tiltaket gjennomføres"
            body={
                <Normaltekst>
                    Avtale ble inngått {formatterDato(avtale.avtaleInngått!, NORSK_DATO_FORMAT)}. Tiltaket startet{' '}
                    {formatterDato(avtale.gjeldendeInnhold.startDato!, NORSK_DATO_FORMAT)}.
                </Normaltekst>
            }
        />
    );
};

export default Gjennomføres;
