import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { EtikettLiten } from 'nav-frontend-typografi';
import * as React from 'react';
import { FunctionComponent } from 'react';
import MediaQuery from 'react-responsive';
import { ReactComponent as NavIkon } from '@/assets/ikoner/navikon.svg';
import BEMHelper from '@/utils/bem';
import './Innloggingslinje.less';
import { InnloggetBruker } from './useInnlogget';
import LoggUtKnapp from '@/InnloggingBoundary/LoggUtKnapp';

const cls = BEMHelper('innloggingslinje');

const Innloggingslinje: FunctionComponent<{
    innloggetBruker: InnloggetBruker;
}> = props => {
    const bruker = props.innloggetBruker.identifikator;
    return (
        <div className="innloggingslinje">
            <div className="innloggingslinje__innhold">
                <MediaQuery minWidth={577}>
                    <div>
                        <NavIkon />
                    </div>
                    <div className={cls.element('identitetogloggut')}>
                        <EtikettLiten className={cls.element('identitetogloggut__identitet')}>{bruker}</EtikettLiten>
                        <LoggUtKnapp />
                    </div>
                </MediaQuery>
                <MediaQuery maxWidth={576}>
                    <Ekspanderbartpanel tittel={bruker}>
                        <div className={cls.className}>
                            <LoggUtKnapp />
                        </div>
                    </Ekspanderbartpanel>
                </MediaQuery>
            </div>
        </div>
    );
};
export default Innloggingslinje;
