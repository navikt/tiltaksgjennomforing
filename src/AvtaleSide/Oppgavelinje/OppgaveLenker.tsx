import React, { useContext } from 'react';
import OvertaAvtalen from '@/AvtaleSide/OvertaAvtalen/OvertaAvtalen';
import AvbryteAvtalen from '@/AvtaleSide/AvbryteAvtalen/AvbryteAvtalen';
import Hendelselogg from '@/AvtaleSide/Hendelselogg/Hendelselogg';
import DelLenkeTilAvtalen from '@/AvtaleSide/DelLenkeTilAvtalen/DelLenkeTilAvtalen';
import { AvtaleContext } from '@/AvtaleContext';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import GjenopprettAvtalen from '@/AvtaleSide/GjenopprettAvtalen/GjenopprettAvtalen';

const OppgaveLenker: React.FunctionComponent<{}> = () => {
    const context = useContext(AvtaleContext);
    const innloggetBruker = useContext(InnloggetBrukerContext);

    const erNavIdenterLike: boolean = innloggetBruker.identifikator === context.avtale.veilederNavIdent;
    const erVeileder: boolean = context.rolle === 'VEILEDER';

    return (
        <>
            <OvertaAvtalen
                erVeileder={erVeileder}
                forskjelligNavIdent={!erNavIdenterLike}
                utkastmodus={context.avtale.status === 'Utkast'}
            />
            <GjenopprettAvtalen erVeileder={erVeileder} kanGjenopprettes={context.avtale.kanGjenopprettes} />
            <AvbryteAvtalen
                avbrytAvtale={context.avbryt}
                kanAvbrytes={context.avtale.kanAvbrytes}
                erVeileder={erVeileder}
            />
            {erVeileder && <DelLenkeTilAvtalen />}
            <Hendelselogg />
        </>
    );
};

export default OppgaveLenker;
