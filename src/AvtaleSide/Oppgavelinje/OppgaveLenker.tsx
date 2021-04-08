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

const OppgaveLenker: React.FunctionComponent = () => {
    const { avtale, avbrytAvtale } = useContext(AvtaleContext);
    const innloggetBruker = useContext(InnloggetBrukerContext);

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
            <AvbryteAvtalen avbrytAvtale={avbrytAvtale} kanAvbrytes={avtale.kanAvbrytes} erVeileder={erVeileder} />
            {erVeileder && <DelLenkeTilAvtalen />}
            {status === 'GJENNOMFØRES' && erVeileder && (
                <>
                    <ForlengAvtale />
                    {erLønnstilskudd && <EndreTilskudssberegning />}
                </>
            )}
            <Varsellogg />
        </>
    );
};

export default OppgaveLenker;
