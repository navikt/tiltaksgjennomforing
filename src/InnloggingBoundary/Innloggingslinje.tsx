import { ReactComponent as NavIkon } from '@/assets/ikoner/navikon.svg';
import LoggUtKnapp from '@/InnloggingBoundary/LoggUtKnapp';
import { InnloggetBruker } from '@/types/innlogget-bruker';
import BEMHelper from '@/utils/bem';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import Lenke from 'nav-frontend-lenker';
import { EtikettLiten } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import MediaQuery from 'react-responsive';
import './Innloggingslinje.less';

type Props = {
    innloggetBruker: InnloggetBruker;
    brukBackupmeny: boolean | undefined;
};

const cls = BEMHelper('innloggingslinje');

const Innloggingslinje: FunctionComponent<Props> = props => {
    const bruker = props.innloggetBruker.identifikator;

    return props.brukBackupmeny ? (
        <div className="innloggingslinje">
            <div className="innloggingslinje__innhold">
                <MediaQuery minWidth={577}>
                    <Lenke href="/tiltaksgjennomforing" ariaLabel="lenke til oversiktsiden">
                        <div className={cls.element('navIkon')}>
                            <NavIkon />
                        </div>
                    </Lenke>
                    <div className={cls.element('identitetogloggut')}>
                        <EtikettLiten className={cls.element('identitetogloggut__identitet')}>{bruker}</EtikettLiten>
                        <LoggUtKnapp />
                    </div>
                </MediaQuery>
                <MediaQuery maxWidth={576}>
                    <Ekspanderbartpanel
                        tittel={
                            <div className={cls.element('mobileheader')}>
                                <NavIkon />
                                <div className={cls.element('brukernavn')} aria-label="innlogget bruker id">
                                    {bruker}
                                </div>
                            </div>
                        }
                    >
                        <div className={cls.className}>
                            <LoggUtKnapp />
                        </div>
                    </Ekspanderbartpanel>
                </MediaQuery>
            </div>
        </div>
    ) : null;
};
export default Innloggingslinje;
