import { AvtaleContext } from '@/AvtaleProvider';
import AvbryteAvtalen from '@/AvtaleSide/AvbryteAvtalen/AvbryteAvtalen';
import DelLenkeTilAvtalen from '@/AvtaleSide/DelLenkeTilAvtalen/DelLenkeTilAvtalen';
import GjenopprettAvtalen from '@/AvtaleSide/GjenopprettAvtalen/GjenopprettAvtalen';
import OvertaAvtalen from '@/AvtaleSide/OvertaAvtalen/OvertaAvtalen';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import React, { useContext } from 'react';
import Varsellogg from '@/AvtaleSide/Varsellogg/Varsellogg';
import ForlengAvtale from '@/AvtaleSide/steg/GodkjenningSteg/ForlengAvtale';
import EndreTilskuddsberegning from '@/AvtaleSide/steg/GodkjenningSteg/endringAvAvtaleInnhold/endreTilskudd/EndreTilskuddsberegning';
import { Feature, FeatureToggleContext } from '@/FeatureToggleProvider';
import ForkortAvtale from '@/AvtaleSide/steg/GodkjenningSteg/ForkortAvtale';
import AnnullerAvtalen from '@/AvtaleSide/AnnullerAvtalen/AnnullerAvtalen';
import EndreKontaktInformasjon from '../steg/GodkjenningSteg/endringAvAvtaleInnhold/endreKontaktInfo/EndreKontaktInformasjon';
import EndreStillingbeskrivelse from '../steg/GodkjenningSteg/endringAvAvtaleInnhold/endreStillingbeskrivelse/EndreStillingbeskrivelse';
import EndreOppfølgingOgTilrettelegging from '../steg/GodkjenningSteg/endringAvAvtaleInnhold/endreOppfølgingOgTilrettelegging/EndreOppfølgingOgTilrettelegging';
import LaasOppKnapp from '@/AvtaleSide/steg/GodkjenningSteg/Versjonering/LaasOppKnapp';

const OppgaveLenker: React.FunctionComponent = () => {
    const { avtale, laasOpp } = useContext(AvtaleContext);
    const innloggetBruker = useContext(InnloggetBrukerContext);
    const featureToggleContext = useContext(FeatureToggleContext);
    const behandleAvtaleToggle = featureToggleContext[Feature.BehandleAvtale];
    const annullerAvtaleToggle = featureToggleContext[Feature.AnnullerAvtale];

    const erLønnstilskudd =
        avtale.tiltakstype === 'MIDLERTIDIG_LONNSTILSKUDD' ||
        avtale.tiltakstype === 'VARIG_LONNSTILSKUDD' ||
        avtale.tiltakstype === 'SOMMERJOBB';
    const erNavIdenterLike = innloggetBruker.identifikator === avtale.veilederNavIdent;
    const erVeileder = innloggetBruker.rolle === 'VEILEDER';

    if (!erVeileder) {
        return <Varsellogg />;
    }

    return (
        <>
            <OvertaAvtalen forskjelligNavIdent={!erNavIdenterLike} erUfordelt={avtale.erUfordelt} />
            <GjenopprettAvtalen kanGjenopprettes={avtale.kanGjenopprettes} />
            {!annullerAvtaleToggle && avtale.tiltakstype !== 'SOMMERJOBB' && avtale.kanAvbrytes && <AvbryteAvtalen />}
            {annullerAvtaleToggle && avtale.tiltakstype !== 'SOMMERJOBB' && avtale.kanAvbrytes && <AnnullerAvtalen />}
            {avtale.tiltakstype === 'SOMMERJOBB' && <AnnullerAvtalen />}
            <DelLenkeTilAvtalen />
            {!behandleAvtaleToggle && avtale.tiltakstype !== 'SOMMERJOBB' && avtale.kanLåsesOpp && (
                <LaasOppKnapp laasOpp={laasOpp} />
            )}
            {behandleAvtaleToggle && avtale.erLaast && (
                <>
                    <EndreKontaktInformasjon />
                    <ForkortAvtale />
                    <ForlengAvtale />
                    <EndreStillingbeskrivelse />
                    <EndreOppfølgingOgTilrettelegging />
                    {erLønnstilskudd && <EndreTilskuddsberegning />}
                </>
            )}
            <Varsellogg />
        </>
    );
};

export default OppgaveLenker;
