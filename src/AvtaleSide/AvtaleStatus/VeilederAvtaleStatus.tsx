import { BodyShort } from '@navikt/ds-react';

import { useAvtale } from '@/AvtaleProvider';
import Avsluttet from '@/AvtaleSide/AvtaleStatus/Avsluttet';
import Gjennomføres from '@/AvtaleSide/AvtaleStatus/Gjennomføres';
import StatusPanel from '@/AvtaleSide/AvtaleStatus/StatusPanel';
import TilskuddsperioderReturnert from '@/AvtaleSide/steg/GodkjenningSteg/TilskuddsperioderReturnert';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { Avtale, TiltaksType } from '@/types/avtale';
import { formaterDato, NORSK_DATO_FORMAT_FULL, tidSidenTidspunkt } from '@/utils/datoUtils';
import { erNil } from '@/utils/predicates';
import OppfolgingKreves from './OppfolgingKreves';
import { useMigreringSkrivebeskyttet } from '@/FeatureToggles';

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

const arenaMigreringTekst = (avtale: Avtale) => (
    <>
        <BodyShort size="small">
            Avtalen er ${avtale.opphav === 'ARENA' ? 'opprettet fra ' : 'oppdatert av '}
            fagsystemet (Arena) hvor deltakeren har status som gjennomføres eller godkjent tiltaksplass.
        </BodyShort>
        <VerticalSpacer rem={1} />
        <BodyShort size="small">
            $
            {avtale.opphav === 'ARENA' && (
                <>
                    Avtalen er ufullstendig og må fylles ut og godkjennes av alle parter for at den skal settes som
                    gjennomføres.
                </>
            )}
            $
            {avtale.gjeldendeInnhold.innholdType === 'ENDRET_AV_ARENA' && (
                <>
                    Avtalen har fått nye felter. For at avtalen skal kunne settes som gjennomføres må alt fylles ut og
                    godkjennes på nytt av alle parter.
                </>
            )}
        </BodyShort>
        <VerticalSpacer rem={1} />
        <BodyShort size="small">
            Sjekk at avtalen ${avtale.opphav === 'ARENA' ? 'er opprettet på ' : 'inneholder '}
            riktig virksomhetsnummer hos arbeidsgiver, da utbetalingene går automatisk.
        </BodyShort>
    </>
);

