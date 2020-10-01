import { AvtaleContext } from '@/AvtaleContext';
import { FordelAvtaleVeileder } from '@/AvtaleSide/steg/GodkjenningSteg/FordelAvtaleVeileder';
import Avtaleparter from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/Avtaleparter/Avtaleparter';
import VersjoneringKomponent from '@/AvtaleSide/steg/GodkjenningSteg/Versjonering/VersjoneringKomponent';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import SkrivUtKnapp from '@/komponenter/SkrivUtKnapp/SkrivUtKnapp';
import { AltAvtaleinnhold } from '@/types/avtale';
import * as React from 'react';
import { createElement, FunctionComponent, useContext } from 'react';
import AvtaleStatus from '../../AvtaleStatus/AvtaleStatus';
import Godkjenning from './Godkjenning';
import { UfordeltStatusArbeidsgiverDeltaker } from './UfordeltStatusArbeidsgiverDeltaker';

interface Props {
    oppsummering: FunctionComponent<{ avtaleinnhold: AltAvtaleinnhold }>;
}

const GodkjenningSteg: React.FunctionComponent<Props> = props => {
    const innloggetBruker = useContext(InnloggetBrukerContext);
    const { avtale, rolle, laasOpp, godkjennPaVegne, godkjenn } = useContext(AvtaleContext);

    const skalViseGodkjenning = !innloggetBruker.erNavAnsatt || (innloggetBruker.erNavAnsatt && !avtale.erUfordelt);

    return (
        <>
            {console.log(avtale.erUfordelt)}
            {avtale.erUfordelt && rolle !== 'VEILEDER' && <UfordeltStatusArbeidsgiverDeltaker />}
            {avtale.erUfordelt && innloggetBruker.rolle === 'VEILEDER' && <FordelAvtaleVeileder />}
            {!avtale.erUfordelt && <AvtaleStatus avtale={avtale} rolle={rolle} />}
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
