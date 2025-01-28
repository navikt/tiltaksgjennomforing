import StatusPanel from '@/AvtaleSide/AvtaleStatus/StatusPanel';
import { formaterDato, NORSK_DATO_FORMAT_FULL } from '@/utils/datoUtils';
import { BodyShort } from '@navikt/ds-react';
import { FunctionComponent } from 'react';

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
                    Tiltaket varte fra {formaterDato(startDato!, NORSK_DATO_FORMAT_FULL)} til{' '}
                    {formaterDato(sluttDato!, NORSK_DATO_FORMAT_FULL)}.
                </BodyShort>
            }
        />
    );
};

export default Avsluttet;
