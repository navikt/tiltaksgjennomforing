import { ReactComponent as Koffert } from '@/assets/ikoner/koffert.svg';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { useAsyncError } from '@/komponenter/useError';
import { pathTilInformasjonssideUinnlogget } from '@/paths';
import { INNLOGGET_PART } from '@/RedirectEtterLogin';
import { hentInnloggetBruker } from '@/services/rest-service';
import { AutentiseringError } from '@/types/errors';
import { Innloggingskilde } from '@/types/innlogget-bruker';
import BEMHelper from '@/utils/bem';
import { HoyreChevron } from 'nav-frontend-chevron';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Ingress, Normaltekst, Sidetittel, Systemtittel } from 'nav-frontend-typografi';
import * as React from 'react';
import { useContext } from 'react';
import { useCookies } from 'react-cookie';
import MediaQuery from 'react-responsive';
import { Link } from 'react-router-dom';
import './Innloggingsside.less';
import { Feature } from '@/FeatureToggleProvider';
import { FeatureToggleContext } from '@/FeatureToggleProvider';

const cls = BEMHelper('innloggingsside');

const Innloggingsside = (props: { innloggingskilder: Innloggingskilde[] }) => {
    const throwError = useAsyncError();
    const [, setCookie] = useCookies();
    const featureToggleContext = useContext(FeatureToggleContext);
    const viseBeslutterKnappToggle = featureToggleContext[Feature.ViseBeslutterKnapp];

    const loginKlikk = async (innloggingskilde: Innloggingskilde) => {
        try {
            await hentInnloggetBruker();
            window.location.reload();
        } catch (err) {
            if (err instanceof AutentiseringError) {
                window.location.href = innloggingskilde.url;
            } else {
                throwError(err);
            }
        }
    };

    const logginnknapper = props.innloggingskilder
        .filter((innloggetkilde: Innloggingskilde) =>
            viseBeslutterKnappToggle ? true : innloggetkilde.part !== 'BESLUTTER'
        )
        .map((innlogginskilde: Innloggingskilde) => (
            <Hovedknapp
                key={innlogginskilde.part}
                className="innloggingsside__logginnKnapp"
                onClick={() => {
                    setCookie(INNLOGGET_PART, innlogginskilde.part, { path: '/tiltaksgjennomforing' });
                    loginKlikk(innlogginskilde);
                }}
            >
                {innlogginskilde.tittel}
            </Hovedknapp>
        ));

    return (
        <div className="wrapper">
            <div className={cls.className}>
                <Koffert className={cls.element('koffertikon')} />
                <MediaQuery minWidth={576}>
                    <VerticalSpacer thirtyTwoPx={true} />
                </MediaQuery>
                <div className={cls.element('tittel')}>
                    <Sidetittel>Tiltaksgjennomføring</Sidetittel>
                </div>
                <VerticalSpacer thirtyTwoPx={true} />
                <div className={cls.element('infotekst')}>
                    <Ingress>
                        Dette er en digital avtale som skal brukes av deltakeren, arbeidsgiveren og NAV. For å se
                        avtalene du er en del av må du først logge på.
                    </Ingress>
                    <VerticalSpacer rem={2} />
                    <Normaltekst>
                        <Link to={pathTilInformasjonssideUinnlogget} className="lenke">
                            Her kan du lese mer om hvordan løsningen fungerer
                            <HoyreChevron className="tilbaketiloversikt__chevron" />
                        </Link>
                    </Normaltekst>
                </div>
                <VerticalSpacer thirtyTwoPx={true} />
                <Systemtittel>Logg inn</Systemtittel>
                <VerticalSpacer thirtyTwoPx={true} />
                <div className={'innloggingsside__loginKnapper'}>{logginnknapper}</div>
            </div>
        </div>
    );
};

export default Innloggingsside;
