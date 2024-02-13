import React, { FunctionComponent, useContext } from 'react';
import { BodyShort, Heading } from '@navikt/ds-react';
import './deltakerInfo.less';
import BEMHelper from '@/utils/bem';
import NavIkon from '@/assets/ikoner/navikon.svg?react';
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
                <Heading level="2" size="medium">
                    Om deltakeren
                </Heading>
            </div>
            <div className={cls.element('info-rad')}>
                <div className={cls.element('info-container')}>
                    <BodyShort size="small">Geografisk enhet</BodyShort>
                    <BodyShort size="small" className={cls.element('info-verdi')}>
                        <HentNavEnhetFraContext
                            className={cls.className}
                            enhetsnr="enhetGeografisk"
                            enhetsNavn="enhetsnavnGeografisk"
                        />
                    </BodyShort>
                </div>
                <div className={cls.element('info-container')}>
                    <BodyShort size="small">Oppfølgingsenhet</BodyShort>
                    <BodyShort size="small" className={cls.element('info-verdi')}>
                        <HentNavEnhetFraContext
                            className={cls.className}
                            enhetsnr="enhetOppfolging"
                            enhetsNavn="enhetsnavnOppfolging"
                        />
                    </BodyShort>
                </div>
            </div>

            <div className={cls.element('info-rad')}>
                <div className={cls.element('info-container')}>
                    <BodyShort size="small">Kvalifisering/servicegruppe</BodyShort>
                    <BodyShort size="small" className={cls.element('info-verdi')}>
                        {kvalifiseringsgruppe ? (
                            hentKvalifiseringsgruppeTekst(kvalifiseringsgruppe)
                        ) : (
                            <em>Ikke oppgitt</em>
                        )}
                    </BodyShort>
                </div>
                <div className={cls.element('info-container')}>
                    <BodyShort size="small">Formidlingsgruppe</BodyShort>
                    <BodyShort size="small" className={cls.element('info-verdi')}>
                        {formidlingsgruppe ? hentFormidlingsgruppeTekst(formidlingsgruppe) : <em>Ikke oppgitt</em>}
                    </BodyShort>
                </div>
            </div>
            {!oppsummeringside && <OppdatereKostnadssted />}
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
