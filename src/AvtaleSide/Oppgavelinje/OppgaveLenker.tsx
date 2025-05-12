import { AvtaleContext } from '@/AvtaleProvider';
import AnnullerAvtalen from '@/AvtaleSide/AnnullerAvtalen/AnnullerAvtalen';
import OvertaAvtalen from '@/AvtaleSide/OvertaAvtalen/OvertaAvtalen';
import EndreInkluderingsutgifter from '@/AvtaleSide/steg/GodkjenningSteg/endringAvAvtaleInnhold/EndreInkluderingsutgifter/EndreInkluderingsutgifter';
import EndreOmMentor from '@/AvtaleSide/steg/GodkjenningSteg/endringAvAvtaleInnhold/EndreOmMentor/EndreOmMentor';
import EndreTilskuddsberegning from '@/AvtaleSide/steg/GodkjenningSteg/endringAvAvtaleInnhold/endreTilskudd/EndreTilskuddsberegning';
import ForkortAvtale from '@/AvtaleSide/steg/GodkjenningSteg/endringAvAvtaleInnhold/forkortAvtale/ForkortAvtale';
import ForlengAvtale from '@/AvtaleSide/steg/GodkjenningSteg/endringAvAvtaleInnhold/forlengAvtale/ForlengAvtale';
import Varsellogg from '@/AvtaleSide/Varsellogg/Varsellogg';
import { useFeatureToggles } from '@/FeatureToggleProvider';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import React, { useContext } from 'react';
import DelLenkeTilAvtalen from '../DelLenkeTilAvtalen/DelLenkeTilAvtalen';
import OppdaterOppfølgingEnhet from '../OppdaterOppfølgingsenhet/OppdaterOppfølgingsenhet';
import SendTilbakeTilBeslutterUendret from '../SendTilbakeTilBeslutterUendret/SendTilbakeTilBeslutterUendret';
import AvsluttArenaAvtale from '../steg/GodkjenningSteg/endringAvAvtaleInnhold/AvsluttArenaAvtale/AvsluttArenaAvtale';
import EndreKontaktInformasjon from '../steg/GodkjenningSteg/endringAvAvtaleInnhold/endreKontaktInfo/EndreKontaktInformasjon';
import EndreMaal from '../steg/GodkjenningSteg/endringAvAvtaleInnhold/EndreMaal/EndreMaal';
import EndreOppfølgingOgTilrettelegging from '../steg/GodkjenningSteg/endringAvAvtaleInnhold/endreOppfølgingOgTilrettelegging/EndreOppfølgingOgTilrettelegging';
import EndreStillingbeskrivelse from '../steg/GodkjenningSteg/endringAvAvtaleInnhold/endreStillingbeskrivelse/EndreStillingbeskrivelse';
import FortsettTiltak from '../steg/GodkjenningSteg/endringAvAvtaleInnhold/FortsettTiltak/FortsettTiltak';
import './OppgaveLenker.css';

const OppgaveLenker: React.FunctionComponent = () => {
    const { avtale } = useContext(AvtaleContext);
    const innloggetBruker = useContext(InnloggetBrukerContext);
    const { vtaoTiltakToggle } = useFeatureToggles();

    const harØkonomi =
        avtale.tiltakstype === 'MIDLERTIDIG_LONNSTILSKUDD' ||
        avtale.tiltakstype === 'VARIG_LONNSTILSKUDD' ||
        avtale.tiltakstype === 'SOMMERJOBB';
    const erArbeidstrening = avtale.tiltakstype === 'ARBEIDSTRENING';
    const erNavIdenterLike = innloggetBruker.identifikator === avtale.veilederNavIdent;
    const erVeileder = innloggetBruker.rolle === 'VEILEDER';
    const skalViseStillingsbeskrivelse =
        avtale.tiltakstype === 'MIDLERTIDIG_LONNSTILSKUDD' ||
        avtale.tiltakstype === 'VARIG_LONNSTILSKUDD' ||
        avtale.tiltakstype === 'SOMMERJOBB' ||
        avtale.tiltakstype === 'ARBEIDSTRENING';

    if (!erVeileder || (!vtaoTiltakToggle && avtale.tiltakstype === 'VTAO')) {
        return <Varsellogg />;
    }

    return (
        <>
            <div className={'modelLenker'}>
                <OvertaAvtalen forskjelligNavIdent={!erNavIdenterLike} erUfordelt={avtale.erUfordelt} />
                <AnnullerAvtalen />
                <AvsluttArenaAvtale />
                {avtale.tiltakstype === 'MENTOR' && <DelLenkeTilAvtalen />}
                {avtale.godkjentAvVeileder !== null && (
                    <>
                        <EndreKontaktInformasjon />
                        {erArbeidstrening && <EndreMaal />}
                        <ForkortAvtale />
                        <ForlengAvtale />
                        {skalViseStillingsbeskrivelse && <EndreStillingbeskrivelse />}
                        <EndreOppfølgingOgTilrettelegging />
                        {harØkonomi && <EndreTilskuddsberegning />}
                        {avtale.tiltakstype === 'INKLUDERINGSTILSKUDD' && <EndreInkluderingsutgifter />}
                        {avtale.tiltakstype === 'MENTOR' && <EndreOmMentor />}
                        {avtale.tiltakstype === 'VTAO' && <FortsettTiltak />}
                        <OppdaterOppfølgingEnhet />
                    </>
                )}
                {avtale.gjeldendeTilskuddsperiode?.status === 'AVSLÅTT' && <SendTilbakeTilBeslutterUendret />}
            </div>
            <Varsellogg />
        </>
    );
};

export default OppgaveLenker;
