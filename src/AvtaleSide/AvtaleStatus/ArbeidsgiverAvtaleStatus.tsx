import { AvtaleContext } from '@/AvtaleProvider';
import Avsluttet from '@/AvtaleSide/AvtaleStatus/Avsluttet';
import Gjennomføres from '@/AvtaleSide/AvtaleStatus/Gjennomføres';
import KlarForOppstart from '@/AvtaleSide/AvtaleStatus/KlarForOppstart';
import StatusPanel from '@/AvtaleSide/AvtaleStatus/StatusPanel';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { formatterDato } from '@/utils/datoUtils';
import { BodyShort } from '@navikt/ds-react';
import React, { FunctionComponent, useContext } from 'react';

const ArbeidsgiverAvtaleStatus: FunctionComponent = () => {
    const { avtale } = useContext(AvtaleContext);

    if (avtale.erUfordelt) {
        return (
            <StatusPanel
                header={'Avtalen er ikke fordelt til en veileder i NAV enda'}
                body={<BodyShort size="small">Du kan begynne å fylle ut avtalen.</BodyShort>}
            />
        );
    }

    switch (avtale.statusSomEnum) {
        case 'ANNULLERT':
            return (
                <StatusPanel
                    header={'Avtalen er annullert'}
                    body={
                        <BodyShort size="small">
                            Veileder har annullert avtalen {formatterDato(avtale.annullertTidspunkt!)}. Årsak:{' '}
                            {avtale.annullertGrunn}.
                        </BodyShort>
                    }
                />
            );
        case 'AVBRUTT':
            return (
                <StatusPanel
                    header={'Avtalen er avbrutt'}
                    body={
                        <BodyShort size="small">Veileder har avbrutt avtalen. Årsak: {avtale.avbruttGrunn}.</BodyShort>
                    }
                />
            );
        case 'PÅBEGYNT':
            return (
                <StatusPanel
                    header={'Innholdet i avtalen fylles ut av arbeidsgiver og veileder'}
                    body={<BodyShort size="small"> </BodyShort>}
                />
            );
        case 'MANGLER_GODKJENNING':
            return avtale.godkjentAvArbeidsgiver ? (
                <StatusPanel
                    header="Venter på godkjenning av avtalen fra de andre partene"
                    body={
                        <>
                            <BodyShort size="small">Du har godkjent.</BodyShort>
                            <VerticalSpacer rem={2} />
                        </>
                    }
                />
            ) : (
                <StatusPanel
                    header="Du kan godkjenne avtalen"
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
            return <KlarForOppstart avtale={avtale} />;
        case 'GJENNOMFØRES':
            return <Gjennomføres avtale={avtale} />;
        case 'AVSLUTTET':
            return <Avsluttet avtale={avtale} />;
    }

    return null;
};

export default ArbeidsgiverAvtaleStatus;
