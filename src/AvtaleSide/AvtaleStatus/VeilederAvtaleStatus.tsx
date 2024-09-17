import { BodyShort } from '@navikt/ds-react';
import moment from 'moment';
import React, { useContext } from 'react';

import { AvtaleContext } from '@/AvtaleProvider';
import Avsluttet from '@/AvtaleSide/AvtaleStatus/Avsluttet';
import Gjennomføres from '@/AvtaleSide/AvtaleStatus/Gjennomføres';
import StatusPanel from '@/AvtaleSide/AvtaleStatus/StatusPanel';
import TilskuddsperioderAvslått from '@/AvtaleSide/steg/GodkjenningSteg/TilskuddsperioderAvslått';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { formatterDato, NORSK_DATO_FORMAT } from '@/utils/datoUtils';
import { Avtale } from '@/types/avtale';
import { Feature, FeatureToggleContext } from '@/FeatureToggleProvider';

interface Props {
    avtale: Avtale;
}

type AvtalepartStatus =
    | 'VENTER_PÅ_BESLUTTER'
    | 'VENTER_PÅ_MENTOR'
    | 'VENTER_PÅ_VEILEDER'
    | 'VENTER_PÅ_ARBEIDSGIVER_OG_MENTOR'
    | 'VENTER_PÅ_ARBEIDSGIVER_ARENA'
    | 'VENTER_PÅ_ARBEIDSGIVER'
    | 'VENTER_PÅ_DELTAKER_OG_MENTOR'
    | 'VENTER_PÅ_DELTAKER_ARENA'
    | 'VENTER_PÅ_DELTAKER'
    | 'VENTER_PÅ_ARBEIDSGIVER_DELTAKER_OG_MENTOR'
    | 'VENTER_PÅ_ARBEIDSGIVER_OG_DELTAKER'
    | 'VENTER_PÅ_ARBEIDSGIVER_OG_DELTAKER_ARENA';

const getAvtalepartStatus = (avtale: Avtale): AvtalepartStatus => {
    const isVenterPaMentor = avtale.tiltakstype === 'MENTOR' && !avtale.erGodkjentTaushetserklæringAvMentor;
    const isArena = avtale.opphav === 'ARENA';

    if (avtale.godkjentAvVeileder) {
        return 'VENTER_PÅ_BESLUTTER';
    }
    if (avtale.godkjentAvDeltaker && avtale.godkjentAvArbeidsgiver && isVenterPaMentor) {
        return 'VENTER_PÅ_MENTOR';
    }
    if (avtale.godkjentAvDeltaker && avtale.godkjentAvArbeidsgiver) {
        return 'VENTER_PÅ_VEILEDER';
    }
    if (avtale.godkjentAvDeltaker && isVenterPaMentor) {
        return 'VENTER_PÅ_ARBEIDSGIVER_OG_MENTOR';
    }
    if (avtale.godkjentAvDeltaker && isArena) {
        return 'VENTER_PÅ_ARBEIDSGIVER_ARENA';
    }
    if (avtale.godkjentAvDeltaker) {
        return 'VENTER_PÅ_ARBEIDSGIVER';
    }
    if (avtale.godkjentAvArbeidsgiver && isVenterPaMentor) {
        return 'VENTER_PÅ_DELTAKER_OG_MENTOR';
    }
    if (avtale.godkjentAvArbeidsgiver && isArena) {
        return 'VENTER_PÅ_DELTAKER_ARENA';
    }
    if (avtale.godkjentAvArbeidsgiver) {
        return 'VENTER_PÅ_DELTAKER';
    }
    if (isVenterPaMentor) {
        return 'VENTER_PÅ_ARBEIDSGIVER_DELTAKER_OG_MENTOR';
    }
    if (isArena) {
        return 'VENTER_PÅ_ARBEIDSGIVER_OG_DELTAKER_ARENA';
    }

    return 'VENTER_PÅ_ARBEIDSGIVER_OG_DELTAKER';
};

