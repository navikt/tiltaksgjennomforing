import PabegyntIkon from '@/assets/ikoner/pabegynt.svg?react';
import AvbruttIkon from '@/assets/ikoner/stop.svg?react';
import VarselIkon from '@/assets/ikoner/varsel.svg?react';
import { AvtaleContext } from '@/AvtaleProvider';
import Avsluttet from '@/AvtaleSide/AvtaleStatus/Avsluttet';
import Gjennomføres from '@/AvtaleSide/AvtaleStatus/Gjennomføres';
import KlarForOppstart from '@/AvtaleSide/AvtaleStatus/KlarForOppstart';
import StatusPanel from '@/AvtaleSide/AvtaleStatus/StatusPanel';
import GodkjenningStatus from '@/AvtaleSide/steg/GodkjenningSteg/GodkjenningStatus/GodkjenningStatus';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { formatterDato } from '@/utils/datoUtils';
import { BodyShort } from '@navikt/ds-react';
import React, { FunctionComponent, useContext } from 'react';

const DeltakerAvtaleStatus: FunctionComponent = () => {
    const { avtale } = useContext(AvtaleContext);

    switch (avtale.statusSomEnum) {
        case 'ANNULLERT':
            return (
                <StatusPanel
                    ikon={AvbruttIkon}
                    header="Tiltaket er annullert"
                    body={
                        <BodyShort size="small">
                            Veileder har annullert tiltaket {formatterDato(avtale.annullertTidspunkt!)}. Årsak:{' '}
                            {avtale.annullertGrunn}.
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
                        <BodyShort size="small">Veileder har avbrutt tiltaket. Årsak: {avtale.avbruttGrunn}.</BodyShort>
                    }
                />
            );
        case 'PÅBEGYNT':
            return (
                <StatusPanel
                    ikon={PabegyntIkon}
                    header="Utfylling av avtale påbegynt"
                    body={
                        <BodyShort size="small">
                            Innholdet i avtalen fylles ut av arbeidsgiveren og veilederen. Hvis du er uenig i innholdet
                            eller har spørsmål til avtalen, må du kontakte veilederen din via aktivitetsplanen før du
                            godkjenner. Du kan godkjenne avtalen når alt er fylt ut.
                        </BodyShort>
                    }
                />
            );
        case 'MANGLER_GODKJENNING':
            return avtale.godkjentAvDeltaker ? (
                <StatusPanel
                    ikon={VarselIkon}
                    header="Vent til de andre har godkjent"
                    body={
                        <>
                            <BodyShort size="small">
                                Du har godkjent avtalen. Venter nå på godkjenning fra NAV.
                            </BodyShort>
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
                            <BodyShort size="small">
                                Før du godkjenner avtalen må du sjekke at alt er i orden og innholdet er riktig.
                            </BodyShort>
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

export default DeltakerAvtaleStatus;
