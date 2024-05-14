import Avsluttet from '@/AvtaleSide/AvtaleStatus/Avsluttet';
import Gjennomføres from '@/AvtaleSide/AvtaleStatus/Gjennomføres';
import KlarForOppstart from '@/AvtaleSide/AvtaleStatus/KlarForOppstart';
import StatusPanel from '@/AvtaleSide/AvtaleStatus/StatusPanel';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { Avtale, Avtaleinnhold } from '@/types/avtale';
import { formatterDato } from '@/utils/datoUtils';
import { BodyShort } from '@navikt/ds-react';
import React, { FunctionComponent } from 'react';

interface Props {
    avtale: Pick<
        Avtale,
        | 'statusSomEnum'
        | 'annullertTidspunkt'
        | 'godkjentAvDeltaker'
        | 'godkjentAvDeltaker'
        | 'avtaleInngått'
        | 'annullertGrunn'
        | 'avbruttDato'
        | 'avbruttGrunn'
    > & { gjeldendeInnhold: Pick<Avtaleinnhold, 'startDato' | 'sluttDato'> };
}

const DeltakerAvtaleStatus: FunctionComponent<Props> = ({ avtale }) => {
    switch (avtale.statusSomEnum) {
        case 'ANNULLERT':
            return (
                <StatusPanel
                    header="Avtalen er annullert"
                    body={
                        <BodyShort size="small">
                            Veileder har annullert avtalen {formatterDato(avtale.annullertTidspunkt!)}. Årsak:{' '}
                            {avtale.annullertGrunn}.
                        </BodyShort>
                    }
                />
            );
        case 'AVBRUTT':
            return (
                <StatusPanel
                    header="Avtalen er avbrutt"
                    body={
                        <BodyShort size="small">
                            Veileder har avbrutt avtalen {formatterDato(avtale.avbruttDato!)}. Årsak:{' '}
                            {avtale.avbruttGrunn}.
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
                            Du kan godkjenne avtalen når alt er fylt ut. <br />
                            Hvis du er uenig i innholdet eller har spørsmål om avtalen, må du kontakte veileder før du
                            godkjenner.
                        </BodyShort>
                    }
                />
            );
        case 'MANGLER_GODKJENNING':
            return avtale.godkjentAvDeltaker ? (
                <StatusPanel
                    header="Venter på godkjenning av avtalen fra arbeidsgiver og NAV"
                    body={<BodyShort size="small">Du har godkjent avtalen.</BodyShort>}
                />
            ) : (
                <StatusPanel
                    header="Du kan godkjenne avtalen"
                    body={
                        <BodyShort size="small">
                            Før du godkjenner avtalen må du sjekke at alt er i orden og innholdet er riktig. Hvis du er
                            uenig i innholdet eller har spørsmål om avtalen, må du kontakte veileder før du godkjenner.
                        </BodyShort>
                    }
                />
            );
        case 'KLAR_FOR_OPPSTART':
            return (
                <KlarForOppstart avtaleInngått={avtale.avtaleInngått} startDato={avtale.gjeldendeInnhold.startDato} />
            );
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

export default DeltakerAvtaleStatus;