function VeilederAvtaleStatus(props: Props) {
    const { avtale } = props;
    const { overtaAvtale } = useContext(AvtaleContext);
    const featureToggleContex = useContext(FeatureToggleContext);
    const arbeidstreningReadOnly = featureToggleContex[Feature.ArbeidstreningReadOnly];
    const dagerSidenDeltakerFikkVarsling = moment(avtale.godkjentAvArbeidsgiver).diff(moment().toString(), 'days');

    if (avtale.tiltakstype === 'ARBEIDSTRENING' && arbeidstreningReadOnly) {
        return (
            <StatusPanel
                header="Oppgradering av fagsystemet"
                body={
                    <div style={{ textAlign: 'center' }}>
                        <BodyShort size="small">
                            Migrering fra Arena pågår. Denne avtalen kan ikke redigeres mens migrering pågår. Forsøk
                            igjen om et par timer.
                        </BodyShort>
                        <VerticalSpacer rem={1.5} />
                    </div>
                }
            />
        );
    }

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
                        {avtale.opphav === 'ARBEIDSGIVER' && (
                            <BodyShort size="small">Avtalen er opprettet av arbeidsgiver.</BodyShort>
                        )}
                        {avtale.opphav === 'ARENA' && (
                            <>
                                <BodyShort size="small">
                                    Avtalen er opprettet fra fagsystemet (Arena) hvor deltakeren har status som aktuell,
                                    gjennomføres eller godkjent tiltaksplass.
                                </BodyShort>
                                <VerticalSpacer rem={1} />
                                <BodyShort size="small">
                                    Avtalen er ufullstendig og må fylles ut for at den skal settes som gjennomføres,
                                    eller annulleres for å fjernes.
                                </BodyShort>
                            </>
                        )}
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
        case 'PÅBEGYNT': {
            if (avtale.opphav === 'ARENA') {
                return (
                    <StatusPanel
                        header="Avtalen er ufullstendig og må fylles ut"
                        body={
                            <>
                                <BodyShort size="small">
                                    Avtalen er opprettet fra fagsystemet (Arena) hvor deltakeren har status som aktuell,
                                    gjennomføres eller godkjent tiltaksplass.
                                </BodyShort>
                                <VerticalSpacer rem={1} />
                                <BodyShort size="small">
                                    Avtalen er ufullstendig og må fylles ut for at den skal settes som gjennomføres,
                                    eller annulleres for å fjernes.
                                </BodyShort>
                                <VerticalSpacer rem={1} />
                                <BodyShort size="small">
                                    Du kan godkjenne på vegne av både arbeidsgiver og deltaker.
                                    <br />
                                    De får ingen automatisk varsling om å godkjenne avtalen.
                                </BodyShort>
                            </>
                        }
                    />
                );
            }

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
        }
        case 'MANGLER_GODKJENNING': {
            switch (getAvtalepartStatus(avtale)) {
                case 'VENTER_PÅ_BESLUTTER':
                    return <StatusPanel header="Venter på godkjenning av tilskuddsperioder fra beslutter" />;
                case 'VENTER_PÅ_MENTOR':
                    return (
                        <StatusPanel
                            header="Venter på signering av mentor"
                            body={
                                <BodyShort size="small">
                                    Mentor må signere taushetserklæringen før du kan godkjenne avtalen.
                                </BodyShort>
                            }
                        />
                    );
                case 'VENTER_PÅ_VEILEDER':
                    return (
                        <StatusPanel
                            header="Du kan godkjenne"
                            body={
                                <BodyShort size="small">
                                    Før du godkjenner avtalen må du sjekke at alt er i orden og innholdet er riktig.
                                </BodyShort>
                            }
                        />
                    );
                case 'VENTER_PÅ_ARBEIDSGIVER_OG_MENTOR':
                    return (
                        <StatusPanel
                            header="Venter på godkjenning av avtalen fra arbeidsgiver og signering av mentor"
                            body={
                                <BodyShort size="small">
                                    Avtalen må godkjennes av arbeidsgiver. Arbeidsgiver fikk en automatisk varsling på
                                    Min side Arbeidsgiver når avtalen ble opprettet. Mentor må signere
                                    taushetserklæringen før du kan godkjenne avtalen.
                                </BodyShort>
                            }
                        />
                    );
                case 'VENTER_PÅ_ARBEIDSGIVER_ARENA':
                    return (
                        <StatusPanel
                            header="Venter på godkjenning av avtalen fra arbeidsgiver"
                            body={
                                <BodyShort size="small">
                                    Avtalen er nå ferdig utfylt.
                                    <br />
                                    Du kan godkjenne på vegne av arbeidsgiver.
                                    <br />
                                    Arbeidsgiver får ingen automatisk varsling om å godkjenne avtalen.
                                </BodyShort>
                            }
                        />
                    );
                case 'VENTER_PÅ_ARBEIDSGIVER':
                    return (
                        <StatusPanel
                            header="Venter på godkjenning av avtalen fra arbeidsgiver"
                            body={
                                <BodyShort size="small">
                                    Avtalen må godkjennes av arbeidsgiver. Arbeidsgiver fikk en automatisk varsling på
                                    Min side Arbeidsgiver når avtalen ble opprettet.
                                </BodyShort>
                            }
                        />
                    );
                case 'VENTER_PÅ_DELTAKER_OG_MENTOR':
                    return (
                        <StatusPanel
                            header="Venter på godkjenning av avtalen fra deltaker og signering av mentor"
                            body={
                                <BodyShort size="small">
                                    Avtalen må godkjennes av deltaker Deltaker fikk en varsling på min side Personbruker
                                    om å godkjenne avtalen for {-dagerSidenDeltakerFikkVarsling} dager siden. Mentor må
                                    signere taushetserklæringen før du kan godkjenne avtalen.
                                </BodyShort>
                            }
                        />
                    );
                case 'VENTER_PÅ_DELTAKER_ARENA':
                    return (
                        <StatusPanel
                            header="Venter på godkjenning av avtalen fra deltaker"
                            body={
                                <BodyShort size="small">
                                    Avtalen er nå ferdig utfylt.
                                    <br />
                                    Du kan godkjenne på vegne av deltaker.
                                    <br />
                                    Deltaker får ingen automatisk varsling om å godkjenne avtalen.
                                </BodyShort>
                            }
                        />
                    );
                case 'VENTER_PÅ_DELTAKER':
                    return (
                        <StatusPanel
                            header="Venter på godkjenning av avtalen fra deltaker"
                            body={
                                <BodyShort size="small">
                                    Avtalen må godkjennes av deltaker. Deltaker fikk en varsling på min side på NAV.no
                                    om å godkjenne avtalen for {-dagerSidenDeltakerFikkVarsling} dager siden.
                                </BodyShort>
                            }
                        />
                    );
                case 'VENTER_PÅ_ARBEIDSGIVER_DELTAKER_OG_MENTOR':
                    return (
                        <StatusPanel
                            header="Venter på godkjenning av avtalen fra de andre partene"
                            body={
                                <BodyShort size="small">
                                    Avtalen må godkjennes av arbeidsgiver og deltaker. Arbeidsgiver fikk en automatisk
                                    varsling på Min side Arbeidsgiver når avtalen ble opprettet. Deltaker vil få en
                                    varsling etter at arbeidsgiver har godkjent avtalen. Mentor må signere
                                    taushetserklæringen.
                                </BodyShort>
                            }
                        />
                    );
                case 'VENTER_PÅ_ARBEIDSGIVER_OG_DELTAKER_ARENA':
                    return (
                        <StatusPanel
                            header="Avtalen må godkjennes"
                            body={
                                <BodyShort size="small">
                                    Avtalen er nå ferdig utfylt.
                                    <br />
                                    Du kan godkjenne på vegne av både arbeidsgiver og deltaker.
                                    <br />
                                    De får ingen automatisk varsling om å godkjenne avtalen.
                                </BodyShort>
                            }
                        />
                    );
                case 'VENTER_PÅ_ARBEIDSGIVER_OG_DELTAKER':
                    return (
                        <StatusPanel
                            header="Venter på godkjenning av avtalen fra de andre partene"
                            body={
                                <BodyShort size="small">
                                    Avtalen må godkjennes av arbeidsgiver og deltaker. Arbeidsgiver fikk en automatisk
                                    varsling på Min side Arbeidsgiver når avtalen ble opprettet. Deltaker vil få en
                                    varsling etter at arbeidsgiver har godkjent avtalen.
                                </BodyShort>
                            }
                        />
                    );
            }
        }
        case 'KLAR_FOR_OPPSTART':
            return ['SOMMERJOBB', 'MIDLERTIDIG_LONNSTILSKUDD', 'VARIG_LONNSTILSKUDD'].includes(avtale.tiltakstype) ? (
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
}

export default VeilederAvtaleStatus;
