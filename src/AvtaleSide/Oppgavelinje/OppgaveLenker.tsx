import { AvtaleContext } from '@/AvtaleProvider';
import AnnullerAvtalen from '@/AvtaleSide/AnnullerAvtalen/AnnullerAvtalen';
import DelLenkeTilAvtalen from '@/AvtaleSide/DelLenkeTilAvtalen/DelLenkeTilAvtalen';
import OvertaAvtalen from '@/AvtaleSide/OvertaAvtalen/OvertaAvtalen';
import EndreInkluderingsutgifter from '@/AvtaleSide/steg/GodkjenningSteg/endringAvAvtaleInnhold/EndreInkluderingsutgifter/EndreInkluderingsutgifter';
import EndreTilskuddsberegning from '@/AvtaleSide/steg/GodkjenningSteg/endringAvAvtaleInnhold/endreTilskudd/EndreTilskuddsberegning';
import ForkortAvtale from '@/AvtaleSide/steg/GodkjenningSteg/ForkortAvtale';
import ForlengAvtale from '@/AvtaleSide/steg/GodkjenningSteg/ForlengAvtale';
import Varsellogg from '@/AvtaleSide/Varsellogg/Varsellogg';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import React, { useContext } from 'react';
import EndreKontaktInformasjon from '../steg/GodkjenningSteg/endringAvAvtaleInnhold/endreKontaktInfo/EndreKontaktInformasjon';
import EndreMaal from '../steg/GodkjenningSteg/endringAvAvtaleInnhold/EndreMaal/EndreMaal';
import EndreOppfølgingOgTilrettelegging from '../steg/GodkjenningSteg/endringAvAvtaleInnhold/endreOppfølgingOgTilrettelegging/EndreOppfølgingOgTilrettelegging';
import EndreStillingbeskrivelse from '../steg/GodkjenningSteg/endringAvAvtaleInnhold/endreStillingbeskrivelse/EndreStillingbeskrivelse';

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
        <>
            {avtale.gjeldendeInnhold.antallDagerPerUke === null && avtale.godkjentAvVeileder !== null && (
                <div style={{ maxWidth: '20rem' }}>
                    <AlertStripeAdvarsel>
                        <b>Antall dager per uke</b> må fylles ut før det kan gjøres endringer på avtalen. Dette gjøres i
                        Endre stillingsbeskrivelse i denne menyen.
                    </AlertStripeAdvarsel>
                </div>
            )}
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
                </>
            )}
            <Varsellogg />
        </>
    );
};

export default OppgaveLenker;