function VeilederAvtaleStatus(props: Props) {
    const { avtale } = props;
    const { overtaAvtale } = useAvtale();
    const erSkrivebeskyttet = useMigreringSkrivebeskyttet();

    const kreverOppfølging = !erNil(avtale.oppfolgingVarselSendt);

    const skalViseReturnertTilskuddsperiode =
        avtale.godkjentAvVeileder &&
        avtale.status !== 'ANNULLERT' &&
        avtale.tilskuddPeriode.find(
            (t) => t.status === 'AVSLÅTT' && t.løpenummer === avtale.gjeldendeTilskuddsperiode?.løpenummer,
        ) &&
        avtale.gjeldendeTilskuddsperiode?.status !== 'GODKJENT';

    if (erSkrivebeskyttet(avtale)) {
        return (
            <StatusPanel
                header="Migrering fra Arena pågår"
                body={
                    <BodyShort size="small" align="center">
                        Denne avtalen kan ikke redigeres mens migrering pågår. Forsøk igjen om et par timer.
                    </BodyShort>
                }
            />
        );
    }

    if (skalViseReturnertTilskuddsperiode) {
        return <TilskuddsperioderReturnert />;
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
                        {(avtale.opphav === 'ARENA' || avtale.gjeldendeInnhold.innholdType === 'ENDRET_AV_ARENA') &&
                            arenaMigreringTekst(avtale)}
                        <VerticalSpacer rem={1.5} />
                        <LagreKnapp lagre={() => overtaAvtale()} suksessmelding="Avtale tildelt">
                            Overta avtale
                        </LagreKnapp>
                    </div>
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
                        <>
                            <BodyShort size="small">
                                Du eller en annen veileder har annullert avtalen{' '}
                                {formaterDato(avtale.annullertTidspunkt!)}.
                            </BodyShort>
                            <BodyShort size="small">Årsak: {avtale.annullertGrunn}.</BodyShort>
                        </>
                    }
                />
            );
        case 'PÅBEGYNT': {
            if (avtale.opphav === 'ARENA' || avtale.gjeldendeInnhold.innholdType === 'ENDRET_AV_ARENA') {
                return (
                    <StatusPanel header="Avtalen er ufullstendig og må fylles ut" body={arenaMigreringTekst(avtale)} />
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
                                    Avtalen må godkjennes av deltaker.{' '}
                                    {avtale.godkjentAvArbeidsgiver && (
                                        <>
                                            Deltaker fikk en varsling på min side Personbruker om å godkjenne avtalen
                                            for {tidSidenTidspunkt(avtale.godkjentAvArbeidsgiver)} siden.
                                        </>
                                    )}{' '}
                                    Mentor må signere taushetserklæringen før du kan godkjenne avtalen.
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
                                    Avtalen må godkjennes av deltaker.
                                    {avtale.godkjentAvArbeidsgiver && (
                                        <>
                                            Deltaker fikk en varsling på min side på NAV.no om å godkjenne avtalen for{' '}
                                            {tidSidenTidspunkt(avtale.godkjentAvArbeidsgiver)} siden
                                        </>
                                    )}
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
        case 'KLAR_FOR_OPPSTART': {
            if (['SOMMERJOBB', 'MIDLERTIDIG_LONNSTILSKUDD', 'VARIG_LONNSTILSKUDD'].includes(avtale.tiltakstype)) {
                return (
                    <StatusPanel
                        header="Avtalen er ferdig utfylt og godkjent"
                        body={
                            <>
                                <BodyShort size="small">
                                    Avtale ble inngått {formaterDato(avtale.avtaleInngått!, NORSK_DATO_FORMAT_FULL)}.
                                    Tiltaket starter{' '}
                                    {formaterDato(avtale.gjeldendeInnhold.startDato!, NORSK_DATO_FORMAT_FULL)}.
                                </BodyShort>
                                <VerticalSpacer rem={1} />
                                <BodyShort size="small">
                                    Alle parter har nå godkjent avtalen og beslutter har godkjent tilskudd. Deltaker får
                                    nå et vedtaksbrev på min side Personbruker. Arbeidsgiver og eller kontaktperson for
                                    refusjon vil nå motta automatisk varsling på SMS for å sende inn refusjoner. Du skal
                                    ikke registrere tiltaksgjennomføringen i Arena. Avtalen journalføres automatisk i
                                    Gosys.
                                </BodyShort>
                            </>
                        }
                    />
                );
            }

            if (['ARBEIDSTRENING', 'VTAO'].includes(avtale.tiltakstype)) {
                return (
                    <StatusPanel
                        header="Avtalen er ferdig utfylt og godkjent"
                        body={
                            <>
                                <BodyShort size="small">
                                    Avtale ble inngått {formaterDato(avtale.avtaleInngått!, NORSK_DATO_FORMAT_FULL)}.{' '}
                                    Tiltaket starter{' '}
                                    {formaterDato(avtale.gjeldendeInnhold.startDato!, NORSK_DATO_FORMAT_FULL)}.
                                </BodyShort>
                                <VerticalSpacer rem={1} />
                                <BodyShort size="small">
                                    Alle parter har nå godkjent avtalen.{' '}
                                    {avtale.opphav !== 'ARENA' && (
                                        <>Deltaker får nå et vedtaksbrev på min side Personbruker. </>
                                    )}
                                    Du skal ikke registrere tiltaksgjennomføringen i Arena. Avtalen journalføres
                                    automatisk i Gosys.
                                </BodyShort>
                            </>
                        }
                    />
                );
            }

            return (
                <StatusPanel
                    header="Avtalen er ferdig utfylt og godkjent"
                    body={
                        <>
                            <BodyShort size="small">
                                Avtale ble inngått {formaterDato(avtale.avtaleInngått!, NORSK_DATO_FORMAT_FULL)}.{' '}
                                Tiltaket starter{' '}
                                {formaterDato(avtale.gjeldendeInnhold.startDato!, NORSK_DATO_FORMAT_FULL)}.
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
        }
        case 'GJENNOMFØRES': {
            if (kreverOppfølging) {
                return <OppfolgingKreves oppfølgingsFrist={avtale.kreverOppfolgingFrist} />;
            } else {
                return (
                    <Gjennomføres avtaleInngått={avtale.avtaleInngått} startDato={avtale.gjeldendeInnhold.startDato} />
                );
            }
        }
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
