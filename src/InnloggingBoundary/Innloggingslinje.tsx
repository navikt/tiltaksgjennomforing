import { ReactComponent as NavIkon } from '@/assets/ikoner/navikon.svg';
import LoggUtKnapp from '@/InnloggingBoundary/LoggUtKnapp';
import { InnloggetBruker } from '@/types/innlogget-bruker';
import BEMHelper from '@/utils/bem';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { EtikettLiten } from 'nav-frontend-typografi';
import * as React from 'react';
import { FunctionComponent } from 'react';
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
    ) : null;
};
export default Innloggingslinje;
