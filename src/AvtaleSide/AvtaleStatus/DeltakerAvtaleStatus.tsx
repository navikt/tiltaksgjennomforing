import Avsluttet from '@/AvtaleSide/AvtaleStatus/Avsluttet';
import Gjennomføres from '@/AvtaleSide/AvtaleStatus/Gjennomføres';
import KlarForOppstart from '@/AvtaleSide/AvtaleStatus/KlarForOppstart';
import StatusPanel from '@/AvtaleSide/AvtaleStatus/StatusPanel';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { Avtale } from '@/types/avtale';
import { formaterDato } from '@/utils/datoUtils';
import { BodyShort } from '@navikt/ds-react';
import React, { FunctionComponent } from 'react';
import { useMigreringSkrivebeskyttet } from '@/FeatureToggles';

interface Props {
    avtale: Avtale;
}

const DeltakerAvtaleStatus: FunctionComponent<Props> = ({ avtale }) => {
    const erSkrivebeskyttet = useMigreringSkrivebeskyttet();

    if (erSkrivebeskyttet(avtale)) {
        return (
            <StatusPanel
                header="Oppgradering av tjenesten pågår"
                body={
                    <>
                        <BodyShort size="small" align="center">
                            Avtalen er midlertidig låst for endinger på grunn av teknisk oppgradering.
                            <br />
                            Beklager ulempen dette medfører. Vennligst forsøk igjen om et par timer.
                        </BodyShort>
                    </>
                }
            />
        );
    }

    switch (avtale.status) {
        case 'ANNULLERT':
            return (
                <StatusPanel
                    header="Avtalen er annullert"
                    body={
                        <BodyShort size="small">
                            Veileder har annullert avtalen
                            {avtale.annullertTidspunkt && ` ${formaterDato(avtale.annullertTidspunkt)}`}.
                            {avtale.annullertGrunn && ` Årsak: ${avtale.annullertGrunn}.`}
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
                    header={
                        `Venter på godkjenning av avtalen fra ` +
                        (avtale.godkjentAvVeileder
                            ? 'NAV'
                            : [!avtale.godkjentAvArbeidsgiver && 'arbeidsgiver', !avtale.godkjentAvVeileder && 'NAV']
                                  .filter((x) => x)
                                  .join(' og '))
                    }
                    body={
                        <>
                            <BodyShort size="small">Du har godkjent.</BodyShort>
                            <VerticalSpacer rem={2} />
                        </>
                    }
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

export default DeltakerAvtaleStatus;
