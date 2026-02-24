import React from 'react';
import IkonTekstRad from '@/komponenter/EkspanderbartPanelRad/IkonTekstRad';
import Passport from '@/assets/ikoner/passport.svg?react';
import EksternLenke from '@/komponenter/navigation/EksternLenke';
import { TiltaksType } from '@/types/avtale';

interface Props {
    tiltakstype: TiltaksType;
}

const BehandlingAvPersonopplysninger: React.FC<Props> = ({ tiltakstype }) => {
    if (
        ![
            'SOMMERJOBB',
            'MIDLERTIDIG_LONNSTILSKUDD',
            'VARIG_LONNSTILSKUDD',
            'MENTOR',
            'INKLUDERINGSTILSKUDD',
            'VTAO',
        ].includes(tiltakstype)
    ) {
        return null;
    }
    return (
        <IkonTekstRad
            svgIkon={<Passport width="2.25rem" height="2.25rem" />}
            headerTekst={{ tekst: 'Behandling av personopplysninger' }}
        >
            <p>
                Du kan ikke sende taushetsbelagte og sensitive personopplysninger til NAV på usikret epost. Skal du gi
                beskjed om endringer som har betydning for saken og oppfølgingen din fra NAV, kan du bruke{' '}
                <EksternLenke href="https://www.nav.no/person/dittnav/">Ditt NAV</EksternLenke>
                eller{' '}
                <EksternLenke href="https://www.nav.no/person/kontakt-oss/nb/skriv-til-oss">Skriv til oss</EksternLenke>
                .
            </p>
            <p>Personopplysninger om deg i avtalen lagres i henhold til arkivloven.</p>
            <p>
                <EksternLenke href="https://www.nav.no/personvernerklaering">NAVs personvernerklæring</EksternLenke>{' '}
                forteller mer om hvordan NAV behandler personopplysninger og hvilke rettigheter du har.
            </p>
            <p>12 uker etter avsluttet tiltak vil arbeidsgiver ikke lenger har tilgang til avtalen.</p>
        </IkonTekstRad>
    );
};
export default BehandlingAvPersonopplysninger;
