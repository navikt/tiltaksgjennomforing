import { Hovedknapp } from 'nav-frontend-knapper';
import * as React from 'react';
import { Sidetittel } from 'nav-frontend-typografi';
import { Innloggingskilde } from './useInnlogget';
import Banner from '../komponenter/Banner/Banner';
import './Innloggingsside.less';
import Veilederpanel from 'nav-frontend-veilederpanel';
import { ReactComponent as Veileder } from './veileder.svg';

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
        <>
            <Banner tekst="Tiltaksgjennomføring" />
            <div className="innloggingsside">
                <Sidetittel className="innloggingsside__sidetittel">
                    Dine tiltak på ett sted
                </Sidetittel>
                <div className="innloggingsside__infotekst">
                    <Veilederpanel type={'plakat'} kompakt svg={<Veileder />}>
                        <p>
                            Dette er en digital avtale som skal brukes av
                            deltaker, arbeidsgiver og NAV.
                        </p>
                        <p>
                            For å se avtalene du er en del av må du først logge
                            på.
                        </p>
                    </Veilederpanel>
                </div>
                {logginnknapper}
            </div>
        </>
    );
};

export default Innloggingside;
