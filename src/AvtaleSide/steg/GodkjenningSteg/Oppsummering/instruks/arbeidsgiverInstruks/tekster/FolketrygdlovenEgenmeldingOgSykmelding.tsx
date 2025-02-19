import React, { FunctionComponent } from 'react';
import IkonTekstRad from '@/komponenter/EkspanderbartPanelRad/IkonTekstRad';
import { Bandage } from '@navikt/ds-icons';
import { TiltaksType } from '@/types/avtale';

interface Props {
    tiltakstype: TiltaksType;
}

const FolketrygdlovenEgenmeldingOgSykmelding: FunctionComponent<Props> = ({ tiltakstype }) => {
    if (
        !['MIDLERTIDIG_LONNSTILSKUDD', 'VARIG_LONNSTILSKUDD', 'ARBEIDSTRENING', 'SOMMERJOBB', 'VTAO'].includes(
            tiltakstype,
        )
    ) {
        return null;
    }
    return (
        <IkonTekstRad
            svgIkon={<Bandage width="2.25rem" height="2.25rem" />}
            headerTekst={{
                tekst: 'Folketrygdloven: egenmelding og sykmelding',
                headingType: 'small',
            }}
        >
            <p>
                Folketrygdlovens regler følges når det gjelder bruk av egenmelding og sykmelding for egen og barns
                sykdom.
            </p>
        </IkonTekstRad>
    );
};
export default FolketrygdlovenEgenmeldingOgSykmelding;
