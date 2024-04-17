import StatusPanel from '@/AvtaleSide/AvtaleStatus/StatusPanel';
import { Avtale } from '@/types/avtale';
import { formatterDato, NORSK_DATO_FORMAT } from '@/utils/datoUtils';
import { BodyShort } from '@navikt/ds-react';
import React, { FunctionComponent } from 'react';

interface Props {
    avtale: Avtale;
}

const KlarForOppstart: FunctionComponent<Props> = ({ avtale }) => {
    return (
        <StatusPanel
            header="Avtalen er ferdig utfylt og godkjent"
            body={
                <BodyShort size="small">
                    Avtale ble inngått {formatterDato(avtale.avtaleInngått!, NORSK_DATO_FORMAT)}. Tiltaket starter{' '}
                    {formatterDato(avtale.gjeldendeInnhold.startDato!, NORSK_DATO_FORMAT)}.
                </BodyShort>
            }
        />
    );
};

export default KlarForOppstart;
