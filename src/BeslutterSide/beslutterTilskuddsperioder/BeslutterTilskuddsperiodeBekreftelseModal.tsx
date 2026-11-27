import React, { useState } from 'react';

import BekreftelseModal from '@/komponenter/modal/BekreftelseModal';
import { useAvtale } from '@/AvtaleProvider';
import { Feilkode } from '@/types/feilkode';
import type { Avtale } from '@/types';
import { tiltakstypeTekst } from '@/messages';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { Alert, List, VStack } from '@navikt/ds-react';

import styles from './BeslutterTilskuddsperiodeBekreftelseModal.module.less';
import GodkjenningsPanel from '@/AvtaleSide/steg/GodkjenningSteg/Godkjenning/GodkjenningsPanel/GodkjenningsPanel';
import { isPast } from 'date-fns';
import { formaterPeriode } from '@/utils/datoUtils';

interface Props {
    enhet?: string;
    lukkModal: () => void;
}

const FEILKODER_SOM_KAN_BEKREFTES: Feilkode[] = [
    'FANT_IKKE_INNSATSBEHOV',
    'INNSATSGRUPPE_IKKE_RETTIGHET',
    'INNSATSGRUPPE_MIDLERTIDIG_LONNTILSKUDD_OG_SOMMERJOBB_FEIL',
    'INNSATSGRUPPE_VARIG_LONNTILSKUDD_FEIL',
    'INNSATSGRUPPE_VTAO_FEIL',
    'INNSATSGRUPPE_FIREARIG_LONNTILSKUDD_FOR_UNGE_FEIL',
    'INNSATSGRUPPE_MANGLER',
];

const parseFeilmelding = (avtale: Avtale, feilkode: Feilkode) => {
    switch (feilkode) {
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
    const [feil, setfeil] = useState<{ melding: string; kode: Feilkode }>();
    const [bekreftFeilkode, setBekreftFeilkode] = useState<boolean>(false);

    return (
        <BekreftelseModal
            bekreftOnClick={async () => {
                setfeil(undefined);
                try {
                    if (enhet) {
                        setfeil(undefined);
                        setBekreftFeilkode(false);
                        await godkjennTilskudd(enhet, bekreftFeilkode ? feil?.kode : undefined);
                        lukkModal();
                    }
                } catch (error) {
                    const kode = (error as Error)?.message as Feilkode;
                    const melding = parseFeilmelding(avtale, kode);
                    if (melding) {
                        setfeil({ melding: melding, kode: kode });
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
            {feil && (
                <>
                    <VerticalSpacer rem={1} />
                    <VStack gap="space-16">
                        <Alert variant="warning">
                            <strong>Tilskuddsperioden kan ikke godkjennes</strong>
                            <p className={styles.feilmeldingParagraf}>{feil.melding}</p>
                        </Alert>
                        {FEILKODER_SOM_KAN_BEKREFTES.includes(feil.kode) &&
                            avtale.gjeldendeTilskuddsperiode &&
                            isPast(avtale.gjeldendeTilskuddsperiode?.sluttDato) && (
                                <GodkjenningsPanel
                                    setChecked={() => setBekreftFeilkode(!bekreftFeilkode)}
                                    isChecked={bekreftFeilkode}
                                    checkboxLabel="Ja, jeg bekrefter."
                                >
                                    <List>
                                        <p className={styles.bekreftParagraf}>
                                            Hvis tilskuddsperioden likevel skal godkjennes, bekreft at:
                                        </p>
                                        <List.Item>
                                            Deltaker var under oppfølging i perioden{' '}
                                            {formaterPeriode(
                                                avtale.gjeldendeTilskuddsperiode.startDato,
                                                avtale.gjeldendeTilskuddsperiode.sluttDato,
                                            )}
                                        </List.Item>
                                        <List.Item>Deltakere hadde ett gyldig innsatsbehov</List.Item>
                                    </List>
                                </GodkjenningsPanel>
                            )}
                    </VStack>
                </>
            )}
        </BekreftelseModal>
    );
}

export default BeslutterTilskuddsperiodeBekreftelseModal;
