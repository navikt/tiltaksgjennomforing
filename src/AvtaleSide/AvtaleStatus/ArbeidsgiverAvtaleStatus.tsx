import { ReactComponent as PabegyntIkon } from '@/assets/ikoner/pabegynt.svg';
import { ReactComponent as AvbruttIkon } from '@/assets/ikoner/stop.svg';
import { ReactComponent as VarselIkon } from '@/assets/ikoner/varsel.svg';
import { AvtaleContext } from '@/AvtaleProvider';
import Avsluttet from '@/AvtaleSide/AvtaleStatus/Avsluttet';
import Gjennomføres from '@/AvtaleSide/AvtaleStatus/Gjennomføres';
import KlarForOppstart from '@/AvtaleSide/AvtaleStatus/KlarForOppstart';
import StatusPanel from '@/AvtaleSide/AvtaleStatus/StatusPanel';
import GodkjenningStatus from '@/AvtaleSide/steg/GodkjenningSteg/GodkjenningStatus/GodkjenningStatus';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { formatterDato } from '@/utils/datoUtils';
import { Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent, useContext } from 'react';

const ArbeidsgiverAvtaleStatus: FunctionComponent = () => {
    const { avtale } = useContext(AvtaleContext);

    if (avtale.erUfordelt) {
        return (
            <StatusPanel
                ikon={PabegyntIkon}
                header={'Avtalen er ikke fordelt til en veileder i NAV enda'}
                body={
                    <Normaltekst>
                        Du kan likevel begynne å fylle ut avtalen. Når avtalen har blitt tildelt en veileder kan alle
                        parter godkjenne avtalen.
                    </Normaltekst>
                }
            />
        );
    }

    switch (avtale.statusSomEnum) {
        case 'ANNULLERT':
            return (
                <StatusPanel
                    ikon={AvbruttIkon}
                    header={'Tiltaket er annullert'}
                    body={
                        <Normaltekst>
                            Veileder har annullert tiltaket {formatterDato(avtale.annullertTidspunkt!)}.
                        </Normaltekst>
                    }
                />
            );
        case 'AVBRUTT':
            return (
                <StatusPanel
                    ikon={AvbruttIkon}
                    header={'Tiltaket er avbrutt'}
                    body={<Normaltekst>Veileder har avbrutt tiltaket</Normaltekst>}
                />
            );
        case 'PÅBEGYNT':
            return <StatusPanel ikon={PabegyntIkon} header="Du må fylle ut avtalen" />;
        case 'MANGLER_GODKJENNING':
            return avtale.godkjentAvArbeidsgiver ? (
                <StatusPanel
                    ikon={VarselIkon}
                    header="Vent til de andre har godkjent"
                    body={
                        <>
                            <Normaltekst>
                                Du har godkjent avtalen. Venter nå på godkjenning fra NAV.
                            </Normaltekst>
                            <VerticalSpacer rem={2} />
                            <GodkjenningStatus avtale={avtale} />
                        </>
                    }
                />
            ) : (
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
        case 'KLAR_FOR_OPPSTART':
            return <KlarForOppstart avtale={avtale} />;
        case 'GJENNOMFØRES':
            return <Gjennomføres avtale={avtale} />;
        case 'AVSLUTTET':
            return <Avsluttet avtale={avtale} />;
    }

    return null;
};

export default ArbeidsgiverAvtaleStatus;
