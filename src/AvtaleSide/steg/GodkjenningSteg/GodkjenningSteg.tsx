import { AvtaleContext } from '@/AvtaleContext';
import Avtaleparter from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/Avtaleparter/Avtaleparter';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import SkrivUtKnapp from '@/komponenter/SkrivUtKnapp/SkrivUtKnapp';
import { AltAvtaleinnhold } from '@/types/avtale';
import * as React from 'react';
import { createElement, FunctionComponent, useContext } from 'react';
import AvtaleStatus from '../../AvtaleStatus/AvtaleStatus';
import Godkjenning from './Godkjenning';
import { UfordeltStatus } from './UfordeltStatus';
import { AksepterUtkast } from '@/AvtaleSide/steg/GodkjenningSteg/AksepterUtkast';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import VersjoneringKomponent from '@/AvtaleSide/steg/GodkjenningSteg/Versjonering/VersjoneringKomponent';

interface Props {
    oppsummering: FunctionComponent<{ avtaleinnhold: AltAvtaleinnhold }>;
}

const GodkjenningSteg: React.FunctionComponent<Props> = props => {
    const innloggetBruker = useContext(InnloggetBrukerContext);
    const { avtale, rolle, laasOpp, godkjennPaVegne, godkjenn } = useContext(AvtaleContext);

    const skalViseGodkjenning = !innloggetBruker.erNavAnsatt || (innloggetBruker.erNavAnsatt && !avtale.erUfordelt);

    return (
        <>
            {avtale.status === 'Påbegynt' && avtale.erUfordelt && rolle === 'ARBEIDSGIVER' && <UfordeltStatus />}
            {avtale.erUfordelt && innloggetBruker.rolle === 'VEILEDER' ? (
                <AksepterUtkast />
            ) : (
                <AvtaleStatus avtale={avtale} rolle={rolle} />
            )}
            <Innholdsboks>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                    }}
                >
                    <SkjemaTittel>
                        {avtale.erLaast ? 'Oppsummering av inngått avtale' : 'Godkjenning av avtale'}
                    </SkjemaTittel>

                    {avtale.erLaast && <SkrivUtKnapp />}
                </div>

                <Avtaleparter {...avtale} />
                {createElement(props.oppsummering, { avtaleinnhold: avtale })}
            </Innholdsboks>
            {skalViseGodkjenning && (
                <Godkjenning
                    avtale={avtale}
                    rolle={rolle}
                    endreGodkjenning={godkjenn}
                    godkjennPaVegne={godkjennPaVegne}
                />
            )}
            <VersjoneringKomponent laasOpp={laasOpp} avtale={avtale} rolle={rolle} />
        </>
    );
};

export default GodkjenningSteg;
