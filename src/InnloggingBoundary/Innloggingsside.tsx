import { HoyreChevron } from 'nav-frontend-chevron';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Sidetittel } from 'nav-frontend-typografi';
import * as React from 'react';
import { Link } from 'react-router-dom';
import Banner from '@/komponenter/Banner/Banner';
import { pathTilInformasjonssideUinnlogget } from '@/paths';
import './Innloggingsside.less';
import { ReactComponent as Koffert } from '@/assets/ikoner/koffert.svg';
import { Innloggingskilde } from './useInnlogget';

const Innloggingside = (props: { innloggingskilder: Innloggingskilde[] }) => {
    const logginnknapper = props.innloggingskilder.map(
        (innlogginskilde: Innloggingskilde) => (
            <Hovedknapp
                key={innlogginskilde.url}
                className="innloggingsside__logginnKnapp"
                onClick={() => {
                    window.location.href = innlogginskilde.url;
                }}
            >
                {innlogginskilde.tittel}
            </Hovedknapp>
        )
    );
    return (
        <div className="wrapper">
            <Banner tekst="Tiltaksgjennomføring" />
            <div className="innloggingsside">
                <Koffert className="innloggingsside__koffertikon" />
                <Sidetittel className="innloggingsside__sidetittel">
                    Dine tiltak på ett sted
                </Sidetittel>
                <div className="innloggingsside__infotekst">
                    <p>
                        Dette er en digital avtale som skal brukes av deltaker,
                        arbeidsgiver og NAV.
                    </p>
                    <p>
                        For å se avtalene du er en del av må du først logge på.
                    </p>
                    <p className="innloggingsside__lenke">
                        <Link
                            to={pathTilInformasjonssideUinnlogget}
                            className="lenke"
                        >
                            Her kan du lese mer om hvordan løsningen fungerer
                            <HoyreChevron className="tilbaketiloversikt__chevron" />
                        </Link>
                    </p>
                </div>
                {logginnknapper}
            </div>
        </div>
    );
};

export default Innloggingside;
