import StatusPanel from '@/AvtaleSide/AvtaleStatus/StatusPanel';
import { formaterDato, NORSK_DATO_FORMAT_FULL } from '@/utils/datoUtils';
import { BodyShort } from '@navikt/ds-react';
import { FunctionComponent } from 'react';

interface Props {
    startDato: string;
}

const KlarForOppstart: FunctionComponent<Props> = ({ startDato }) => {
    return (
        <StatusPanel
            header="Avtalen er ferdig utfylt og godkjent av NAV"
            body={
                <BodyShort size="small">Tiltaket starter {formaterDato(startDato, NORSK_DATO_FORMAT_FULL)}.</BodyShort>
            }
        />
    );
};

export default KlarForOppstart;
