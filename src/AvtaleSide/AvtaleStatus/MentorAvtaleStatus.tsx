import React, { FunctionComponent, useContext } from 'react';
import { ReactComponent as AvbruttIkon } from '@/assets/ikoner/stop.svg';
import { Normaltekst } from 'nav-frontend-typografi';
import StatusPanel from '@/AvtaleSide/AvtaleStatus/StatusPanel';
import { formatterDato } from '@/utils/datoUtils';
import { ReactComponent as PabegyntIkon } from '@/assets/ikoner/pabegynt.svg';
import Avsluttet from '@/AvtaleSide/AvtaleStatus/Avsluttet';
import KlarForOppstart from '@/AvtaleSide/AvtaleStatus/KlarForOppstart';
import Gjennomføres from '@/AvtaleSide/AvtaleStatus/Gjennomføres';
import { ReactComponent as VarselIkon } from '@/assets/ikoner/varsel.svg';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import GodkjenningStatus from '@/AvtaleSide/steg/GodkjenningSteg/GodkjenningStatus/GodkjenningStatus';
import { AvtaleContext } from '@/AvtaleProvider';

const MentorAvtaleStatus: FunctionComponent = () => {
    const { avtale } = useContext(AvtaleContext);

    switch (avtale.statusSomEnum) {
        case 'ANNULLERT':
            return (
                <StatusPanel
                    ikon={AvbruttIkon}
                    header="Tiltaket er annullert"
                    body={
                        <Normaltekst>
                            Veileder har annullert tiltaket {formatterDato(avtale.annullertTidspunkt!)}. Årsak:{' '}
                            {avtale.annullertGrunn}.
                        </Normaltekst>
                    }
                />
            );
        case 'AVBRUTT':
            return (
                <StatusPanel
                    ikon={AvbruttIkon}
                    header="Tiltaket er avbrutt"
                    body={<Normaltekst>Veileder har avbrutt tiltaket. Årsak: {avtale.avbruttGrunn}.</Normaltekst>}
                />
            );
        case 'PÅBEGYNT':
            return (
                <StatusPanel
                    ikon={PabegyntIkon}
                    header="Utfylling av avtale påbegynt"
                    body={
                        <Normaltekst>
                            Innholdet i avtalen fylles ut av arbeidsgiveren og veilederen. Hvis du er uenig i innholdet
                            eller har spørsmål til avtalen, må du kontakte veilederen din via aktivitetsplanen før du
                            godkjenner. Du kan godkjenne avtalen når alt er fylt ut.
                        </Normaltekst>
                    }
                />
            );
        case 'MANGLER_GODKJENNING':
            return (
                <StatusPanel
                    ikon={VarselIkon}
                    header="Vent til de andre har godkjent"
                    body={
                        <>
                            <Normaltekst>Du har signert taushetserklæring. Venter nå på godkjenning fra</Normaltekst>
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

export default MentorAvtaleStatus;
