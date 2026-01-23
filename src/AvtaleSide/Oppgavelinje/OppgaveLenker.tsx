import { AvtaleContext } from '@/AvtaleProvider';
import AnnullerAvtalen from '@/AvtaleSide/AnnullerAvtalen/AnnullerAvtalen';
import OvertaAvtalen from '@/AvtaleSide/OvertaAvtalen/OvertaAvtalen';
import EndreInkluderingsutgifter from '@/AvtaleSide/steg/GodkjenningSteg/endringAvAvtaleInnhold/EndreInkluderingsutgifter/EndreInkluderingsutgifter';
import EndreOmMentor from '@/AvtaleSide/steg/GodkjenningSteg/endringAvAvtaleInnhold/EndreOmMentor/EndreOmMentor';
import EndreTilskuddsberegning from '@/AvtaleSide/steg/GodkjenningSteg/endringAvAvtaleInnhold/endreTilskudd/EndreTilskuddsberegning';
import ForkortAvtale from '@/AvtaleSide/steg/GodkjenningSteg/endringAvAvtaleInnhold/forkortAvtale/ForkortAvtale';
import ForlengAvtale from '@/AvtaleSide/steg/GodkjenningSteg/endringAvAvtaleInnhold/forlengAvtale/ForlengAvtale';
import Varsellogg from '@/AvtaleSide/Varsellogg/Varsellogg';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import React, { useContext } from 'react';
import DelLenkeTilAvtalen from '../DelLenkeTilAvtalen/DelLenkeTilAvtalen';
import OppdaterOppfølgingEnhet from '../OppdaterOppfølgingsenhet/OppdaterOppfølgingsenhet';
import SendTilbakeTilBeslutterUendret from '../SendTilbakeTilBeslutterUendret/SendTilbakeTilBeslutterUendret';
import EndreKontaktInformasjon from '../steg/GodkjenningSteg/endringAvAvtaleInnhold/endreKontaktInfo/EndreKontaktInformasjon';
import EndreMaal from '../steg/GodkjenningSteg/endringAvAvtaleInnhold/EndreMaal/EndreMaal';
import EndreOppfølgingOgTilrettelegging from '../steg/GodkjenningSteg/endringAvAvtaleInnhold/endreOppfølgingOgTilrettelegging/EndreOppfølgingOgTilrettelegging';
import EndreStillingbeskrivelse from '../steg/GodkjenningSteg/endringAvAvtaleInnhold/endreStillingbeskrivelse/EndreStillingbeskrivelse';
import './OppgaveLenker.css';
import FortsettTiltak from '../steg/GodkjenningSteg/endringAvAvtaleInnhold/FortsettTiltak/FortsettTiltak';
import EndreKidOgKontonummer from '@/AvtaleSide/steg/GodkjenningSteg/endringAvAvtaleInnhold/endre-kid-og-kontoummer';
import { useMigreringSkrivebeskyttet } from '@/FeatureToggles';
import EndreTilskuddsberegningForMentor from '@/AvtaleSide/steg/GodkjenningSteg/endringAvAvtaleInnhold/endreTilskuddsberegningForMentor/EndreTilskuddsberegningForMentor';

const OppgaveLenker: React.FunctionComponent = () => {
    const { avtale } = useContext(AvtaleContext);
    const innloggetBruker = useContext(InnloggetBrukerContext);
    const erSkrivebeskyttet = useMigreringSkrivebeskyttet();
    const erNavIdenterLike = innloggetBruker.identifikator === avtale.veilederNavIdent;
    const erVeileder = innloggetBruker.rolle === 'VEILEDER';
    const erOppdatertMentorAvtale = avtale.tiltakstype === 'MENTOR' && (avtale.tilskuddPeriode?.length ?? 0) > 0;
    const skalViseStillingsbeskrivelse =
        avtale.tiltakstype === 'MIDLERTIDIG_LONNSTILSKUDD' ||
        avtale.tiltakstype === 'VARIG_LONNSTILSKUDD' ||
        avtale.tiltakstype === 'SOMMERJOBB' ||
        avtale.tiltakstype === 'ARBEIDSTRENING' ||
        avtale.tiltakstype === 'VTAO';
    const skalViseTilskuddsberegning =
        avtale.tiltakstype === 'MIDLERTIDIG_LONNSTILSKUDD' ||
        avtale.tiltakstype === 'VARIG_LONNSTILSKUDD' ||
        avtale.tiltakstype === 'SOMMERJOBB';
    const skalViseEndreKidOgKontonummer =
        avtale.tiltakstype === 'MIDLERTIDIG_LONNSTILSKUDD' ||
        avtale.tiltakstype === 'VARIG_LONNSTILSKUDD' ||
        avtale.tiltakstype === 'SOMMERJOBB' ||
        avtale.tiltakstype === 'VTAO' ||
        erOppdatertMentorAvtale;

    if (!erVeileder || erSkrivebeskyttet(avtale)) {
        return <Varsellogg />;
    }

    return (
        <>
            <div className={'modelLenker'}>
                <OvertaAvtalen forskjelligNavIdent={!erNavIdenterLike} erUfordelt={avtale.erUfordelt} />
                <AnnullerAvtalen />
                {avtale.tiltakstype === 'MENTOR' && <DelLenkeTilAvtalen />}
                {avtale.godkjentAvVeileder !== null && (
                    <>
                        <EndreKontaktInformasjon />
                        {avtale.tiltakstype === 'ARBEIDSTRENING' && <EndreMaal />}
                        <ForkortAvtale />
                        <ForlengAvtale />
                        {skalViseStillingsbeskrivelse && <EndreStillingbeskrivelse />}
                        <EndreOppfølgingOgTilrettelegging />
                        {skalViseTilskuddsberegning && <EndreTilskuddsberegning />}
                        {skalViseEndreKidOgKontonummer && <EndreKidOgKontonummer />}
                        {avtale.tiltakstype === 'INKLUDERINGSTILSKUDD' && <EndreInkluderingsutgifter />}
                        {avtale.tiltakstype === 'MENTOR' && <EndreOmMentor />}
                        {erOppdatertMentorAvtale && <EndreTilskuddsberegningForMentor />}
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
