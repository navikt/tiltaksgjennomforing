import { Context, medContext } from '@/AvtaleContext';
import * as React from 'react';
import { createElement, FunctionComponent } from 'react';
import Godkjenning from './Godkjenning';
import AvtaleStatus from '../../AvtaleStatus/AvtaleStatus';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import Avtaleparter from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/Avtaleparter/Avtaleparter';
import SkrivUtKnapp from '@/komponenter/SkrivUtKnapp/SkrivUtKnapp';
import { AltAvtaleinnhold } from '@/types/avtale';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import Versjoner from './Versjonering/Versjoner';
type Props = {
    oppsummering: FunctionComponent<{ avtaleinnhold: AltAvtaleinnhold }>;
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
            {createElement(props.oppsummering, { avtaleinnhold: props.avtale })}
        </Innholdsboks>
        <Godkjenning
            avtale={props.avtale}
            rolle={props.rolle}
            endreGodkjenning={props.godkjenn}
            godkjennPaVegne={props.godkjennPaVegne}
        />
        {props.avtale.versjoner.length > 1 && <Versjoner {...props.avtale} />}
    </>
);
export default medContext(GodkjenningSteg);
