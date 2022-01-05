import { AvtaleContext } from '@/AvtaleProvider';
import AnnullerAvtalen from '@/AvtaleSide/AnnullerAvtalen/AnnullerAvtalen';
import DelLenkeTilAvtalen from '@/AvtaleSide/DelLenkeTilAvtalen/DelLenkeTilAvtalen';
import OvertaAvtalen from '@/AvtaleSide/OvertaAvtalen/OvertaAvtalen';
import EndreTilskuddsberegning from '@/AvtaleSide/steg/GodkjenningSteg/endringAvAvtaleInnhold/endreTilskudd/EndreTilskuddsberegning';
import ForkortAvtale from '@/AvtaleSide/steg/GodkjenningSteg/ForkortAvtale';
import ForlengAvtale from '@/AvtaleSide/steg/GodkjenningSteg/ForlengAvtale';
import Varsellogg from '@/AvtaleSide/Varsellogg/Varsellogg';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
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

    if (!erVeileder) {
        return <Varsellogg />;
    }

    return (
        <>
            <OvertaAvtalen forskjelligNavIdent={!erNavIdenterLike} erUfordelt={avtale.erUfordelt} />
            <AnnullerAvtalen />
            <DelLenkeTilAvtalen />
            {avtale.avtaleInngått && (
                <>
                    <EndreKontaktInformasjon />
                    {erArbeidstrening && <EndreMaal />}
                    <ForkortAvtale />
                    <ForlengAvtale />
                    <EndreStillingbeskrivelse />
                    <EndreOppfølgingOgTilrettelegging />
                    {harØkonomi && <EndreTilskuddsberegning />}
                </>
            )}
            <Varsellogg />
        </>
    );
};

export default OppgaveLenker;
