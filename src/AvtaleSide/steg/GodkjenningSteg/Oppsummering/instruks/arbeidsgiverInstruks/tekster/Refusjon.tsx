import IkonTekstRad from '@/komponenter/EkspanderbartPanelRad/IkonTekstRad';
import EksternLenke from '@/komponenter/navigation/EksternLenke';
import { TiltaksType } from '@/types/avtale';
import { WalletIcon } from '@navikt/aksel-icons';
import React, { FunctionComponent } from 'react';

interface Props {
    tiltakstype: TiltaksType;
}

const Refusjon: FunctionComponent<Props> = ({ tiltakstype }) => {
    if (tiltakstype !== 'INKLUDERINGSTILSKUDD') {
        return null;
    }
    return (
        <IkonTekstRad
            svgIkon={<WalletIcon title="Refusjon" />}
            headerTekst={{ tekst: 'Refusjon', headingType: 'small' }}
        >
            <p>
                For å få utbetalt pengene må dere sende inn refusjonskrav til NAV etter at tilskuddsperioden er over.
                Refusjonskravet sendes inn på papir. I tillegg til å fylle ut refusjonsskjemaet legger dere ved
                dokumentasjon på de faktiske utgiftene. Refusjonskravet må sendes inn senest to måneder etter at
                tilskuddsperioden er over.
            </p>
            <p>
                <EksternLenke href="https://www.nav.no/soknader/nb/bedrift/refusjoner/inkluderingstilskudd">
                    Refusjonsskjema for inkluderingstilskudd
                </EksternLenke>
            </p>
        </IkonTekstRad>
    );
};
export default Refusjon;
