import { ReactComponent as Koffert } from '@/assets/ikoner/koffert.svg';
import Banner from '@/komponenter/Banner/Banner';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { pathTilInformasjonssideUinnlogget } from '@/paths';
import { INNLOGGET_PART } from '@/RedirectEtterLogin';
import restService from '@/services/rest-service';
import { AutentiseringError } from '@/types/errors';
import BEMHelper from '@/utils/bem';
import { HoyreChevron } from 'nav-frontend-chevron';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Ingress, Sidetittel, Systemtittel } from 'nav-frontend-typografi';
import * as React from 'react';
import MediaQuery from 'react-responsive';
import { Link } from 'react-router-dom';
import './Innloggingsside.less';
import { Innloggingskilde } from './useInnlogget';

const cls = BEMHelper('innloggingsside');

const Innloggingside = (props: { innloggingskilder: Innloggingskilde[] }) => {
    const loginKlikk = async (innloggingskilde: Innloggingskilde) => {
        try {
            await restService.hentInnloggetBruker();
            window.location.reload();
        } catch (err) {
            if (err instanceof AutentiseringError) {
                window.location.href = innloggingskilde.url;
            }
        }
    };

    const logginnknapper = props.innloggingskilder.map((innlogginskilde: Innloggingskilde) => (
        <Hovedknapp
            key={innlogginskilde.url}
            className="innloggingsside__logginnKnapp"
            onClick={() => {
                sessionStorage.setItem(INNLOGGET_PART, innlogginskilde.part);
                loginKlikk(innlogginskilde);
            }}
        >
            {innlogginskilde.tittel}
        </Hovedknapp>
    ));
    return (
        <div className="wrapper">
            <Banner tekst="Tiltaksgjennomføring" />
            <div className={cls.className}>
                <MediaQuery minWidth={576}>
                    <Koffert className={cls.element('koffertikon')} />
                </MediaQuery>
                <div className={cls.element('tittel')}>
                    <Sidetittel>Dine tiltak på ett sted</Sidetittel>
                </div>
                <div className={cls.element('infotekst')}>
                    <Ingress>
                        <p>Dette er en digital avtale som skal brukes av deltaker, arbeidsgiver og NAV.</p>
                        <p>For å se avtalene du er en del av må du først logge på.</p>
                        <p className={cls.element('lenke')}>
                            <Link to={pathTilInformasjonssideUinnlogget} className="lenke">
                                Her kan du lese mer om hvordan løsningen fungerer
                                <HoyreChevron className="tilbaketiloversikt__chevron" />
                            </Link>
                        </p>
                    </Ingress>
                </div>
                <VerticalSpacer thirtyTwoPx={true} />
                <Systemtittel>Logg inn</Systemtittel>
                <VerticalSpacer thirtyTwoPx={true} />
                <div className={'innloggingsside__loginKnapper'}>{logginnknapper}</div>
            </div>
        </div>
    );
};

export default Innloggingside;
