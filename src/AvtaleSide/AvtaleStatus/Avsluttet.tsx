import React, { FunctionComponent } from 'react';
import { ReactComponent as InaktivIkon } from '@/assets/ikoner/inaktiv.svg';
import { Normaltekst } from 'nav-frontend-typografi';
import { formatterDato, NORSK_DATO_FORMAT } from '@/utils/datoUtils';
import StatusPanel from '@/AvtaleSide/AvtaleStatus/StatusPanel';
import { Avtale } from '@/types/avtale';

interface Props {
    avtale: Avtale;
}

const Avsluttet: FunctionComponent<Props> = ({ avtale }) => {
    return (
        <StatusPanel
            ikon={InaktivIkon}
            header="Tiltaket er avsluttet"
            body={
                <Normaltekst>
                    Tiltaket varte fra {formatterDato(avtale.startDato!, NORSK_DATO_FORMAT)} til{' '}
                    {formatterDato(avtale.sluttDato!, NORSK_DATO_FORMAT)}.
                </Normaltekst>
            }
        />
    );
};

export default Avsluttet;
