import { ReactComponent as Koffert } from '@/assets/ikoner/koffert.svg';
import { FeilVarselContext } from '@/FeilVarselProvider';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { useAsyncError } from '@/komponenter/useError';
import { pathTilInformasjonssideUinnlogget } from '@/paths';
import { INNLOGGET_PART } from '@/RedirectEtterLogin';
import { hentInnloggetBruker } from '@/services/rest-service';
import { AutentiseringError, FeilkodeError } from '@/types/errors';
import { Innloggingskilde } from '@/types/innlogget-bruker';
import { handterFeil } from '@/utils/apiFeilUtils';
import BEMHelper from '@/utils/bem';
import { Next } from '@navikt/ds-icons';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Ingress, Heading, BodyShort } from '@navikt/ds-react';
import React, { useContext } from 'react';
import { useCookies } from 'react-cookie';
import MediaQuery from 'react-responsive';
import { Link } from 'react-router-dom';
import './Innloggingsside.less';

const cls = BEMHelper('innloggingsside');

const Innloggingsside = (props: { innloggingskilder: Innloggingskilde[] }) => {
    const throwError = useAsyncError();
    const [, setCookie] = useCookies();
    const visFeilmelding = useContext(FeilVarselContext);
    console.log('innloggingskilder', props.innloggingskilder);

    const loginKlikk = async (innloggingskilde: Innloggingskilde) => {
        try {
            await hentInnloggetBruker();
            window.location.reload();
        } catch (err) {
            if (err instanceof FeilkodeError) {
                handterFeil(err, visFeilmelding, 'Kunne ikke logge på grunn av uventet feil');
            } else if (err instanceof AutentiseringError) {
                window.location.href = innloggingskilde.url;
            } else {
                throwError(err);
            }
        }
    };

    const logginnknapper = props.innloggingskilder.map((innlogginskilde: Innloggingskilde) => (
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
                <Koffert role="presentation" focusable="false" className={cls.element('koffertikon')} />
                <MediaQuery minWidth={576}>
                    <VerticalSpacer rem={2} />
                </MediaQuery>
                <div className={cls.element('tittel')}>
                    <Heading size="xlarge">Tiltaksgjennomføring</Heading>
                </div>
                <VerticalSpacer rem={2} />
                <div className={cls.element('infotekst')}>
                    <Ingress>
                        Dette er en digital avtale som skal brukes av deltakeren, arbeidsgiveren, mentoren og NAV. For å
                        se avtalene du er en del av må du først logge på.
                    </Ingress>
                    <VerticalSpacer rem={2} />
                    <BodyShort size="small">
                        <Link to={pathTilInformasjonssideUinnlogget} className="lenke">
                            Her kan du lese mer om hvordan løsningen fungerer
                            <Next style={{ display: 'inline-block' }} />
                        </Link>
                    </BodyShort>
                </div>
                <VerticalSpacer rem={2} />
                <Heading size="medium">Logg inn</Heading>
                <VerticalSpacer rem={2} />
                <div className={'innloggingsside__loginKnapper'}>{logginnknapper}</div>
            </div>
        </div>
    );
};

export default Innloggingsside;
