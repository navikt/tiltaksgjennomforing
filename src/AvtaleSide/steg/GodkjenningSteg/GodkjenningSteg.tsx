import { useAvtale } from '@/AvtaleProvider';
import AvtaleStatus from '@/AvtaleSide/AvtaleStatus/AvtaleStatus';
import VersjoneringKomponent from '@/AvtaleSide/steg/GodkjenningSteg/Versjonering/VersjoneringKomponent';
import { useInnloggetBruker } from '@/InnloggingBoundary/InnloggingBoundary';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import LagreSomPdfKnapp from '@/komponenter/LagreSomPdfKnapp/LagreSomPdfKnapp';
import BEMHelper from '@/utils/bem';
import React from 'react';
import Godkjenning from './Godkjenning/Godkjenning';
import './GodkjenningSteg.less';
import Oppsummering from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/Oppsummering';
import { useMigreringSkrivebeskyttet } from '@/FeatureToggles';

const GodkjenningSteg = () => {
    const cls = BEMHelper('godkjenningSteg');
    const { avtale } = useAvtale();
    const innloggetBruker = useInnloggetBruker();
    const erSkrivebeskyttet = useMigreringSkrivebeskyttet();

    const erMentor = innloggetBruker.rolle === 'MENTOR';

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
                <Oppsummering tiltakstype={avtale.tiltakstype} avtaleInnhold={avtale.gjeldendeInnhold} />
            </Innholdsboks>
            <Godkjenning
                avtale={avtale}
                innloggetBruker={innloggetBruker}
                erSkrivebeskyttet={erSkrivebeskyttet(avtale)}
            />
            <VersjoneringKomponent avtale={avtale} />
        </div>
    );
};

export default GodkjenningSteg;
