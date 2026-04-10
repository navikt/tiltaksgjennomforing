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

const GodkjenningMentor: FunctionComponent = () => {
    const { godkjenn } = useContext(AvtaleContext);
    const cls = BEMHelper('godkjenning');
    const [bekreftetGodkjennerInnholdet, setBekreftetGodkjennerInnholdet] = useState(false);

    const godkjennAvtalen = () => {
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

            <GodkjenningsPanel
                setChecked={() => setBekreftetGodkjennerInnholdet(!bekreftetGodkjennerInnholdet)}
                isChecked={bekreftetGodkjennerInnholdet}
                checkboxLabel="Ja, jeg forstår kravene og godkjenner innholdet i avtalen"
            />
            <VerticalSpacer rem={1.5} />

            <LagreKnapp lagre={godkjennAvtalen}>Godkjenn avtalen</LagreKnapp>
        </Innholdsboks>
    );
};

export default GodkjenningMentor;
