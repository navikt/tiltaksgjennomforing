import CheckIkon from '@/assets/ikoner/check.svg?react';
import PabegyntIkon from '@/assets/ikoner/pabegynt.svg?react';
import AvbruttIkon from '@/assets/ikoner/stop.svg?react';
import VarselIkon from '@/assets/ikoner/varsel.svg?react';
import { AvtaleContext } from '@/AvtaleProvider';
import Avsluttet from '@/AvtaleSide/AvtaleStatus/Avsluttet';
import Gjennomføres from '@/AvtaleSide/AvtaleStatus/Gjennomføres';
import StatusPanel from '@/AvtaleSide/AvtaleStatus/StatusPanel';
import GodkjenningStatus from '@/AvtaleSide/steg/GodkjenningSteg/GodkjenningStatus/GodkjenningStatus';
import TilskuddsperioderAvslått from '@/AvtaleSide/steg/GodkjenningSteg/TilskuddsperioderAvslått';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { formatterDato, NORSK_DATO_FORMAT } from '@/utils/datoUtils';
import { BodyShort } from '@navikt/ds-react';
import React, { FunctionComponent, useContext } from 'react';

const VeilederAvtaleStatus: FunctionComponent = () => {
    const { avtale, overtaAvtale } = useContext(AvtaleContext);

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
                ikon={PabegyntIkon}
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
                    ikon={AvbruttIkon}
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
                    ikon={AvbruttIkon}
                    header="Tiltaket er avbrutt"
                    body={
                        <BodyShort size="small">
                            Du eller en annen veileder har avbrutt tiltaket. Årsak: {avtale.avbruttGrunn}.
                        </BodyShort>
                    }
                />
            );
        case 'PÅBEGYNT':
            return <StatusPanel ikon={PabegyntIkon} header="Du må fylle ut avtalen" />;
        case 'MANGLER_GODKJENNING': {
            if (avtale.godkjentAvVeileder) {
                return (
                    <StatusPanel
                        ikon={VarselIkon}
                        header="Venter på godkjenning fra beslutter"
                        body={
                            <>
                                <BodyShort size="small">Venter på godkjenning fra beslutter.</BodyShort>
                                <VerticalSpacer rem={2} />
                                <GodkjenningStatus avtale={avtale} />
                            </>
                        }
                    />
                );
            } else if (avtale.godkjentAvDeltaker && avtale.godkjentAvArbeidsgiver) {
                return (
                    <StatusPanel
                        ikon={VarselIkon}
                        header="Du kan godkjenne"
                        body={
                            <>
                                <BodyShort size="small">
                                    Før du godkjenner avtalen må du sjekke at alt er i orden og innholdet er riktig.
                                </BodyShort>
                                <VerticalSpacer rem={2} />
                                <GodkjenningStatus avtale={avtale} />
                            </>
                        }
                    />
                );
            } else {
                return (
                    <StatusPanel
                        ikon={VarselIkon}
                        header="Venter på godkjenning"
                        body={
                            <>
                                <BodyShort size="small">
                                    Deltaker og arbeidsgiver må ha godkjent avtalen før du kan godkjenne.
                                </BodyShort>
                                <VerticalSpacer rem={2} />
                                <GodkjenningStatus avtale={avtale} />
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
                    ikon={CheckIkon}
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
                    ikon={CheckIkon}
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
            return <Gjennomføres avtale={avtale} />;
        case 'AVSLUTTET':
            return <Avsluttet avtale={avtale} />;
    }

    return null;
};

export default VeilederAvtaleStatus;
