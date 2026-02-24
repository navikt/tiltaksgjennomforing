import Avsluttet from '@/AvtaleSide/AvtaleStatus/Avsluttet';
import Gjennomføres from '@/AvtaleSide/AvtaleStatus/Gjennomføres';
import KlarForOppstart from '@/AvtaleSide/AvtaleStatus/KlarForOppstart';
import StatusPanel from '@/AvtaleSide/AvtaleStatus/StatusPanel';
import { Avtale, Avtaleinnhold } from '@/types/avtale';
import { formaterDato, NORSK_DATO_OG_TID_FORMAT_FULL } from '@/utils/datoUtils';
import { BodyShort } from '@navikt/ds-react';
import { FunctionComponent } from 'react';

interface Props {
    avtale: Pick<Avtale, 'status' | 'annullertTidspunkt' | 'avtaleInngått' | 'annullertGrunn'> & {
        gjeldendeInnhold: Pick<Avtaleinnhold, 'startDato' | 'sluttDato'>;
    };
}

const MentorAvtaleStatus: FunctionComponent<Props> = ({ avtale }) => {
    switch (avtale.status) {
        case 'ANNULLERT':
            return (
                <StatusPanel
                    header="Avtalen er annullert"
                    body={
                        <BodyShort size="small">
                            Veileder har annullert avtalen
                            {avtale.annullertTidspunkt && ` ${formaterDato(avtale.annullertTidspunkt)}`}.
                        </BodyShort>
                    }
                />
            );
        case 'PÅBEGYNT':
            return (
                <StatusPanel
                    header="Innholdet i avtalen fylles ut av arbeidsgiver og veileder"
                    body={
                        <BodyShort size="small">
                            Hvis du har spørsmål om avtalen, må du kontakte arbeidsgiver.
                        </BodyShort>
                    }
                />
            );
        case 'MANGLER_GODKJENNING':
            return (
                <StatusPanel
                    header="Venter på godkjenning av avtalen fra de andre partene"
                    body={
                        <BodyShort size="small">
                            Hvis du har spørsmål om avtalen, må du kontakte arbeidsgiver.
                        </BodyShort>
                    }
                />
            );
        case 'KLAR_FOR_OPPSTART':
            return <KlarForOppstart startDato={avtale.gjeldendeInnhold.startDato!} />;
        case 'GJENNOMFØRES':
            return <Gjennomføres avtaleInngått={avtale.avtaleInngått} startDato={avtale.gjeldendeInnhold.startDato} />;
        case 'AVSLUTTET':
            return (
                <Avsluttet
                    startDato={avtale.gjeldendeInnhold.startDato}
                    sluttDato={avtale.gjeldendeInnhold.sluttDato}
                />
            );
    }

    return null;
};

export default MentorAvtaleStatus;
