import { AvtaleContext } from '@/AvtaleProvider';
import AnnullerAvtalen from '@/AvtaleSide/AnnullerAvtalen/AnnullerAvtalen';
import DelLenkeTilAvtalen from '@/AvtaleSide/DelLenkeTilAvtalen/DelLenkeTilAvtalen';
import OvertaAvtalen from '@/AvtaleSide/OvertaAvtalen/OvertaAvtalen';
import EndreInkluderingsutgifter from '@/AvtaleSide/steg/GodkjenningSteg/endringAvAvtaleInnhold/EndreInkluderingsutgifter/EndreInkluderingsutgifter';
import EndreTilskuddsberegning from '@/AvtaleSide/steg/GodkjenningSteg/endringAvAvtaleInnhold/endreTilskudd/EndreTilskuddsberegning';
import ForkortAvtale from '@/AvtaleSide/steg/GodkjenningSteg/endringAvAvtaleInnhold/forkortAvtale/ForkortAvtale';
import ForlengAvtale from '@/AvtaleSide/steg/GodkjenningSteg/endringAvAvtaleInnhold/forlengAvtale/ForlengAvtale';
import Varsellogg from '@/AvtaleSide/Varsellogg/Varsellogg';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import React, { useContext } from 'react';
import EndreKontaktInformasjon from '../steg/GodkjenningSteg/endringAvAvtaleInnhold/endreKontaktInfo/EndreKontaktInformasjon';
import EndreMaal from '../steg/GodkjenningSteg/endringAvAvtaleInnhold/EndreMaal/EndreMaal';
import EndreOppfølgingOgTilrettelegging from '../steg/GodkjenningSteg/endringAvAvtaleInnhold/endreOppfølgingOgTilrettelegging/EndreOppfølgingOgTilrettelegging';
import EndreStillingbeskrivelse from '../steg/GodkjenningSteg/endringAvAvtaleInnhold/endreStillingbeskrivelse/EndreStillingbeskrivelse';
import EndreOmMentor from '@/AvtaleSide/steg/GodkjenningSteg/endringAvAvtaleInnhold/EndreOmMentor/EndreOmMentor';
import './OppgaveLenker.css';
import SendTilbakeTilBeslutterUendret from '../SendTilbakeTilBeslutterUendret/SendTilbakeTilBeslutterUendret';
//import OppdaterOppfølgingEnhet from '../OppdaterOppfølgingsenhet/OppdaterOppfølgingsenhet';

const OppgaveLenker: React.FunctionComponent = () => {
    const { avtale } = useContext(AvtaleContext);
    const innloggetBruker = useContext(InnloggetBrukerContext);

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

    if (!erVeileder) {
        return <Varsellogg />;
    }

    return (
        <div className="modelLenker">
            <OvertaAvtalen forskjelligNavIdent={!erNavIdenterLike} erUfordelt={avtale.erUfordelt} />
            <AnnullerAvtalen />
            <DelLenkeTilAvtalen />

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
                    {/*<OppdaterOppfølgingEnhet />*/}
                </>
            )}
            {avtale.gjeldendeTilskuddsperiode?.status === 'AVSLÅTT' && <SendTilbakeTilBeslutterUendret />}
            <Varsellogg />
        </div>
    );
};

export default OppgaveLenker;
