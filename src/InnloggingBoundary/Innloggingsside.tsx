import React, { useContext } from 'react';
import { useCookies } from 'react-cookie';
import MediaQuery from 'react-responsive';
import { Link } from 'react-router-dom';
import { Ingress, Heading, BodyShort, Button } from '@navikt/ds-react';

import './Innloggingsside.less';
import BEMHelper from '@/utils/bem';
import Koffert from '@/assets/ikoner/koffert.svg?react';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { AutentiseringError, FeilkodeError } from '@/types/errors';
import { FeilVarselContext } from '@/FeilVarselProvider';
import { INNLOGGET_PART } from '@/RedirectEtterLogin';
import { Innloggingskilde } from '@/types/innlogget-bruker';
import { Next } from '@navikt/ds-icons';
import { Path } from '@/Router';
import { handterFeil } from '@/utils/apiFeilUtils';
import { hentInnloggetBruker } from '@/services/rest-service';
import { useAsyncError } from '@/komponenter/useError';

const cls = BEMHelper('innloggingsside');

const Innloggingsside = (props: { innloggingskilder: Innloggingskilde[] }) => {
    const throwError = useAsyncError();
    const [, setCookie] = useCookies();
    const visFeilmelding = useContext(FeilVarselContext);
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
        <Button
            key={innlogginskilde.part}
            className="innloggingsside__logginnKnapp"
            onClick={() => {
                setCookie(INNLOGGET_PART, innlogginskilde.part, { path: '/tiltaksgjennomforing' });
                loginKlikk(innlogginskilde);
            }}
        >
            {innlogginskilde.tittel}
        </Button>
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
                        <Link to={Path.OFFENTLIG_INFORMASJONSSIDE} className="lenke">
                            Her kan du lese mer om hvordan løsningen fungerer
                            <Next style={{ display: 'inline-block' }} />
                        </Link>
                    </BodyShort>
                </div>
                <VerticalSpacer rem={2} />
                <Heading level="2" size="medium">
                    Logg inn
                </Heading>
                <VerticalSpacer rem={2} />
                <div className={'innloggingsside__loginKnapper'}>{logginnknapper}</div>
            </div>
        </div>
    );
};

export default Innloggingsside;
