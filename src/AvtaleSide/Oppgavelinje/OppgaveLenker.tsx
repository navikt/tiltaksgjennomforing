import { AvtaleContext } from '@/AvtaleProvider';
import AvbryteAvtalen from '@/AvtaleSide/AvbryteAvtalen/AvbryteAvtalen';
import DelLenkeTilAvtalen from '@/AvtaleSide/DelLenkeTilAvtalen/DelLenkeTilAvtalen';
import GjenopprettAvtalen from '@/AvtaleSide/GjenopprettAvtalen/GjenopprettAvtalen';
import OvertaAvtalen from '@/AvtaleSide/OvertaAvtalen/OvertaAvtalen';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import React, { useContext } from 'react';
import Varsellogg from '@/AvtaleSide/Varsellogg/Varsellogg';
import ForlengAvtale from '@/AvtaleSide/steg/GodkjenningSteg/ForlengAvtale';
import EndreTilskudssberegning from '@/AvtaleSide/steg/GodkjenningSteg/endringAvAvtaleInnhold/endreTilskudd/EndreTilskuddsberegning';
import BehandleAvtale from '@/AvtaleSide/steg/GodkjenningSteg/BehandleAvtale';
import { Feature, FeatureToggleContext } from '@/FeatureToggleProvider';
import ForkortAvtale from '@/AvtaleSide/steg/GodkjenningSteg/ForkortAvtale';
import AnnullerAvtalen from '@/AvtaleSide/AnnullerAvtalen/AnnullerAvtalen';
import EndreKontaktInformasjon from '../steg/GodkjenningSteg/endringAvAvtaleInnhold/endreKontaktInfo/EndreKontaktInformasjon';
import EndreOppfølgingOgTilrettelegging from '../steg/GodkjenningSteg/endringAvAvtaleInnhold/endreOppfølgingOgTilrettelegging/EndreOppfølgingOgTilrettelegging';

const OppgaveLenker: React.FunctionComponent = () => {
    const { avtale } = useContext(AvtaleContext);
    const innloggetBruker = useContext(InnloggetBrukerContext);
    const featureToggleContext = useContext(FeatureToggleContext);
    const behandleAvtaleToggle = featureToggleContext[Feature.BehandleAvtale];
    const annullerAvtaleToggle = featureToggleContext[Feature.AnnullerAvtale];

    const status = avtale.statusSomEnum;
    const erLønnstilskudd =
        avtale.tiltakstype === 'MIDLERTIDIG_LONNSTILSKUDD' ||
        avtale.tiltakstype === 'VARIG_LONNSTILSKUDD' ||
        avtale.tiltakstype === 'SOMMERJOBB';
    const erNavIdenterLike: boolean = innloggetBruker.identifikator === avtale.veilederNavIdent;
    const erVeileder: boolean = innloggetBruker.rolle === 'VEILEDER';

    return (
        <>
            <OvertaAvtalen
                erVeileder={erVeileder}
                forskjelligNavIdent={!erNavIdenterLike}
                erUfordelt={avtale.erUfordelt}
            />
            <GjenopprettAvtalen erVeileder={erVeileder} kanGjenopprettes={avtale.kanGjenopprettes} />
            {!annullerAvtaleToggle && erVeileder && avtale.kanAvbrytes && <AvbryteAvtalen />}
            {annullerAvtaleToggle && erVeileder && avtale.kanAvbrytes && <AnnullerAvtalen />}
            {erVeileder && (
                <>
                    <DelLenkeTilAvtalen />
                    <BehandleAvtale />
                </>
            )}
            {status === 'GJENNOMFØRES' && erVeileder && behandleAvtaleToggle && (
                <>
                    <ForkortAvtale />
                    <ForlengAvtale />
                    {erLønnstilskudd && <EndreTilskudssberegning />}
                    <EndreKontaktInformasjon />
                    <EndreOppfølgingOgTilrettelegging />
                </>
            )}
            <Varsellogg />
        </>
    );
};

export default OppgaveLenker;
