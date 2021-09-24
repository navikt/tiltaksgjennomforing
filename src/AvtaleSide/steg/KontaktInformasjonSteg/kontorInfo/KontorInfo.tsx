import React, { FunctionComponent } from 'react';
import { Normaltekst, Systemtittel, Undertittel } from 'nav-frontend-typografi';
import './kontorInfo.less';
import BEMHelper from '@/utils/bem';
import { ReactComponent as NavIkon } from '@/assets/ikoner/navikon.svg';
import HentNavEnhetFraContext from '@/utils/HentNavEnhetFraContext';
import OppdatereKostnadssted from '@/AvtaleSide/steg/KontaktInformasjonSteg/kontorInfo/OppdatereKostnadssted';

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
                <Systemtittel>NAV-kontor</Systemtittel>
            </div>
            <div className={cls.element('info-rad')}>
                <Normaltekst>Geografisk enhet</Normaltekst>
                <Undertittel>
                    <HentNavEnhetFraContext enhetsnr="enhetGeografisk" enhetsNavn="enhetsnavnGeografisk" />
                </Undertittel>
            </div>
            <div className={cls.element('info-rad')}>
                <Normaltekst>Oppfølgingsenhet</Normaltekst>
                <Undertittel>
                    <HentNavEnhetFraContext enhetsnr="enhetOppfolging" enhetsNavn="enhetsnavnOppfolging" />
                </Undertittel>
            </div>
            {!oppsummeringside && <OppdatereKostnadssted />}
        </div>
    );
};
export default KontorInfo;
