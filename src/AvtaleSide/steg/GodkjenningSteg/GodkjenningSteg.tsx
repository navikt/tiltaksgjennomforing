import { AvtaleContext } from '@/AvtaleProvider';
import AvtaleStatus from '@/AvtaleSide/AvtaleStatus/AvtaleStatus';
import TilskuddsPerioderOppsummering from '@/AvtaleSide/steg/BeregningTilskudd/tilskuddsPerioder/TilskuddsPerioderOppsummering';
import VersjoneringKomponent from '@/AvtaleSide/steg/GodkjenningSteg/Versjonering/VersjoneringKomponent';
import DeltakerInfo from '@/AvtaleSide/steg/KontaktInformasjonSteg/kontorInfo/DeltakerInfo';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import LagreSomPdfKnapp from '@/komponenter/LagreSomPdfKnapp/LagreSomPdfKnapp';
import { Avtaleinnhold } from '@/types/avtale';
import BEMHelper from '@/utils/bem';
import React, { createElement, FunctionComponent, Suspense, useContext } from 'react';
import Godkjenning from './Godkjenning/Godkjenning';
import './GodkjenningSteg.less';
import KontaktpersonRefusjonOppsumering from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/KontaktpersonRefusjonOppsummering/KontaktpersonRefusjonOppsummering';
import TaushetserklæringPanel from '@/AvtaleOversikt/Taushetserklæring/TaushetserklæringPanel';

interface Props {
    oppsummering: FunctionComponent<{ avtaleinnhold: Avtaleinnhold }>;
    mentorVinsing?: boolean;
}

const GodkjenningSteg: React.FunctionComponent<Props> = (props) => {
    const cls = BEMHelper('godkjenningSteg');
    const innloggetBruker = useContext(InnloggetBrukerContext);
    const { avtale } = useContext(AvtaleContext);

    const skalViseGodkjenning =
        !avtale.avbrutt && (!innloggetBruker.erNavAnsatt || (innloggetBruker.erNavAnsatt && !avtale.erUfordelt));

    return (
        <div className={cls.className} role={'main'}>
            <AvtaleStatus />
            {innloggetBruker.rolle === 'MENTOR' && <TaushetserklæringPanel signertTidspunkt={avtale.godkjentAvMentor} />}
            <Innholdsboks ariaLabel={avtale.avtaleInngått ? 'Oppsummering av inngått avtale' : 'Godkjenning av avtale'}>
                <div className={cls.element('wrapper')}>
                    <SkjemaTittel>
                        {avtale.avtaleInngått ? 'Oppsummering av inngått avtale' : 'Godkjenning av avtale'}
                    </SkjemaTittel>
                    {avtale.avtaleInngått && <LagreSomPdfKnapp avtaleId={avtale.id} />}
                </div>
                {innloggetBruker.rolle === 'VEILEDER' && <DeltakerInfo oppsummeringside={true} />}
                {avtale.gjeldendeInnhold.refusjonKontaktperson && (
                    <KontaktpersonRefusjonOppsumering
                        kontaktpersonRefusjon={avtale.gjeldendeInnhold.refusjonKontaktperson}
                    />
                )}
                {createElement(props.oppsummering, { avtaleinnhold: avtale.gjeldendeInnhold })}
            </Innholdsboks>
            {skalViseGodkjenning && <Godkjenning avtale={avtale} rolle={innloggetBruker.rolle} />}
            {avtale.tilskuddPeriode.length > 0 && (
                <Innholdsboks>
                    <TilskuddsPerioderOppsummering />
                </Innholdsboks>
            )}
            <Suspense fallback={null}>
                <VersjoneringKomponent avtale={avtale} rolle={innloggetBruker.rolle} />
            </Suspense>
        </div>
    );
};

export default GodkjenningSteg;
