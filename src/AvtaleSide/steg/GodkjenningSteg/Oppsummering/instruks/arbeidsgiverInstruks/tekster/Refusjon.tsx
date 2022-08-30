import React, { FunctionComponent } from 'react';
import IkonTekstRad from '@/komponenter/EkspanderbartPanelRad/IkonTekstRad';
import { Money } from '@navikt/ds-icons';
import EksternLenke from '@/komponenter/navigation/EksternLenke';
import { TiltaksType } from '@/types/avtale';

interface Props {
    tiltakstype: TiltaksType;
}

const Refusjon: FunctionComponent<Props> = ({ tiltakstype }) => {
    if (!['MENTOR', 'INKLUDERINGSTILSKUDD'].includes(tiltakstype)) {
        return null;
    }
    return (
        <IkonTekstRad
            svgIkon={<Money width="2.25rem" height="2.25rem" />}
            headerTekst={{ tekst: 'Refusjon', typografiType: 'undertittel' }}
        >
            <p>
                For å få utbetalt pengene må dere sende inn refusjonskrav til NAV etter at tilskuddsperioden er over.
                Refusjonskravet sendes inn på papir. I tillegg til å fylle ut refusjonsskjemaet legger dere ved
                dokumentasjon på de faktiske utgiftene. Refusjonskravet må sendes inn senest to måneder etter at
                tilskuddsperioden er over.
            </p>
            <p>
                {tiltakstype === 'MENTOR' && (
                    <EksternLenke href={'https://www.nav.no/soknader/nb/bedrift/tilskudd-og-tiltak/mentor'}>
                        Refusjonsskjema for mentortilskudd
                    </EksternLenke>
                )}
                {tiltakstype === 'INKLUDERINGSTILSKUDD' && (
                    <EksternLenke href={'https://www.nav.no/soknader/nb/bedrift/refusjoner/inkluderingstilskudd'}>
                        Refusjonsskjema for inkluderingstilskudd
                    </EksternLenke>
                )}
            </p>
        </IkonTekstRad>
    );
};
export default Refusjon;
