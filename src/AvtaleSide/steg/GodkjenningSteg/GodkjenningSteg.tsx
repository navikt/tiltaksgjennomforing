import { AvtaleContext } from '@/AvtaleProvider';
import { FordelAvtaleVeileder } from '@/AvtaleSide/steg/GodkjenningSteg/FordelAvtaleVeileder';
import Avtaleparter from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/Avtaleparter/Avtaleparter';
import { UfordeltStatusDeltaker } from '@/AvtaleSide/steg/GodkjenningSteg/UfordeltStatusDeltaker';
import VersjoneringKomponent from '@/AvtaleSide/steg/GodkjenningSteg/Versjonering/VersjoneringKomponent';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import { Avtaleinnhold } from '@/types/avtale';
import * as React from 'react';
import { createElement, FunctionComponent, useContext } from 'react';
import AvtaleStatus from '../../AvtaleStatus/AvtaleStatus';
import Godkjenning from './Godkjenning';
import { UfordeltStatusArbeidsgiver } from './UfordeltStatusArbeidsgiver';
import LagreSomPdfKnapp from '@/komponenter/LagreSomPdfKnapp/LagreSomPdfKnapp';
import { Feature, FeatureToggleContext } from '@/FeatureToggleProvider';
import SkrivUtKnapp from '@/komponenter/SkrivUtKnapp/SkrivUtKnapp';
import BEMHelper from '@/utils/bem';
import './GodkjenningSteg.less';
import TilskuddsperioderAvslått from '@/AvtaleSide/steg/GodkjenningSteg/TilskuddsperioderAvslått';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import NyAvtaleStatus from '@/AvtaleSide/NyAvtaleStatus/NyAvtaleStatus';

interface Props {
    oppsummering: FunctionComponent<{ avtaleinnhold: Avtaleinnhold }>;
}

const GodkjenningSteg: React.FunctionComponent<Props> = props => {
    const cls = BEMHelper('godkjenningSteg');
    const innloggetBruker = useContext(InnloggetBrukerContext);
    const { avtale, laasOpp, godkjennPaVegne, godkjenn } = useContext(AvtaleContext);
    const featureToggles = useContext(FeatureToggleContext);
    const lagreSomPdfFeatureToggle = featureToggles[Feature.LagreSomPdf];
    const avtaleStatusRefactorToggle = featureToggles[Feature.AvtaleStatusRefactor];

    const skalViseGodkjenning =
        !avtale.avbrutt && (!innloggetBruker.erNavAnsatt || (innloggetBruker.erNavAnsatt && !avtale.erUfordelt));

    const skalViseAvslåttTilskuddsperiode =
        avtale.erLaast &&
        innloggetBruker.rolle === 'VEILEDER' &&
        avtale.tilskuddPeriode.find(
            t => t.status === 'AVSLÅTT' && t.løpenummer === avtale.gjeldendeTilskuddsperiode?.løpenummer
        ) &&
        avtale.gjeldendeTilskuddsperiode?.status !== 'GODKJENT';

    return (
        <div className={cls.className}>
            {avtaleStatusRefactorToggle ? (
                <NyAvtaleStatus />
            ) : (
                <>
                    {avtale.erUfordelt && innloggetBruker.rolle === 'ARBEIDSGIVER' && (
                        <UfordeltStatusArbeidsgiver tiltakstype={avtale.tiltakstype} />
                    )}
                    {avtale.erUfordelt && innloggetBruker.rolle === 'DELTAKER' && <UfordeltStatusDeltaker />}
                    {avtale.erUfordelt && innloggetBruker.rolle === 'VEILEDER' && <FordelAvtaleVeileder />}
                    {avtale.statusSomEnum === 'MANGLER_GODKJENNING' && avtale.versjoner.length > 1 && (
                        <>
                            <AlertStripeInfo>
                                Avtalen må godkjennes på nytt igjen av alle parter, fordi det har blitt gjort endringer
                                siden første godkjenning.
                            </AlertStripeInfo>
                            <VerticalSpacer rem={1} />
                        </>
                    )}
                    {skalViseAvslåttTilskuddsperiode && <TilskuddsperioderAvslått />}
                    {!avtale.erUfordelt && !skalViseAvslåttTilskuddsperiode && (
                        <AvtaleStatus avtale={avtale} rolle={innloggetBruker.rolle} />
                    )}
                </>
            )}
            <Innholdsboks ariaLabel={avtale.erLaast ? 'Oppsummering av inngått avtale' : 'Godkjenning av avtale'}>
                <div className={cls.element('wrapper')}>
                    <SkjemaTittel>
                        {avtale.erLaast ? 'Oppsummering av inngått avtale' : 'Godkjenning av avtale'}
                    </SkjemaTittel>

                    {avtale.erLaast && lagreSomPdfFeatureToggle && <LagreSomPdfKnapp avtaleId={avtale.id} />}
                    {avtale.erLaast && !lagreSomPdfFeatureToggle && <SkrivUtKnapp />}
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
            <VersjoneringKomponent laasOpp={laasOpp} avtale={avtale} rolle={innloggetBruker.rolle} />
        </div>
    );
};

export default GodkjenningSteg;
