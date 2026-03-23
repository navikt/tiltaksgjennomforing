import React, { useState } from 'react';

import BekreftelseModal from '@/komponenter/modal/BekreftelseModal';
import { useAvtale } from '@/AvtaleProvider';
import { Feilkode } from '@/types/feilkode';
import { TiltaksType } from '@/types';
import { tiltakstypeTekst } from '@/messages';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { Alert } from '@navikt/ds-react';

import styles from './BeslutterTilskuddsperiodeBekreftelseModal.module.less';

interface Props {
    enhet?: string;
    lukkModal: () => void;
}

const parseFeilmelding = (tiltakstype: TiltaksType, error: Error) => {
    const message = error?.message as Feilkode;
    switch (message) {
        case 'ENHET_IKKE_TILGANG_PA_TILTAK': {
            return `Deltakers oppfølgingsenhet er endret til en enhet som ikke deltar på forsøket om fireårig lønnstilskudd.`;
        }
        case 'FANT_IKKE_INNSATSBEHOV':
        case 'KVALIFISERINGSGRUPPE_IKKE_RETTIGHET':
        case 'KVALIFISERINGSGRUPPE_MIDLERTIDIG_LONNTILSKUDD_OG_SOMMERJOBB_FEIL':
        case 'KVALIFISERINGSGRUPPE_VARIG_LONNTILSKUDD_FEIL':
        case 'KVALIFISERINGSGRUPPE_VTAO_FEIL':
        case 'KVALIFISERINGSGRUPPE_FIREARIG_LONNTILSKUDD_FOR_UNGE_FEIL': {
            return `Oppfølgingsbehovet til deltaker er endret og avviker fra det som er oppgitt i avtalen.
                    Deltaker kvalifiserer ikke lengre til ${tiltakstypeTekst[tiltakstype]}.`;
        }
        default: {
            throw Error;
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
                    const feil = parseFeilmelding(avtale.tiltakstype, error as Error);
                    setFeilmelding(feil);
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
