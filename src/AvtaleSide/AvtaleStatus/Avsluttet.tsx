import StatusPanel from '@/AvtaleSide/AvtaleStatus/StatusPanel';
import { formatterDato, NORSK_DATO_FORMAT } from '@/utils/datoUtils';
import { BodyShort } from '@navikt/ds-react';
import React, { FunctionComponent } from 'react';

interface Props {
    startDato?: string;
    sluttDato?: string;
}

const Avsluttet: FunctionComponent<Props> = ({ startDato, sluttDato }) => {
    return (
        <StatusPanel
            header="Tiltaket er avsluttet"
            body={
                <BodyShort size="small">
                    Tiltaket varte fra {formatterDato(startDato!, NORSK_DATO_FORMAT)} til{' '}
                    {formatterDato(sluttDato!, NORSK_DATO_FORMAT)}.
                </BodyShort>
            }
        />
    );
};

export default Avsluttet;
