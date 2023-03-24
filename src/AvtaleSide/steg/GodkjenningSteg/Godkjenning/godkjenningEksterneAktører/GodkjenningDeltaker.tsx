import { AvtaleContext } from '@/AvtaleProvider';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { UfullstendigError } from '@/types/errors';
import { ConfirmationPanel } from '@navikt/ds-react';
import React, { FunctionComponent, useContext, useState } from 'react';
import GodkjenningInstruks from '../../Oppsummering/instruks/GodkjenningInstruks';
import BEMHelper from '@/utils/bem';

const GodkjenningDeltaker: FunctionComponent = () => {
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

            <ConfirmationPanel
                label="Ja, jeg forstår kravene og godkjenner innholdet i avtalen"
                checked={bekreftetGodkjennerInnholdet}
                onChange={() => setBekreftetGodkjennerInnholdet(!bekreftetGodkjennerInnholdet)}
            />
            <VerticalSpacer rem={1.5} />

            <LagreKnapp lagre={godkjennAvtalen} label="Godkjenn avtalen" />
        </Innholdsboks>
    );
};

export default GodkjenningDeltaker;
