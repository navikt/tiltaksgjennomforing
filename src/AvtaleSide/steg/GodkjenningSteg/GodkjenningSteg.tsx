import { AvtaleContext } from '@/AvtaleProvider';
import AvtaleStatus from '@/AvtaleSide/AvtaleStatus/AvtaleStatus';
import TilskuddsPerioderOppsummering from '@/AvtaleSide/steg/BeregningTilskudd/tilskuddsPerioder/TilskuddsPerioderOppsummering';
import VersjoneringKomponent from '@/AvtaleSide/steg/GodkjenningSteg/Versjonering/VersjoneringKomponent';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import LagreSomPdfKnapp from '@/komponenter/LagreSomPdfKnapp/LagreSomPdfKnapp';
import { Avtaleinnhold } from '@/types/avtale';
import BEMHelper from '@/utils/bem';
import React, { createElement, FunctionComponent, useContext } from 'react';
import Godkjenning from './Godkjenning/Godkjenning';
import './GodkjenningSteg.less';
import { useFeatureToggles } from '@/FeatureToggleProvider';
import GodkjenningInstruks from './Oppsummering/instruks/GodkjenningInstruks';

interface Props {
    oppsummering: FunctionComponent<{ avtaleinnhold: Avtaleinnhold }>;
    mentorVinsing?: boolean;
}

const GodkjenningSteg: React.FunctionComponent<Props> = (props) => {
    const cls = BEMHelper('godkjenningSteg');
    const innloggetBruker = useContext(InnloggetBrukerContext);
    const { avtale } = useContext(AvtaleContext);

    const skalViseGodkjenning =
        !avtale.erAnnullertEllerAvbrutt &&
        (!innloggetBruker.erNavAnsatt || (innloggetBruker.erNavAnsatt && !avtale.erUfordelt));

    return (
        <div className={cls.className}>
            <AvtaleStatus />
            <Innholdsboks ariaLabel={avtale.avtaleInngått ? 'Oppsummering av inngått avtale' : 'Godkjenning av avtale'}>
                <div className={cls.element('wrapper')}>
                    {innloggetBruker.rolle === 'DELTAKER' || innloggetBruker.rolle === 'MENTOR' ? (
                        avtale.avtaleInngått && (
                            <>
                                <SkjemaTittel>Oppsummering av inngått avtale</SkjemaTittel>
                                {avtale.avtaleInngått && <LagreSomPdfKnapp avtaleId={avtale.id} />}
                            </>
                        )
                    ) : (
                        <>
                            <SkjemaTittel>
                                {avtale.avtaleInngått ? 'Oppsummering av inngått avtale' : 'Godkjenning av avtale'}
                            </SkjemaTittel>
                            {avtale.avtaleInngått && <LagreSomPdfKnapp avtaleId={avtale.id} />}
                        </>
                    )}
                </div>
                {createElement(props.oppsummering, { avtaleinnhold: avtale.gjeldendeInnhold })}
            </Innholdsboks>
            {skalViseGodkjenning && <Godkjenning avtale={avtale} rolle={innloggetBruker.rolle} />}
            {avtale.tilskuddPeriode.length > 0 ? (
                <>
                    <Innholdsboks>
                        <TilskuddsPerioderOppsummering />
                    </Innholdsboks>
                    <Innholdsboks>
                        <GodkjenningInstruks />
                    </Innholdsboks>
                </>
            ) : (
                (avtale.avtaleInngått || avtale.godkjentAvArbeidsgiver) && (
                    <Innholdsboks>
                        <GodkjenningInstruks />
                    </Innholdsboks>
                )
            )}
            <VersjoneringKomponent avtale={avtale} />
        </div>
    );
};

export default GodkjenningSteg;
