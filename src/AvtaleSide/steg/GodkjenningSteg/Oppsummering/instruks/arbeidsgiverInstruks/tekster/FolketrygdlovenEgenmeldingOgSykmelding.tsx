import React, { FunctionComponent } from 'react';
import IkonTekstRad from '@/komponenter/EkspanderbartPanelRad/IkonTekstRad';
import { BandageIcon } from '@navikt/aksel-icons';
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
            svgIkon={<BandageIcon title="Folketrygdloven: egenmelding og sykmelding" />}
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
