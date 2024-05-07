import { AvtaleContext } from '@/AvtaleProvider';
import Avsluttet from '@/AvtaleSide/AvtaleStatus/Avsluttet';
import Gjennomføres from '@/AvtaleSide/AvtaleStatus/Gjennomføres';
import StatusPanel from '@/AvtaleSide/AvtaleStatus/StatusPanel';
import TilskuddsperioderAvslått from '@/AvtaleSide/steg/GodkjenningSteg/TilskuddsperioderAvslått';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { Avtale, Avtaleinnhold } from '@/types/avtale';
import { formatterDato, NORSK_DATO_FORMAT } from '@/utils/datoUtils';
import { BodyShort } from '@navikt/ds-react';
import React, { FunctionComponent, useContext } from 'react';

interface Props {
    avtale: Pick<
        Avtale,
        | 'erUfordelt'
        | 'statusSomEnum'
        | 'annullertTidspunkt'
        | 'tiltakstype'
        | 'tilskuddPeriode'
        | 'godkjentAvDeltaker'
        | 'godkjentAvArbeidsgiver'
        | 'godkjentAvVeileder'
        | 'gjeldendeTilskuddsperiode'
        | 'avtaleInngått'
        | 'erAnnullertEllerAvbrutt'
        | 'annullertGrunn'
        | 'avbruttGrunn'
    > & { gjeldendeInnhold: Pick<Avtaleinnhold, 'startDato' | 'sluttDato'> };
}

const VeilederAvtaleStatus: FunctionComponent<Props> = ({ avtale }) => {
    const { overtaAvtale } = useContext(AvtaleContext);

    const skalViseAvslåttTilskuddsperiode =
        avtale.godkjentAvVeileder &&
        !avtale.erAnnullertEllerAvbrutt &&
        avtale.tilskuddPeriode.find(
            (t) => t.status === 'AVSLÅTT' && t.løpenummer === avtale.gjeldendeTilskuddsperiode?.løpenummer,
        ) &&
        avtale.gjeldendeTilskuddsperiode?.status !== 'GODKJENT';

    if (skalViseAvslåttTilskuddsperiode) {
        return <TilskuddsperioderAvslått />;
    }

    if (avtale.erUfordelt) {
        return (
            <StatusPanel
                header="Avtalen er ufordelt"
                body={
                    <div style={{ textAlign: 'center' }}>
                        <BodyShort size="small">
                            Avtalen er opprettet av arbeidsgiver. Den er ikke tildelt en veileder ennå.
                        </BodyShort>
                        <VerticalSpacer rem={1.5} />
                        <LagreKnapp
                            lagre={() => overtaAvtale()}
                            label="Overta avtale"
                            suksessmelding="Avtale tildelt"
                        />
                    </div>
                }
            />
        );
    }

    switch (avtale.statusSomEnum) {
        case 'ANNULLERT':
            return (
                <StatusPanel
                    header="Tiltaket er annullert"
                    body={
                        <BodyShort size="small">
                            Du eller en annen veileder har annullert tiltaket{' '}
                            {formatterDato(avtale.annullertTidspunkt!)}. Årsak: {avtale.annullertGrunn}.
                        </BodyShort>
                    }
                />
            );
        case 'AVBRUTT':
            return (
                <StatusPanel
                    header="Tiltaket er avbrutt"
                    body={
                        <BodyShort size="small">
                            Du eller en annen veileder har avbrutt tiltaket. Årsak: {avtale.avbruttGrunn}.
                        </BodyShort>
                    }
                />
            );
        case 'PÅBEGYNT':
            return <StatusPanel header="Du må fylle ut avtalen" />;
        case 'MANGLER_GODKJENNING': {
            if (avtale.godkjentAvVeileder) {
                return (
                    <StatusPanel
                        header="Venter på godkjenning fra beslutter"
                        body={
                            <>
                                <BodyShort size="small">Venter på godkjenning fra beslutter.</BodyShort>
                                <VerticalSpacer rem={2} />
                            </>
                        }
                    />
                );
            } else if (avtale.godkjentAvDeltaker && avtale.godkjentAvArbeidsgiver) {
                return (
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
            } else {
                return (
                    <StatusPanel
                        header="Venter på godkjenning"
                        body={
                            <>
                                <BodyShort size="small">
                                    Deltaker og arbeidsgiver må ha godkjent avtalen før du kan godkjenne.
                                </BodyShort>
                                <VerticalSpacer rem={2} />
                            </>
                        }
                    />
                );
            }
        }
        case 'KLAR_FOR_OPPSTART':
            return avtale.tiltakstype === 'SOMMERJOBB' ||
                avtale.tiltakstype === 'MIDLERTIDIG_LONNSTILSKUDD' ||
                avtale.tiltakstype === 'VARIG_LONNSTILSKUDD' ? (
                <StatusPanel
                    header="Avtalen er ferdig utfylt og godkjent"
                    body={
                        <>
                            <BodyShort size="small">
                                Avtale ble inngått {formatterDato(avtale.avtaleInngått!, NORSK_DATO_FORMAT)}. Tiltaket
                                starter {formatterDato(avtale.gjeldendeInnhold.startDato!, NORSK_DATO_FORMAT)}.
                            </BodyShort>
                            <VerticalSpacer rem={1} />
                            <BodyShort size="small">
                                Du skal ikke registrere tiltaksgjennomføringen i Arena. Avtalen journalføres automatisk
                                i Gosys.
                            </BodyShort>
                        </>
                    }
                />
            ) : (
                <StatusPanel
                    header="Avtalen er ferdig utfylt og godkjent"
                    body={
                        <>
                            <BodyShort size="small">
                                Avtale ble inngått {formatterDato(avtale.avtaleInngått!, NORSK_DATO_FORMAT)}. Tiltaket
                                starter {formatterDato(avtale.gjeldendeInnhold.startDato!, NORSK_DATO_FORMAT)}.
                            </BodyShort>
                            <VerticalSpacer rem={1} />
                            <BodyShort size="small">
                                Du må fullføre registreringen i Arena. Avtalen journalføres automatisk i Gosys.
                            </BodyShort>
                        </>
                    }
                />
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

export default VeilederAvtaleStatus;
