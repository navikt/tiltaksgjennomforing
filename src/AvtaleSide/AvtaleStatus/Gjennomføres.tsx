import StatusPanel from '@/AvtaleSide/AvtaleStatus/StatusPanel';
import { formaterDato, NORSK_DATO_FORMAT_FULL } from '@/utils/datoUtils';
import { BodyShort } from '@navikt/ds-react';
import { FunctionComponent } from 'react';

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
                    Avtale ble inngått {formaterDato(avtaleInngått!, NORSK_DATO_FORMAT_FULL)}. Tiltaket startet{' '}
                    {formaterDato(startDato!, NORSK_DATO_FORMAT_FULL)}.
                </BodyShort>
            }
        />
    );
};

export default Gjennomføres;
