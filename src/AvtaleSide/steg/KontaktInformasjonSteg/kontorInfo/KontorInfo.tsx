import React, { FunctionComponent } from 'react';
import { Normaltekst, Systemtittel, Undertittel } from 'nav-frontend-typografi';
import './kontorInfo.less';
import BEMHelper from '@/utils/bem';

import { ReactComponent as NavIkon } from '@/assets/ikoner/navikon.svg';
import SetEnhet from '@/utils/SetEnhet';

const KontorInfo: FunctionComponent<{ oppsummeringside: boolean }> = ({
    oppsummeringside,
}: {
    oppsummeringside: boolean;
}) => {
    const cls = BEMHelper('kontorinfo');
    const ikon = () => (oppsummeringside ? <NavIkon className="kontorinfo__ikon" width={28} height={28} /> : null);

    return (
        <div className={cls.className}>
            <div className={cls.element('ingress', oppsummeringside ? 'oppsummering' : '')}>
                {ikon()}
                <Systemtittel>Nav Kontor</Systemtittel>
            </div>
            <div className={cls.element('info-rad')}>
                <Normaltekst>Geografisk enhet</Normaltekst>
                <Undertittel>
                    <SetEnhet enhetsnr="enhetGeografisk" enhetsNavn="enhetsnavnGeografisk" />
                </Undertittel>
            </div>
            <div className={cls.element('info-rad')}>
                <Normaltekst>Oppfølingsenhet</Normaltekst>
                <Undertittel>
                    <SetEnhet enhetsnr="enhetOppfolging" enhetsNavn="enhetsnavnOppfolging" />
                </Undertittel>
            </div>
        </div>
    );
};
export default KontorInfo;
