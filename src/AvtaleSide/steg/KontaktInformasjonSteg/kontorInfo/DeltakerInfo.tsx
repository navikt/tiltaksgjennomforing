import React, { FunctionComponent, useContext } from 'react';
import { BodyShort, Heading } from '@navikt/ds-react';
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
import { hentFormidlingsgruppeTekst } from '@/AvtaleSide/steg/BeregningTilskudd/Formidlingsgruppe';

const DeltakerInfo: FunctionComponent<{ oppsummeringside: boolean }> = ({
    oppsummeringside,
}: {
    oppsummeringside: boolean;
}) => {
    const innloggetBruker = useContext(InnloggetBrukerContext);
    const { avtale } = useContext(AvtaleContext);
    if (innloggetBruker.rolle !== 'VEILEDER' && innloggetBruker.rolle !== 'BESLUTTER') {
        return null;
    }

    const { tiltakstype, kvalifiseringsgruppe, formidlingsgruppe } = avtale;
    const cls = BEMHelper('deltakerinfo');
    const ikon = () => (oppsummeringside ? <NavIkon className="kontorinfo__ikon" width={28} height={28} /> : null);

    return (
        <div className={cls.className}>
            <div className={cls.element('ingress', oppsummeringside ? 'oppsummering' : '')}>
                {ikon()}
                <Heading size="medium">Om deltakeren</Heading>
            </div>
            <div className={cls.element('info-rad')}>
                <div className={cls.element('info-container')}>
                    <BodyShort size="small">Geografisk enhet</BodyShort>
                    <Heading size="small">
                        <HentNavEnhetFraContext enhetsnr="enhetGeografisk" enhetsNavn="enhetsnavnGeografisk" />
                    </Heading>
                </div>
                <div className={cls.element('info-container')}>
                    <BodyShort size="small">Oppfølgingsenhet</BodyShort>
                    <Heading size="small">
                        <HentNavEnhetFraContext enhetsnr="enhetOppfolging" enhetsNavn="enhetsnavnOppfolging" />
                    </Heading>
                </div>
            </div>
            {!oppsummeringside && <OppdatereKostnadssted />}
            <div className={cls.element('info-rad')}>
                <div className={cls.element('info-container')}>
                    <BodyShort size="small">Kvalifisering/servicegruppe</BodyShort>
                    <Heading size="small">
                        {kvalifiseringsgruppe ? (
                            hentKvalifiseringsgruppeTekst(kvalifiseringsgruppe)
                        ) : (
                            <em>Ikke oppgitt</em>
                        )}
                    </Heading>
                </div>
                <div className={cls.element('info-container')}>
                    <BodyShort size="small">Formidlingsgruppe</BodyShort>
                    <Heading size="small">
                        {formidlingsgruppe ? hentFormidlingsgruppeTekst(formidlingsgruppe) : <em>Ikke oppgitt</em>}
                    </Heading>
                </div>
            </div>
            {!avtale.avtaleInngått && (
                <SjekkKvalifiseringsgruppeOppMotTiltakstype
                    tiltakstype={tiltakstype}
                    kvalifiseringsgruppe={kvalifiseringsgruppe}
                />
            )}
        </div>
    );
};
export default DeltakerInfo;
