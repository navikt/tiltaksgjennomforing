import { AvtaleContext } from '@/AvtaleProvider';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { UfullstendigError } from '@/types/errors';
import React, { FunctionComponent, useContext, useState } from 'react';
import GodkjenningInstruks from '../../Oppsummering/instruks/GodkjenningInstruks';
import BEMHelper from '@/utils/bem';
import GodkjenningsPanel from '../GodkjenningsPanel/GodkjenningsPanel';
import { List } from '@navikt/ds-react';

const GodkjenningArbeidsgiver: FunctionComponent = () => {
    const { avtale, godkjenn } = useContext(AvtaleContext);
    const cls = BEMHelper('godkjenning');

    const [bekreftetGodkjennerInnholdet, setBekreftetGodkjennerInnholdet] = useState(false);

    const sjekkOmLønnstilskuddprosentErfyltUt = () => {
        const felterSomIkkeErFyltUt = avtale.felterSomIkkeErFyltUt;
        if (felterSomIkkeErFyltUt.length === 1 && felterSomIkkeErFyltUt[0] === 'lonnstilskuddProsent') {
            throw new UfullstendigError(
                'Før du kan godkjenne må veileder sette lønnstilskuddprosent. Avtalen er tilgjengelig for veileder nå.',
            );
        }
    };

    const godkjennAvtalen = () => {
        sjekkOmLønnstilskuddprosentErfyltUt();
        if (bekreftetGodkjennerInnholdet) {
            return godkjenn();
        } else {
            throw new UfullstendigError('Du må bekrefte at du forstår kravene før du kan godkjenne.');
        }
    };

    return (
        <Innholdsboks className={cls.className} ariaLabel={'Godkjenn avtalen'}>
            <SkjemaTittel>Godkjenn avtalen</SkjemaTittel>
            <GodkjenningInstruks />

            <VerticalSpacer rem={1.5} />

            <GodkjenningsPanel
                setChecked={() => setBekreftetGodkjennerInnholdet(!bekreftetGodkjennerInnholdet)}
                isChecked={bekreftetGodkjennerInnholdet}
                checkboxLabel="Ja, jeg bekrefter."
            >
                <List>
                    <List.Item>Innholdet i avtalen er korrekt</List.Item>
                    <List.Item>Kravene til arbeidsgiver er lest og forstått</List.Item>
                    <List.Item>Det er inngått arbeidsavtale med deltaker</List.Item>
                </List>
            </GodkjenningsPanel>

            <VerticalSpacer rem={1.5} />

            <LagreKnapp lagre={godkjennAvtalen}>Godkjenn avtalen</LagreKnapp>
        </Innholdsboks>
    );
};

export default GodkjenningArbeidsgiver;
