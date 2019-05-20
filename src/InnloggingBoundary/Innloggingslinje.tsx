import { Knapp } from 'nav-frontend-knapper';
import { Normaltekst } from 'nav-frontend-typografi';
import * as React from 'react';
import { FunctionComponent } from 'react';
import './Innloggingslinje.less';
import { Link } from 'react-router-dom';
import { pathTilOversikt } from '../paths';
import { InnloggetBruker } from './useInnlogget';
import VenstreChevron from 'nav-frontend-chevron/lib/venstre-chevron';
import BEMHelper from '../utils/bem';
import MediaQuery from 'react-responsive';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';

const cls = BEMHelper('innloggingslinje');

const Innloggingslinje: FunctionComponent<{
    innloggetBruker: InnloggetBruker;
}> = props => {
    const bruker = `Innlogget som:${' '}
                    ${props.innloggetBruker.identifikator}`;

    return (
        <div className={cls.className}>
            <MediaQuery minWidth={577}>
                <div
                    className={
                        window.location.pathname.toString() === '/' ||
                        window.location.pathname.toString() ===
                            '/tiltaksgjennomforing/' ||
                        window.location.pathname.toString() ===
                            '/tiltaksgjennomforing'
                            ? cls.element('hideelement')
                            : cls.element('tilbake')
                    }
                >
                    <Link to={pathTilOversikt}>
                        <Knapp
                            className={cls.element('tilbakeknapp', 'tilbake')}
                            mini={true}
                            aria-label="Gå tilbake til oversikten"
                        >
                            <div className={cls.element('chevron')}>
                                <VenstreChevron />
                            </div>
                            <Normaltekst>Tilbake til oversikt</Normaltekst>
                        </Knapp>
                    </Link>
                </div>
                <Normaltekst className={cls.element('identitet')}>
                    {bruker}
                </Normaltekst>

                <Knapp
                    className="innloggingslinje__loggutknapp"
                    mini={true}
                    onClick={() => {
                        window.location.href = '/tiltaksgjennomforing/logout';
                    }}
                >
                    <Normaltekst>Logg ut</Normaltekst>
                </Knapp>
            </MediaQuery>
            <MediaQuery maxWidth={576}>
                <Ekspanderbartpanel tittel={bruker}>
                    <div className={cls.className}>
                        <div className={cls.element('tilbake')}>
                            <Link to={pathTilOversikt}>
                                <Knapp
                                    style={{ display: 'none !important' }}
                                    className={cls.element(
                                        'tilbakeknapp',
                                        'tilbake'
                                    )}
                                    mini={true}
                                    aria-label="Gå tilbake til oversikten"
                                >
                                    <div className={cls.element('chevron')}>
                                        <VenstreChevron />
                                    </div>
                                    <Normaltekst>
                                        Tilbake til oversikt
                                    </Normaltekst>
                                </Knapp>
                            </Link>
                        </div>
                        <Knapp
                            className="innloggingslinje__loggutknapp"
                            mini={true}
                            onClick={() => {
                                window.location.href =
                                    '/tiltaksgjennomforing/logout';
                            }}
                        >
                            <Normaltekst>Logg ut</Normaltekst>
                        </Knapp>
                    </div>
                </Ekspanderbartpanel>
            </MediaQuery>
        </div>
    );
};
export default Innloggingslinje;
