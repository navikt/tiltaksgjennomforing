import React from 'react';
import { Alert, BodyShort, Heading } from '@navikt/ds-react';
import './deltakerInfo.less';
import BEMHelper from '@/utils/bem';
import NavIkon from '@/assets/ikoner/navikon.svg?react';
import HentNavEnhetFraContext from '@/utils/HentNavEnhetFraContext';
import { useAvtale } from '@/AvtaleProvider';
import { innsatsgruppeTekst } from '@/types/innsatsgruppe';
import { useInnloggetBruker } from '@/InnloggingBoundary/InnloggingBoundary';

interface Props {
    oppsummeringside: boolean;
}

const DeltakerInfo = (props: Props) => {
    const { oppsummeringside } = props;
    const innloggetBruker = useInnloggetBruker();
    const { avtale } = useAvtale();

    if (innloggetBruker.rolle !== 'VEILEDER' && innloggetBruker.rolle !== 'BESLUTTER') {
        return null;
    }

    const { innsatsgruppe } = avtale;
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
                    <BodyShort size="small">Innsatsgruppe (§ 14 a)</BodyShort>
                    <BodyShort size="small" className={cls.element('info-verdi')}>
                        {(innsatsgruppe?.type && innsatsgruppeTekst[innsatsgruppe.type]) ?? <em>Ikke oppgitt</em>}
                    </BodyShort>
                </div>
            </div>
            {!avtale.avtaleInngått && !innsatsgruppe?.erGyldigForTiltakstype && (
                <Alert variant="warning">
                    <div style={{ marginBottom: '0.5rem' }}>
                        {innsatsgruppe?.type ? (
                            <>
                                Kandidat er registrert med innsatsgruppe{' '}
                                <em>{innsatsgruppeTekst[innsatsgruppe?.type] ?? 'ukjent'}</em>. Denne gruppen
                                kvalifiserer ikke til dette tiltaket.
                                <br />
                                Sjekk at innsatsbehovet stemmer. Om dette er den korrekte innsatsgruppen, bør avtalen
                                annulleres og arbeidsgiver varsles.
                            </>
                        ) : (
                            <>Det er ikke registrert noen innsatsgruppe (§ 14 a) på kandidaten.</>
                        )}
                    </div>
                </Alert>
            )}
        </div>
    );
};
export default DeltakerInfo;
