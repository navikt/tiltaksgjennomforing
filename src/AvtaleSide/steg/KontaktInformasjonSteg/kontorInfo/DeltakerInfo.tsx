import React from 'react';
import { Alert, BodyShort, Heading } from '@navikt/ds-react';
import classNames from 'classnames';
import styles from './DeltakerInfo.module.less';
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
    const ikon = () => (oppsummeringside ? <NavIkon className={styles.ikon} width={28} height={28} /> : null);

    return (
        <div className={styles.deltakerinfo}>
            <div className={classNames(styles.ingress, oppsummeringside && styles.ingressOppsummering)}>
                {ikon()}
                <Heading level="2" size="medium">
                    Om deltakeren
                </Heading>
            </div>
            <div className={styles.infoRad}>
                <div className={styles.infoContainer}>
                    <BodyShort size="small">Geografisk enhet</BodyShort>
                    <BodyShort size="small" className={styles.infoVerdi}>
                        <HentNavEnhetFraContext enhetsnr="enhetGeografisk" enhetsNavn="enhetsnavnGeografisk" />
                    </BodyShort>
                </div>
                <div className={styles.infoContainer}>
                    <BodyShort size="small">Oppfølgingsenhet</BodyShort>
                    <BodyShort size="small" className={styles.infoVerdi}>
                        <HentNavEnhetFraContext enhetsnr="enhetOppfolging" enhetsNavn="enhetsnavnOppfolging" />
                    </BodyShort>
                </div>
            </div>

            <div className={styles.infoRad}>
                <div className={styles.infoContainer}>
                    <BodyShort size="small">Innsatsgruppe (§ 14 a)</BodyShort>
                    <BodyShort size="small" className={styles.infoVerdi}>
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
