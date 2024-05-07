import Avsluttet from '@/AvtaleSide/AvtaleStatus/Avsluttet';
import Gjennomføres from '@/AvtaleSide/AvtaleStatus/Gjennomføres';
import KlarForOppstart from '@/AvtaleSide/AvtaleStatus/KlarForOppstart';
import StatusPanel from '@/AvtaleSide/AvtaleStatus/StatusPanel';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { Avtale, Avtaleinnhold } from '@/types/avtale';
import { formatterDato } from '@/utils/datoUtils';
import { BodyShort } from '@navikt/ds-react';
import React, { FunctionComponent, useContext } from 'react';

interface Props {
    avtale: Pick<
        Avtale,
        | 'statusSomEnum'
        | 'annullertTidspunkt'
        | 'godkjentAvDeltaker'
        | 'godkjentAvDeltaker'
        | 'avtaleInngått'
        | 'annullertGrunn'
        | 'avbruttGrunn'
    > & { gjeldendeInnhold: Pick<Avtaleinnhold, 'startDato' | 'sluttDato'> };
}

const DeltakerAvtaleStatus: FunctionComponent<Props> = ({ avtale }) => {
    switch (avtale.statusSomEnum) {
        case 'ANNULLERT':
            return (
                <StatusPanel
                    header="Tiltaket er annullert"
                    body={
                        <BodyShort size="small">
                            Veileder har annullert tiltaket {formatterDato(avtale.annullertTidspunkt!)}. Årsak:{' '}
                            {avtale.annullertGrunn}.
                        </BodyShort>
                    }
                />
            );
        case 'AVBRUTT':
            return (
                <StatusPanel
                    header="Tiltaket er avbrutt"
                    body={
                        <BodyShort size="small">Veileder har avbrutt tiltaket. Årsak: {avtale.avbruttGrunn}.</BodyShort>
                    }
                />
            );
        case 'PÅBEGYNT':
            return (
                <StatusPanel
                    header="Utfylling av avtale påbegynt"
                    body={
                        <BodyShort size="small">
                            Innholdet i avtalen fylles ut av arbeidsgiveren og veilederen. Hvis du er uenig i innholdet
                            eller har spørsmål til avtalen, må du kontakte veilederen din via aktivitetsplanen før du
                            godkjenner. Du kan godkjenne avtalen når alt er fylt ut.
                        </BodyShort>
                    }
                />
            );
        case 'MANGLER_GODKJENNING':
            return avtale.godkjentAvDeltaker ? (
                <StatusPanel
                    header="Vent til de andre har godkjent"
                    body={
                        <>
                            <BodyShort size="small">
                                Du har godkjent avtalen. Venter nå på godkjenning fra NAV.
                            </BodyShort>
                            <VerticalSpacer rem={2} />
                        </>
                    }
                />
            ) : (
                <StatusPanel
                    header="Du kan godkjenne"
                    body={
                        <>
                            <BodyShort size="small">
                                Før du godkjenner avtalen må du sjekke at alt er i orden og innholdet er riktig.
                            </BodyShort>
                            <VerticalSpacer rem={2} />
                        </>
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
