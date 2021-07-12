import React, { FunctionComponent, useContext } from 'react';
import { ReactComponent as AvbruttIkon } from '@/assets/ikoner/stop.svg';
import { Normaltekst } from 'nav-frontend-typografi';
import StatusPanel from '@/AvtaleSide/AvtaleStatus/StatusPanel';
import { formatterDato, NORSK_DATO_FORMAT } from '@/utils/datoUtils';
import { ReactComponent as PabegyntIkon } from '@/assets/ikoner/pabegynt.svg';
import Avsluttet from '@/AvtaleSide/AvtaleStatus/Avsluttet';
import Gjennomføres from '@/AvtaleSide/AvtaleStatus/Gjennomføres';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import { AvtaleContext } from '@/AvtaleProvider';
import { ReactComponent as VarselIkon } from '@/assets/ikoner/varsel.svg';
import GodkjenningStatus from '@/AvtaleSide/steg/GodkjenningSteg/GodkjenningStatus/GodkjenningStatus';
import TilskuddsperioderAvslått from '@/AvtaleSide/steg/GodkjenningSteg/TilskuddsperioderAvslått';
import { ReactComponent as CheckIkon } from '@/assets/ikoner/check.svg';

const VeilederAvtaleStatus: FunctionComponent = () => {
    const { avtale, overtaAvtale } = useContext(AvtaleContext);

    const skalViseAvslåttTilskuddsperiode =
        avtale.erLaast &&
        avtale.tilskuddPeriode.find(
            t => t.status === 'AVSLÅTT' && t.løpenummer === avtale.gjeldendeTilskuddsperiode?.løpenummer
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
                        <Normaltekst>
                            Avtalen er opprettet av arbeidsgiver. Den er ikke tildelt en veileder ennå.
                        </Normaltekst>
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
                        <Normaltekst>
                            Du eller en annen veileder har annullert tiltaket{' '}
                            {formatterDato(avtale.annullertTidspunkt!)}. Årsak: {avtale.annullertGrunn}.
                        </Normaltekst>
                    }
                />
            );
        case 'AVBRUTT':
            return (
                <StatusPanel
                    ikon={AvbruttIkon}
                    header="Tiltaket er avbrutt"
                    body={
                        <Normaltekst>
                            Du eller en annen veileder har avbrutt tiltaket. Årsak: {avtale.avbruttGrunn}.
                        </Normaltekst>
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
                                <Normaltekst>Venter på godkjenning fra beslutter.</Normaltekst>
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
                                <Normaltekst>
                                    Før du godkjenner avtalen må du sjekke at alt er i orden og innholdet er riktig.
                                </Normaltekst>
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
                                <Normaltekst>
                                    Deltaker og arbeidsgiver må ha godkjent avtalen før du kan godkjenne.
                                </Normaltekst>
                                <VerticalSpacer rem={2} />
                                <GodkjenningStatus avtale={avtale} />
                            </>
                        }
                    />
                );
            }
        }
        case 'KLAR_FOR_OPPSTART':
            return avtale.tiltakstype === 'SOMMERJOBB' ? (
                <StatusPanel
                    ikon={CheckIkon}
                    header="Avtalen er ferdig utfylt og godkjent"
                    body={
                        <>
                            <Normaltekst>
                                Avtale ble inngått {formatterDato(avtale.avtaleInngått!, NORSK_DATO_FORMAT)}. Tiltaket
                                starter {formatterDato(avtale.startDato!, NORSK_DATO_FORMAT)}.
                            </Normaltekst>
                            <VerticalSpacer rem={1} />
                            <Normaltekst>
                                Du skal ikke registrere tiltaksgjennomføringen i Arena (gjelder sommerjobb). Avtalen
                                journalføres automatisk i Gosys.
                            </Normaltekst>
                        </>
                    }
                />
            ) : (
                <StatusPanel
                    ikon={CheckIkon}
                    header="Avtalen er ferdig utfylt og godkjent"
                    body={
                        <>
                            <Normaltekst>
                                Avtale ble inngått {formatterDato(avtale.avtaleInngått!, NORSK_DATO_FORMAT)}. Tiltaket
                                starter {formatterDato(avtale.startDato!, NORSK_DATO_FORMAT)}.
                            </Normaltekst>
                            <VerticalSpacer rem={1} />
                            <Normaltekst>
                                Du må fullføre registreringen i Arena. Avtalen journalføres automatisk i Gosys.
                            </Normaltekst>
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
