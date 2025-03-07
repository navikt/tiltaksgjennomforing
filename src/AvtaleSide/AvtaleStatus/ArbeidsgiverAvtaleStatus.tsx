import Avsluttet from '@/AvtaleSide/AvtaleStatus/Avsluttet';
import Gjennomføres from '@/AvtaleSide/AvtaleStatus/Gjennomføres';
import KlarForOppstart from '@/AvtaleSide/AvtaleStatus/KlarForOppstart';
import StatusPanel from '@/AvtaleSide/AvtaleStatus/StatusPanel';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { Avtale } from '@/types/avtale';
import { formaterDato } from '@/utils/datoUtils';
import { BodyShort } from '@navikt/ds-react';
import React, { FunctionComponent } from 'react';

interface Props {
    avtale: Avtale;
}

const ArbeidsgiverAvtaleStatus: FunctionComponent<Props> = ({ avtale }) => {
    if (avtale.erUfordelt) {
        return (
            <StatusPanel
                header={'Avtalen er ikke fordelt til en veileder i NAV enda'}
                body={<BodyShort size="small">Du kan begynne å fylle ut avtalen.</BodyShort>}
            />
        );
    }

    switch (avtale.status) {
        case 'ANNULLERT':
            return (
                <StatusPanel
                    header={'Avtalen er annullert'}
                    body={
                        <BodyShort size="small">
                            Veileder har annullert avtalen {formaterDato(avtale.annullertTidspunkt!)}.
                        </BodyShort>
                    }
                />
            );
        case 'AVBRUTT':
            return (
                <StatusPanel
                    header={'Avtalen er avbrutt'}
                    body={
                        <BodyShort size="small">Veileder har avbrutt avtalen. Årsak: {avtale.avbruttGrunn}.</BodyShort>
                    }
                />
            );
        case 'PÅBEGYNT':
            return <StatusPanel header={'Innholdet i avtalen fylles ut av arbeidsgiver og veileder'} />;
        case 'MANGLER_GODKJENNING': {
            return !avtale.godkjentAvArbeidsgiver ? (
                <StatusPanel
                    header="Du kan godkjenne avtalen"
                    body={
                        <BodyShort size="small">
                            Før du godkjenner avtalen må du sjekke at alt er i orden og innholdet er riktig.
                        </BodyShort>
                    }
                />
            ) : (
                <StatusPanel
                    header={
                        `Venter på godkjenning av avtalen fra ` +
                        (avtale.godkjentAvVeileder
                            ? 'NAV'
                            : [!avtale.godkjentAvDeltaker && 'deltaker', !avtale.godkjentAvVeileder && 'NAV']
                                  .filter((x) => x)
                                  .join(' og '))
                    }
                    body={
                        <>
                            <BodyShort size="small">Du har godkjent.</BodyShort>
                            <VerticalSpacer rem={2} />
                        </>
                    }
                ></StatusPanel>
            );
        }
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

export default ArbeidsgiverAvtaleStatus;
