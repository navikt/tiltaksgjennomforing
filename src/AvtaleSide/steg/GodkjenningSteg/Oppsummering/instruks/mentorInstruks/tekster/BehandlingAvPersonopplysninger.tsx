import IkonTekstRad from '@/komponenter/EkspanderbartPanelRad/IkonTekstRad';
import Passport from '@/assets/ikoner/passport.svg?react';
import EksternLenke from '@/komponenter/navigation/EksternLenke';

const BehandlingAvPersonopplysninger = () => {
    return (
        <IkonTekstRad
            svgIkon={<Passport width="2.25rem" height="2.25rem" />}
            headerTekst={{ tekst: 'Behandling av personopplysninger' }}
        >
            <p>Du kan ikke sende taushetsbelagte og sensitive personopplysninger til NAV på usikret epost.</p>
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
