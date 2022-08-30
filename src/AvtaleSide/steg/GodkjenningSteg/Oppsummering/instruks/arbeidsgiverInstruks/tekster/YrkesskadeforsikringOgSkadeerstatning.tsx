import React, { FunctionComponent } from 'react';
import IkonTekstRad from '@/komponenter/EkspanderbartPanelRad/IkonTekstRad';
import { SocialAid } from '@navikt/ds-icons';
import EksternLenke from '@/komponenter/navigation/EksternLenke';
import { TiltaksType } from '@/types/avtale';

interface Props {
    tiltakstype: TiltaksType;
}

const YrkesskadeforsikringOgSkadeerstatning: FunctionComponent<Props> = ({ tiltakstype }) => {
    if (!['MIDLERTIDIG_LONNSTILSKUDD', 'VARIG_LONNSTILSKUDD', 'ARBEIDSTRENING', 'SOMMERJOBB'].includes(tiltakstype)) {
        return null;
    }
    return (
        <IkonTekstRad
            svgIkon={<SocialAid width="2.25rem" height="2.25rem" />}
            headerTekst={{
                tekst: 'Yrkesskadeforsikring og skadeerstatning',
                typografiType: 'undertittel',
            }}
        >
            <p>
                Dere er ansvarlig dersom deltakeren skader seg på jobb. Du kan søke om inkluderingstilskudd for å dekke
                utgiftene dere har til forsikringen.{' '}
                <EksternLenke href="https://lovdata.no/dokument/NL/lov/1989-06-16-65">
                    Les mer om yrkesskadeforsikring her
                </EksternLenke>
            </p>
            <p>
                Dere er etter{' '}
                <EksternLenke href="https://lovdata.no/dokument/NL/lov/1969-06-13-26">
                    lov om skadeserstatning
                </EksternLenke>{' '}
                ansvarlig for skade som deltakeren gjør forsettlig eller uaktsomt.{' '}
            </p>
        </IkonTekstRad>
    );
};
export default YrkesskadeforsikringOgSkadeerstatning;
