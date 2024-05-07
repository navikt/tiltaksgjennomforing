import StatusPanel from '@/AvtaleSide/AvtaleStatus/StatusPanel';
import { formatterDato, NORSK_DATO_FORMAT } from '@/utils/datoUtils';
import { BodyShort } from '@navikt/ds-react';
import React, { FunctionComponent } from 'react';

interface Props {
    avtaleInngått?: string;
    startDato?: string;
}

const Gjennomføres: FunctionComponent<Props> = ({ avtaleInngått, startDato }) => {
    return (
        <StatusPanel
            header="Tiltaket gjennomføres"
            body={
                <BodyShort size="small">
                    Avtale ble inngått {formatterDato(avtaleInngått!, NORSK_DATO_FORMAT)}. Tiltaket startet{' '}
                    {formatterDato(startDato!, NORSK_DATO_FORMAT)}.
                </BodyShort>
            }
        />
    );
};

export default Gjennomføres;
