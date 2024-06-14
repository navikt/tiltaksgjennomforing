import { AvtaleContext } from '@/AvtaleProvider';
import Avsluttet from '@/AvtaleSide/AvtaleStatus/Avsluttet';
import Gjennomføres from '@/AvtaleSide/AvtaleStatus/Gjennomføres';
import StatusPanel from '@/AvtaleSide/AvtaleStatus/StatusPanel';
import TilskuddsperioderAvslått from '@/AvtaleSide/steg/GodkjenningSteg/TilskuddsperioderAvslått';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { Avtale, Avtaleinnhold } from '@/types/avtale';
import { formatterDato, NORSK_DATO_FORMAT } from '@/utils/datoUtils';
import { BodyShort, Link } from '@navikt/ds-react';
import moment from 'moment';
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
        | 'erGodkjentTaushetserklæringAvMentor'
        | 'gjeldendeTilskuddsperiode'
        | 'avtaleInngått'
        | 'erAnnullertEllerAvbrutt'
        | 'annullertGrunn'
        | 'avbruttGrunn'
    > & { gjeldendeInnhold: Pick<Avtaleinnhold, 'startDato' | 'sluttDato'> };
}

const VeilederAvtaleStatus: FunctionComponent<Props> = ({ avtale }) => {
    const { overtaAvtale } = useContext(AvtaleContext);
    const dagerSidenDeltakerFikkVarsling = moment(avtale.godkjentAvArbeidsgiver).diff(moment().toString(), 'days');

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
                header="Avtalen er ikke fordelt til en veileder i NAV enda"
                body={
                    <div style={{ textAlign: 'center' }}>
                        <BodyShort size="small">Avtalen er opprettet av arbeidsgiver.</BodyShort>
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
                    header="Avtalen er annullert"
                    body={
                        <BodyShort size="small">
                            Du eller en annen veileder har annullert avtalen {formatterDato(avtale.annullertTidspunkt!)}
                            . Årsak: {avtale.annullertGrunn}.
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
                            Du eller en annen veileder har avbrutt avtalen. Årsak: {avtale.avbruttGrunn}.
                        </BodyShort>
                    }
                />
            );
        case 'PÅBEGYNT':
            return (
                <StatusPanel
                    header="Innholdet i avtalen fylles ut av arbeidsgiver og veileder"
                    body={
                        <>
                            <BodyShort size="small">
                                Avtalen er nå tilgjengelig for arbeidsgiver på Min Side Arbeidsgiver.
                            </BodyShort>
                            <BodyShort size="small">
                                Det sendes foreløpig ikke en automatisk SMS, men du kan dele denne lenken med
                                arbeidsgiver <strong>https://arbeidsgiver.nav.no/tiltaksgjennomforing</strong>
                            </BodyShort>
                            <VerticalSpacer rem={1} />
                            <BodyShort size="small">
                                Deltaker får en automatisk SMS når arbeidsgiver har godkjent avtalen.
                            </BodyShort>
                        </>
                    }
                />
            );
        case 'MANGLER_GODKJENNING': {
            if (avtale.godkjentAvVeileder) {
                return <StatusPanel header="Venter på godkjenning av tilskuddsperioder fra beslutter" />;
            } else if (avtale.godkjentAvDeltaker && avtale.godkjentAvArbeidsgiver) {
                return avtale.tiltakstype === 'MENTOR' ? (
                    <StatusPanel
                        header="Venter på signering av mentor"
                        body={
                            <BodyShort size="small">
                                Mentor må signere taushetserklæringen før du kan godkjenne avtalen.
                            </BodyShort>
                        }
                    />
                ) : (
                    <StatusPanel
                        header="Du kan godkjenne"
                        body={
                            <BodyShort size="small">
                                Før du godkjenner avtalen må du sjekke at alt er i orden og innholdet er riktig.
                            </BodyShort>
                        }
                    />
                );
            } else if (avtale.godkjentAvDeltaker) {
                return avtale.tiltakstype === 'MENTOR' && !avtale.erGodkjentTaushetserklæringAvMentor ? (
                    <StatusPanel
                        header="Venter på godkjenning av avtalen fra arbeidsgiver og signering av mentor"
                        body={
                            <BodyShort size="small">
                                Avtalen må godkjennes av arbeidsgiver. Arbeidsgiver fikk en automatisk varsling på Min
                                side Arbeidsgiver når avtalen ble opprettet. Mentor må signere taushetserklæringen før
                                du kan godkjenne avtalen.
                            </BodyShort>
                        }
                    />
                ) : (
                    <StatusPanel
                        header="Venter på godkjenning av avtalen fra arbeidsgiver"
                        body={
                            <BodyShort size="small">
                                Avtalen må godkjennes av arbeidsgiver. Arbeidsgiver fikk en automatisk varsling på Min
                                side Arbeidsgiver når avtalen ble opprettet.
                            </BodyShort>
                        }
                    />
                );
            } else if (avtale.godkjentAvArbeidsgiver) {
                return avtale.tiltakstype === 'MENTOR' && !avtale.erGodkjentTaushetserklæringAvMentor ? (
                    <StatusPanel
                        header="Venter på godkjenning av avtalen fra deltaker og signering av mentor"
                        body={
                            <BodyShort size="small">
                                Avtalen må godkjennes av deltaker Deltaker fikk en varsling på min side Personbruker om
                                å godkjenne avtalen for {-dagerSidenDeltakerFikkVarsling} dager siden. Mentor må signere
                                taushetserklæringen før du kan godkjenne avtalen.{' '}
                            </BodyShort>
                        }
                    />
                ) : (
                    <StatusPanel
                        header="Venter på godkjenning av avtalen fra deltaker"
                        body={
                            <BodyShort size="small">
                                Avtalen må godkjennes av deltaker. Deltaker fikk en varsling på min side på NAV.no om å
                                godkjenne avtalen for {-dagerSidenDeltakerFikkVarsling} dager siden.
                            </BodyShort>
                        }
                    />
                );
            } else {
                return avtale.tiltakstype === 'MENTOR' && !avtale.erGodkjentTaushetserklæringAvMentor ? (
                    <StatusPanel
                        header="Venter på godkjenning av avtalen fra de andre partene"
                        body={
                            <BodyShort size="small">
                                Avtalen må godkjennes av arbeidsgiver og deltaker. Arbeidsgiver fikk en automatisk
                                varsling på Min side Arbeidsgiver når avtalen ble opprettet. Deltaker vil få en varsling
                                etter at arbeidsgiver har godkjent avtalen. Mentor må signere taushetserklæringen.
                            </BodyShort>
                        }
                    />
                ) : (
                    <StatusPanel
                        header="Venter på godkjenning av avtalen fra de andre partene"
                        body={
                            <BodyShort size="small">
                                Avtalen må godkjennes av arbeidsgiver og deltaker. Arbeidsgiver fikk en automatisk
                                varsling på Min side Arbeidsgiver når avtalen ble opprettet. Deltaker vil få en varsling
                                etter at arbeidsgiver har godkjent avtalen.
                            </BodyShort>
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
                                Alle parter har nå godkjent avtalen og beslutter har godkjent tilskudd. Deltaker får nå
                                et vedtaksbrev på min side Personbruker. Arbeidsgiver og eller kontaktperson for
                                refusjon vil nå motta automatisk varsling på SMS for å sende inn refusjoner. Du skal
                                ikke registrere tiltaksgjennomføringen i Arena. Avtalen journalføres automatisk i Gosys.
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
                                Alle parter har nå godkjent avtalen. Du må fullføre registreringen i Arena. Avtalen
                                journalføres automatisk i Gosys.
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
