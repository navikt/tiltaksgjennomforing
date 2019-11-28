import { Context, medContext } from '@/AvtaleContext';
import * as React from 'react';
import Godkjenning from './Godkjenning';
import AvtaleStatus from '../../AvtaleStatus/AvtaleStatus';
import DeltakerInstruks from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/instruks/DeltakerInstruks';
import ArbeidsgiverInstruks from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/instruks/ArbeidsgiverInstruks';
import VeilederInstruks from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/instruks/VeilederInstruks';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import Avtaleparter from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/Avtaleparter/Avtaleparter';
import SkrivUtKnapp from '@/komponenter/SkrivUtKnapp/SkrivUtKnapp';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';

type Props = {
    oppsummering: JSX.Element;
};

const GodkjenningSteg: React.FunctionComponent<Props & Context> = props => (
    <>
        <AvtaleStatus avtale={props.avtale} rolle={props.rolle} />
        <Innholdsboks>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                }}
            >
                <SkjemaTittel>
                    {props.avtale.erLaast ? 'Oppsummering av inngått avtale' : 'Godkjenning av avtale'}
                </SkjemaTittel>

                {props.avtale.erLaast && <SkrivUtKnapp />}
            </div>

            <Avtaleparter {...props.avtale} />
            {props.oppsummering}
        </Innholdsboks>
        <Innholdsboks className={'avtaleside__infoboks'}>
            {props.rolle === 'DELTAKER' && <DeltakerInstruks erLaast={props.avtale.erLaast} />}
            {props.rolle === 'ARBEIDSGIVER' && <ArbeidsgiverInstruks erLaast={props.avtale.erLaast} />}
            {props.rolle === 'VEILEDER' && <VeilederInstruks />}
        </Innholdsboks>
        <Godkjenning
            avtale={props.avtale}
            rolle={props.rolle}
            endreGodkjenning={props.godkjenn}
            godkjennPaVegne={props.godkjennPaVegne}
        />
    </>
);
export default medContext(GodkjenningSteg);
