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
import Versjonering from './Versjonering/Versjonering';

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
        {!props.avtale.avbrutt && (
            <Godkjenning
                avtale={props.avtale}
                rolle={props.rolle}
                endreGodkjenning={props.godkjenn}
                godkjennPaVegne={props.godkjennPaVegne}
            />
        )}
        <Versjonering laasOpp={props.laasOpp} avtale={props.avtale} rolle={props.rolle} />
    </>
);

export default medContext(GodkjenningSteg);
