import { Knapp } from 'nav-frontend-knapper';
import { EtikettLiten, Normaltekst } from 'nav-frontend-typografi';
import * as React from 'react';
import { FunctionComponent } from 'react';
import './Innloggingslinje.less';
import { InnloggetBruker } from './useInnlogget';
import BEMHelper from '../utils/bem';
import MediaQuery from 'react-responsive';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { ReactComponent as NavIkon } from '../assets/ikoner/navikon.svg';

const cls = BEMHelper('innloggingslinje');

const Innloggingslinje: FunctionComponent<{
    innloggetBruker: InnloggetBruker;
}> = props => {
    const bruker = `${props.innloggetBruker.identifikator}`;
    return (
        <div className={cls.className}>
            <MediaQuery minWidth={577}>
                <div>
                    <NavIkon />
                </div>
                <div className={cls.element('identitetogloggut')}>
                    <EtikettLiten className={cls.element('identitet')}>
                        {bruker}
                    </EtikettLiten>
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
            </MediaQuery>
            <MediaQuery maxWidth={576}>
                <Ekspanderbartpanel tittel={bruker}>
                    <div className={cls.className}>
                        <Knapp
                            style={{ marginLeft: 'auto' }}
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
