import { AvtaleContext } from '@/AvtaleProvider';
import { FordelAvtaleVeileder } from '@/AvtaleSide/steg/GodkjenningSteg/FordelAvtaleVeileder';
import Avtaleparter from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/Avtaleparter/Avtaleparter';
import VersjoneringKomponent from '@/AvtaleSide/steg/GodkjenningSteg/Versjonering/VersjoneringKomponent';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import SkrivUtKnapp from '@/komponenter/SkrivUtKnapp/SkrivUtKnapp';
import { Avtaleinnhold } from '@/types/avtale';
import * as React from 'react';
import { createElement, FunctionComponent, useContext } from 'react';
import AvtaleStatus from '../../AvtaleStatus/AvtaleStatus';
import Godkjenning from './Godkjenning';
import { UfordeltStatusArbeidsgiverDeltaker } from './UfordeltStatusArbeidsgiverDeltaker';

interface Props {
    oppsummering: FunctionComponent<{ avtaleinnhold: Avtaleinnhold }>;
}

const GodkjenningSteg: React.FunctionComponent<Props> = props => {
    const innloggetBruker = useContext(InnloggetBrukerContext);
    const { avtale, laasOpp, godkjennPaVegne, godkjenn } = useContext(AvtaleContext);

    const skalViseGodkjenning =
        !avtale.avbrutt && (!innloggetBruker.erNavAnsatt || (innloggetBruker.erNavAnsatt && !avtale.erUfordelt));

    return (
        <>
            {avtale.erUfordelt && innloggetBruker.rolle !== 'VEILEDER' && <UfordeltStatusArbeidsgiverDeltaker />}
            {avtale.erUfordelt && innloggetBruker.rolle === 'VEILEDER' && <FordelAvtaleVeileder />}
            {!avtale.erUfordelt && <AvtaleStatus avtale={avtale} rolle={innloggetBruker.rolle} />}
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
                    rolle={innloggetBruker.rolle}
                    endreGodkjenning={godkjenn}
                    godkjennPaVegne={godkjennPaVegne}
                />
            )}
            <VersjoneringKomponent laasOpp={laasOpp} avtale={avtale} rolle={innloggetBruker.rolle} />
        </>
    );
};

export default GodkjenningSteg;
