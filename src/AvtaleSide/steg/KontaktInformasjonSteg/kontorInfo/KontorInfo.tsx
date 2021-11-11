import React, { FunctionComponent, useContext } from 'react';
import { Normaltekst, Systemtittel, Undertittel } from 'nav-frontend-typografi';
import './kontorInfo.less';
import BEMHelper from '@/utils/bem';
import { ReactComponent as NavIkon } from '@/assets/ikoner/navikon.svg';
import HentNavEnhetFraContext from '@/utils/HentNavEnhetFraContext';
import OppdatereKostnadssted from '@/AvtaleSide/steg/KontaktInformasjonSteg/kontorInfo/OppdatereKostnadssted';
import { AvtaleContext } from '@/AvtaleProvider';
import {
    hentKvalifiseringsgruppeTekst,
    sjekkKvalifiseringsgruppeOppMotTiltakstype,
} from '@/AvtaleSide/steg/BeregningTilskudd/Kvalifiseringsgruppe';

const KontorInfo: FunctionComponent<{ oppsummeringside: boolean }> = ({
    oppsummeringside,
}: {
    oppsummeringside: boolean;
}) => {
    const { avtale } = useContext(AvtaleContext);
    const { tiltakstype, kvalifiseringsgruppe } = avtale;
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
            <div className={cls.element('info-rad')}>
                <Normaltekst>Kvalifisering/servicegruppe</Normaltekst>
                <Undertittel>
                    {kvalifiseringsgruppe ? hentKvalifiseringsgruppeTekst(kvalifiseringsgruppe) : <em>Ikke oppgitt</em>}
                </Undertittel>
            </div>
            {sjekkKvalifiseringsgruppeOppMotTiltakstype(tiltakstype, kvalifiseringsgruppe)}
        </div>
    );
};
export default KontorInfo;
