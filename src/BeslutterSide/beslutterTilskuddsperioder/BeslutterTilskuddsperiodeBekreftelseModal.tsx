import React, { useState } from 'react';

import BekreftelseModal from '@/komponenter/modal/BekreftelseModal';
import { useAvtale } from '@/AvtaleProvider';
import { Feilkode } from '@/types/feilkode';
import type { Avtale } from '@/types';
import { tiltakstypeTekst } from '@/messages';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { Alert } from '@navikt/ds-react';

import styles from './BeslutterTilskuddsperiodeBekreftelseModal.module.less';

interface Props {
    enhet?: string;
    lukkModal: () => void;
}

const parseFeilmelding = (avtale: Avtale, error: Error) => {
    const message = error?.message as Feilkode;
    switch (message) {
        case 'ENHET_IKKE_TILGANG_PA_TILTAK': {
            return `Deltakers oppfølgingsenhet er endret til en enhet som ikke deltar på forsøket om fireårig lønnstilskudd.`;
        }
        case 'FANT_IKKE_INNSATSBEHOV':
        case 'INNSATSGRUPPE_IKKE_RETTIGHET':
        case 'INNSATSGRUPPE_MIDLERTIDIG_LONNTILSKUDD_OG_SOMMERJOBB_FEIL':
        case 'INNSATSGRUPPE_VARIG_LONNTILSKUDD_FEIL':
        case 'INNSATSGRUPPE_VTAO_FEIL':
        case 'INNSATSGRUPPE_FIREARIG_LONNTILSKUDD_FOR_UNGE_FEIL': {
            return `Oppfølgingsbehovet til deltaker er endret og avviker fra det som er oppgitt i avtalen.
                    Deltaker kvalifiserer ikke lenger til ${tiltakstypeTekst[avtale.tiltakstype]}.`;
        }
        case 'INNSATSGRUPPE_MANGLER':
            return 'Innsatsgruppen på avtalen mangler og må oppdateres før tilskuddsperioden kan godkjennes.';
        case 'ENHET_ER_SLETTET':
            return `${avtale.gjeldendeInnhold.bedriftNavn} er ikke lenger aktiv.
                    Dette kan skyldes at virksomheten har lagt ned eller blitt omorganisert.`;
        default: {
            return undefined;
        }
    }
};

function BeslutterTilskuddsperiodeBekreftelseModal(props: Props) {
    const { enhet, lukkModal } = props;
    const { godkjennTilskudd, avtale } = useAvtale();
    const [feilmelding, setFeilmelding] = useState<string>();

    return (
        <BekreftelseModal
            bekreftOnClick={async () => {
                setFeilmelding(undefined);
                try {
                    if (enhet) {
                        await godkjennTilskudd(enhet);
                        lukkModal();
                    }
                } catch (error) {
                    const feil = parseFeilmelding(avtale, error as Error);
                    if (feil) {
                        setFeilmelding(feil);
                    } else {
                        throw error;
                    }
                }
            }}
            modalIsOpen
            oversiktTekst="Godkjenn tilskuddsperiode"
            bekreftelseTekst="Godkjenn tilskuddsperiode"
            avbrytelseTekst="Avbryt"
            lukkModal={lukkModal}
        >
            Du kan ikke gjøre endringer etter at du har godkjent tilskuddsperioden.
            {feilmelding && (
                <>
                    <VerticalSpacer rem={1} />
                    <Alert variant="warning">
                        <strong>Tilskuddsperioden kan ikke godkjennes</strong>
                        <p className={styles.feilmeldingParagraf}>{feilmelding}</p>
                    </Alert>
                </>
            )}
        </BekreftelseModal>
    );
}

export default BeslutterTilskuddsperiodeBekreftelseModal;
