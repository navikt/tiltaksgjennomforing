import { ReactNode } from 'react';
import { Alert, BodyShort, Heading } from '@navikt/ds-react';
import styles from './DeltakerInfo.module.less';
import NavIkon from '@/assets/ikoner/navikon.svg?react';
import HentNavEnhetFraContext from '@/utils/HentNavEnhetFraContext';
import { useAvtale } from '@/AvtaleProvider';
import { Innsatsgruppe, innsatsgruppeTekst } from '@/types/innsatsgruppe';
import { useInnloggetBruker } from '@/InnloggingBoundary/InnloggingBoundary';
import Stegoppsummering from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/Stegoppsummering/Stegoppsummering';

interface Props {
    oppsummeringside: boolean;
}

const DeltakerInfo = (props: Props) => {
    const innloggetBruker = useInnloggetBruker();
    const { avtale } = useAvtale();

    if (innloggetBruker.rolle !== 'VEILEDER' && innloggetBruker.rolle !== 'BESLUTTER') {
        return null;
    }

    const innsatsgruppe = avtale.innsatsgruppe;

    const innhold = (
        <>
            <div className={styles.infoRad}>
                <InfoFelt label="Geografisk enhet">
                    <HentNavEnhetFraContext enhetsnr="enhetGeografisk" enhetsNavn="enhetsnavnGeografisk" />
                </InfoFelt>
                <InfoFelt label="Oppfølgingsenhet">
                    <HentNavEnhetFraContext enhetsnr="enhetOppfolging" enhetsNavn="enhetsnavnOppfolging" />
                </InfoFelt>
                <InfoFelt label="Innsatsgruppe (§ 14 a)">
                    {(innsatsgruppe?.type && innsatsgruppeTekst[innsatsgruppe.type]) ?? <em>Ikke oppgitt</em>}
                </InfoFelt>
            </div>
            {!avtale.avtaleInngått && !innsatsgruppe?.erGyldigForTiltakstype && (
                <InnsatsgruppeVarsel type={innsatsgruppe?.type} />
            )}
        </>
    );

    if (props.oppsummeringside) {
        return (
            <Stegoppsummering tittel="Om deltakeren" ikon={<NavIkon width={28} height={28} />}>
                {innhold}
            </Stegoppsummering>
        );
    }

    return (
        <div>
            <Heading level="2" size="medium" className={styles.ingress}>
                Om deltakeren
            </Heading>
            {innhold}
        </div>
    );
};

const InfoFelt = (props: { label: string; children: ReactNode }) => (
    <div className={styles.infoContainer}>
        <BodyShort size="small">{props.label}</BodyShort>
        <BodyShort size="small" className={styles.infoVerdi}>
            {props.children}
        </BodyShort>
    </div>
);

const InnsatsgruppeVarsel = (props: { type?: Innsatsgruppe }) => {
    if (!props.type) {
        return <Alert variant="warning">Det er ikke registrert noen innsatsgruppe (§ 14 a) på kandidaten.</Alert>;
    }

    return (
        <Alert variant="warning">
            Kandidat er registrert med innsatsgruppe <em>{innsatsgruppeTekst[props.type] ?? 'ukjent'}</em>. Denne
            gruppen kvalifiserer ikke til dette tiltaket.
            <br />
            Sjekk at innsatsbehovet stemmer. Om dette er den korrekte innsatsgruppen, bør avtalen annulleres og
            arbeidsgiver varsles.
        </Alert>
    );
};

export default DeltakerInfo;
