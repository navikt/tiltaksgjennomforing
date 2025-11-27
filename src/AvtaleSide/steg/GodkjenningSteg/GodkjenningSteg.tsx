import { AvtaleContext } from '@/AvtaleProvider';
import AvtaleStatus from '@/AvtaleSide/AvtaleStatus/AvtaleStatus';
import VersjoneringKomponent from '@/AvtaleSide/steg/GodkjenningSteg/Versjonering/VersjoneringKomponent';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import LagreSomPdfKnapp from '@/komponenter/LagreSomPdfKnapp/LagreSomPdfKnapp';
import { Avtale, Avtaleinnhold } from '@/types/avtale';
import BEMHelper from '@/utils/bem';
import React, { FunctionComponent, useContext } from 'react';
import Godkjenning from './Godkjenning/Godkjenning';
import './GodkjenningSteg.less';
import GodkjenningInstruks from './Oppsummering/instruks/GodkjenningInstruks';
import { Rolle } from '@/types';
import { Heading } from '@navikt/ds-react';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';

interface Props {
    oppsummering: FunctionComponent<{ avtaleinnhold: Avtaleinnhold }>;
    visningTilskuddsperioder?: FunctionComponent;
    mentorVinsing?: boolean;
}

const harGodkjentSelv = (avtale: Avtale, rolle: Rolle) => {
    switch (rolle) {
        case 'DELTAKER':
            return avtale.godkjentAvDeltaker;
        case 'MENTOR':
            return avtale.erGodkjentTaushetserklæringAvMentor;
        case 'ARBEIDSGIVER':
            return avtale.godkjentAvArbeidsgiver;
        case 'VEILEDER':
            return avtale.godkjentAvVeileder;
        default:
            return false;
    }
};

const GodkjenningSteg: React.FunctionComponent<Props> = ({
    oppsummering: Oppsummering,
    visningTilskuddsperioder: VisningTilskuddsperioder,
}) => {
    const cls = BEMHelper('godkjenningSteg');
    const innloggetBruker = useContext(InnloggetBrukerContext);
    const { avtale } = useContext(AvtaleContext);

    const erDeltaker = innloggetBruker.rolle === 'DELTAKER';
    const erMentor = innloggetBruker.rolle === 'MENTOR';

    const skalViseGodkjenning = avtale.status !== 'ANNULLERT' && (!innloggetBruker.erNavAnsatt || !avtale.erUfordelt);

    const skalViseTilskuddsperioder =
        VisningTilskuddsperioder && !erDeltaker && !erMentor && avtale.tilskuddPeriode.length > 0;

    return (
        <div className={cls.className}>
            <AvtaleStatus />
            <Innholdsboks ariaLabel={avtale.avtaleInngått ? 'Oppsummering av inngått avtale' : 'Godkjenning av avtale'}>
                <div className={cls.element('wrapper')}>
                    {avtale.avtaleInngått ? (
                        <>
                            <SkjemaTittel>Oppsummering av inngått avtale</SkjemaTittel>
                            <LagreSomPdfKnapp avtaleId={avtale.id} />
                        </>
                    ) : (
                        !erMentor && <SkjemaTittel>Godkjenning av avtale</SkjemaTittel>
                    )}
                </div>
                <Oppsummering avtaleinnhold={avtale.gjeldendeInnhold} />
                {skalViseTilskuddsperioder && (
                    <>
                        <Heading level="2" size="small">
                            Tilskuddsperioder
                        </Heading>
                        <VerticalSpacer rem={1} />
                        <VisningTilskuddsperioder />
                    </>
                )}
            </Innholdsboks>
            {skalViseGodkjenning && <Godkjenning avtale={avtale} rolle={innloggetBruker.rolle} />}
            {harGodkjentSelv(avtale, innloggetBruker.rolle) && (
                <Innholdsboks>
                    <GodkjenningInstruks />
                </Innholdsboks>
            )}
            <VersjoneringKomponent avtale={avtale} />
        </div>
    );
};

export default GodkjenningSteg;
