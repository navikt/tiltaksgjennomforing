import { AvtaleContext } from '@/AvtaleProvider';
import NyAvtaleStatus from '@/AvtaleSide/NyAvtaleStatus/NyAvtaleStatus';
import Avtaleparter from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/Avtaleparter/Avtaleparter';
import VersjoneringKomponent from '@/AvtaleSide/steg/GodkjenningSteg/Versjonering/VersjoneringKomponent';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import LagreSomPdfKnapp from '@/komponenter/LagreSomPdfKnapp/LagreSomPdfKnapp';
import { Avtaleinnhold } from '@/types/avtale';
import BEMHelper from '@/utils/bem';
import React, { createElement, FunctionComponent, useContext } from 'react';
import Godkjenning from './Godkjenning';
import './GodkjenningSteg.less';
import TilskuddsPerioderOppsummering from '@/AvtaleSide/steg/BeregningTilskudd/tilskuddsPerioder/TilskuddsPerioderOppsummering';

interface Props {
    oppsummering: FunctionComponent<{ avtaleinnhold: Avtaleinnhold }>;
}

const GodkjenningSteg: React.FunctionComponent<Props> = props => {
    const cls = BEMHelper('godkjenningSteg');
    const innloggetBruker = useContext(InnloggetBrukerContext);
    const { avtale, laasOpp, godkjennPaVegne, godkjenn } = useContext(AvtaleContext);

    const skalViseGodkjenning =
        !avtale.avbrutt && (!innloggetBruker.erNavAnsatt || (innloggetBruker.erNavAnsatt && !avtale.erUfordelt));

    return (
        <div className={cls.className}>
            <NyAvtaleStatus />
            <Innholdsboks ariaLabel={avtale.erLaast ? 'Oppsummering av inngått avtale' : 'Godkjenning av avtale'}>
                <div className={cls.element('wrapper')}>
                    <SkjemaTittel>
                        {avtale.erLaast ? 'Oppsummering av inngått avtale' : 'Godkjenning av avtale'}
                    </SkjemaTittel>
                    {avtale.erLaast && <LagreSomPdfKnapp avtaleId={avtale.id} />}
                </div>

                <Avtaleparter {...avtale} />
                {createElement(props.oppsummering, { avtaleinnhold: avtale })}
            </Innholdsboks>
            {skalViseGodkjenning && (
                <Godkjenning
                    avtale={avtale}
                    rolle={innloggetBruker.rolle}
                    godkjenn={godkjenn}
                    godkjennPaVegne={godkjennPaVegne}
                />
            )}
            {avtale.tilskuddPeriode.length > 0 && (
                <Innholdsboks>
                    <TilskuddsPerioderOppsummering />
                </Innholdsboks>
            )}
            <VersjoneringKomponent laasOpp={laasOpp} avtale={avtale} rolle={innloggetBruker.rolle} />
        </div>
    );
};

export default GodkjenningSteg;
