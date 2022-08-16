import React, { FunctionComponent, useContext } from 'react';
import { Normaltekst, Systemtittel, Undertittel } from 'nav-frontend-typografi';
import './deltakerInfo.less';
import BEMHelper from '@/utils/bem';
import { ReactComponent as NavIkon } from '@/assets/ikoner/navikon.svg';
import HentNavEnhetFraContext from '@/utils/HentNavEnhetFraContext';
import OppdatereKostnadssted from '@/AvtaleSide/steg/KontaktInformasjonSteg/kontorInfo/OppdatereKostnadssted';
import { AvtaleContext } from '@/AvtaleProvider';
import {
    hentKvalifiseringsgruppeTekst,
    SjekkKvalifiseringsgruppeOppMotTiltakstype,
} from '@/AvtaleSide/steg/BeregningTilskudd/Kvalifiseringsgruppe';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import {
    hentFormidlingsgruppeTekst
} from '@/AvtaleSide/steg/BeregningTilskudd/Formidlingsgruppe';

const DeltakerInfo: FunctionComponent<{ oppsummeringside: boolean }> = ({ oppsummeringside } : {
    oppsummeringside: boolean;
}) => {
    const innloggetBruker = useContext(InnloggetBrukerContext);
    const { avtale } = useContext(AvtaleContext);
    if (innloggetBruker.rolle !== 'VEILEDER' && innloggetBruker.rolle !== 'BESLUTTER') {
        return null;
    }

    const { tiltakstype, kvalifiseringsgruppe, formidlingsgruppe } = avtale;
    const cls = BEMHelper('deltakerinfo');
    const ikon = () => (oppsummeringside ? <NavIkon className='kontorinfo__ikon' width={28} height={28} /> : null);

    return (
        <div className={cls.className}>
            <div className={cls.element('ingress', oppsummeringside ? 'oppsummering' : '')}>
                {ikon()}
                <Systemtittel>Om deltakeren</Systemtittel>
            </div>
            <div className={cls.element('info-rad')}>
                <Normaltekst>Geografisk enhet</Normaltekst>
                <Undertittel>
                    <HentNavEnhetFraContext enhetsnr='enhetGeografisk' enhetsNavn='enhetsnavnGeografisk' />
                </Undertittel>
            </div>
            <div className={cls.element('info-rad')}>
                <Normaltekst>Oppfølgingsenhet</Normaltekst>
                <Undertittel>
                    <HentNavEnhetFraContext enhetsnr='enhetOppfolging' enhetsNavn='enhetsnavnOppfolging' />
                </Undertittel>
            </div>
            {!oppsummeringside && <OppdatereKostnadssted />}
            <div className={cls.element('info-rad')}>
                <Normaltekst>Kvalifisering/servicegruppe</Normaltekst>
                <Undertittel>
                    {kvalifiseringsgruppe ? hentKvalifiseringsgruppeTekst(kvalifiseringsgruppe) : <em>Ikke oppgitt</em>}
                </Undertittel>
            </div>
            <div className={cls.element('info-rad')}>
                <Normaltekst>Formidlingsgruppe</Normaltekst>
                <Undertittel>
                    {formidlingsgruppe ? hentFormidlingsgruppeTekst(formidlingsgruppe) : <em>Ikke oppgitt</em>}
                </Undertittel>
            </div>
            {!avtale.avtaleInngått &&
                <SjekkKvalifiseringsgruppeOppMotTiltakstype
                    tiltakstype={tiltakstype}
                    kvalifiseringsgruppe={kvalifiseringsgruppe} />
            }
        </div>
    );
};
export default DeltakerInfo;
