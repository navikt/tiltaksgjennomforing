import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { EtikettLiten } from 'nav-frontend-typografi';
import * as React from 'react';
import { FunctionComponent, useEffect, useState } from 'react';
import MediaQuery from 'react-responsive';
import { ReactComponent as NavIkon } from '@/assets/ikoner/navikon.svg';
import BEMHelper from '@/utils/bem';
import './Innloggingslinje.less';
import { InnloggetBruker } from './useInnlogget';
import LoggUtKnapp from '@/InnloggingBoundary/LoggUtKnapp';

import RestService from '@/services/rest-service';

const cls = BEMHelper('innloggingslinje');

const Innloggingslinje: FunctionComponent<{
    innloggetBruker: InnloggetBruker;
}> = props => {
    const bruker = props.innloggetBruker.identifikator;
    const [brukBackupmeny, setBrukBackupmeny] = useState<boolean>(false);
    useEffect(() => {
        RestService.sjekkOmMenySkalBrukes('/tiltaksgjennomforing/skal-backupmeny-brukes').then(setBrukBackupmeny);
    }, []);

    return brukBackupmeny ? (
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
