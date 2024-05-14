import StatusPanel from '@/AvtaleSide/AvtaleStatus/StatusPanel';
import { formatterDato, NORSK_DATO_FORMAT } from '@/utils/datoUtils';
import { BodyShort } from '@navikt/ds-react';
import React, { FunctionComponent } from 'react';

interface Props {
    avtaleInngått?: string;
    startDato?: string;
}

const KlarForOppstart: FunctionComponent<Props> = ({ avtaleInngått, startDato }) => {
    return (
        <StatusPanel
            header="Avtalen er ferdig utfylt og godkjent av NAV"
            body={<BodyShort size="small">Tiltaket starter {formatterDato(startDato!, NORSK_DATO_FORMAT)}.</BodyShort>}
        />
    );
};

export default KlarForOppstart;
