import React, { useContext } from 'react';
import OvertaAvtalen from '@/AvtaleSide/OvertaAvtalen/OvertaAvtalen';
import AvbryteAvtalen from '@/AvtaleSide/AvbryteAvtalen/AvbryteAvtalen';
import Hendelselogg from '@/AvtaleSide/Hendelselogg/Hendelselogg';
import DelLenkeTilAvtalen from '@/AvtaleSide/DelLenkeTilAvtalen/DelLenkeTilAvtalen';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import GjenopprettAvtalen from '@/AvtaleSide/GjenopprettAvtalen/GjenopprettAvtalen';
import { AvtaleContext } from '@/NyAvtaleProvider';

const OppgaveLenker: React.FunctionComponent = () => {
    const { avtale, avbrytAvtale } = useContext(AvtaleContext);
    const innloggetBruker = useContext(InnloggetBrukerContext);

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
            <Hendelselogg />
        </>
    );
};

export default OppgaveLenker;
