import { Hovedknapp } from 'nav-frontend-knapper';
import * as React from 'react';
import { Sidetittel } from 'nav-frontend-typografi';
import { Innloggingskilde } from './useInnlogget';
import Banner from '../komponenter/Banner/Banner';
import './Innloggingsside.less';
import { ReactComponent as Koffert } from './koffert.svg';
import Lenke from 'nav-frontend-lenker';
import HoyreChevron from 'nav-frontend-chevron/lib/hoyre-chevron';

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
                        <Lenke href="/tiltaksgjennomforing/informasjonsside/uinnlogget">
                            Her kan du lese mer om hvordan løsningen fungerer
                            <HoyreChevron className="tilbaketiloversikt__chevron" />
                        </Lenke>
                    </p>
                </div>
                {logginnknapper}
            </div>
        </div>
    );
};

export default Innloggingside;
