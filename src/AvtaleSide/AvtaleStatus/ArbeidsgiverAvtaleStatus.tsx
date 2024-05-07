import { AvtaleContext } from '@/AvtaleProvider';
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
        | 'erUfordelt'
        | 'statusSomEnum'
        | 'annullertTidspunkt'
        | 'godkjentAvArbeidsgiver'
        | 'avtaleInngått'
        | 'annullertGrunn'
        | 'avbruttGrunn'
    > & { gjeldendeInnhold: Pick<Avtaleinnhold, 'startDato' | 'sluttDato'> };
}

const ArbeidsgiverAvtaleStatus: FunctionComponent<Props> = ({ avtale }) => {
    if (avtale.erUfordelt) {
        return (
            <StatusPanel
                header={'Avtalen er ikke fordelt til en veileder i NAV enda'}
                body={
                    <BodyShort size="small">
                        Du kan likevel begynne å fylle ut avtalen. Når avtalen har blitt tildelt en veileder kan alle
                        parter godkjenne avtalen.
                    </BodyShort>
                }
            />
        );
    }

    switch (avtale.statusSomEnum) {
        case 'ANNULLERT':
            return (
                <StatusPanel
                    header={'Tiltaket er annullert'}
                    body={
                        <BodyShort size="small">
                            Veileder har annullert tiltaket {formatterDato(avtale.annullertTidspunkt!)}.
                        </BodyShort>
                    }
                />
            );
        case 'AVBRUTT':
            return (
                <StatusPanel
                    header={'Tiltaket er avbrutt'}
                    body={<BodyShort size="small">Veileder har avbrutt tiltaket</BodyShort>}
                />
            );
        case 'PÅBEGYNT':
            return <StatusPanel header="Du må fylle ut avtalen" />;
        case 'MANGLER_GODKJENNING':
            return avtale.godkjentAvArbeidsgiver ? (
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

export default ArbeidsgiverAvtaleStatus;
