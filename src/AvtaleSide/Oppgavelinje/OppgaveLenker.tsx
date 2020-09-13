import React, { useContext, useState } from 'react';
import TilbakeTilOversiktLenke from '@/AvtaleSide/TilbakeTilOversiktLenke/TilbakeTilOversiktLenke';
import OvertaAvtalen from '@/AvtaleSide/OvertaAvtalen/OvertaAvtalen';
import AvbryteAvtalen from '@/AvtaleSide/AvbryteAvtalen/AvbryteAvtalen';
import Hendelselogg from '@/AvtaleSide/Hendelselogg/Hendelselogg';
import DelLenkeTilAvtalen from '@/AvtaleSide/DelLenkeTilAvtalen/DelLenkeTilAvtalen';
import { ApiError } from '@/types/errors';
import { AvtaleContext } from '@/AvtaleContext';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import OvertaAvtaleModal from '@/AvtaleSide/OvertaAvtalen/OvertaAvtaleModal';
import AvbrytAvtaleModal from '@/komponenter/modal/AvbrytAvtaleModal';
import GjenopprettModal from '@/AvtaleSide/GjenopprettAvtalen/GjenopprettModal';
import BEMHelper from '@/utils/bem';
import GjenopprettAvtalen from '@/AvtaleSide/GjenopprettAvtalen/GjenopprettAvtalen';

const OppgaveLenker: React.FunctionComponent<{}> = () => {
    const cls = BEMHelper('avtaleside');
    const context = useContext(AvtaleContext);
    const innloggetBruker = useContext(InnloggetBrukerContext);

    const erNavIdenterLike: boolean = innloggetBruker.identifikator === context.avtale.veilederNavIdent;
    const erVeileder: boolean = context.rolle === 'VEILEDER';

    const [overtaModalIsOpen, setOvertaModalIsOpen] = useState<boolean>(false);
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const [apneGjenopprett, setApneGjenopprett] = useState<boolean>(false);

    const tilbakeTilOversikt = async () => {
        if (context.harUlagredeEndringer()) {
            try {
                await context.lagreAvtale();
            } catch (error) {
                if (error instanceof ApiError) {
                    return context.visFeilmelding(error.message);
                }
                throw error;
            }
        }
    };

    return (
        <>
            <TilbakeTilOversiktLenke onClick={tilbakeTilOversikt} />
            <div className={cls.element('avbrytOgDelLenk')}>
                <OvertaAvtalen erVeileder={erVeileder} forskjelligNavIdent={!erNavIdenterLike} />
                <GjenopprettAvtalen erVeileder={erVeileder} kanGjenopprettes={context.avtale.kanGjenopprettes} />
                <AvbryteAvtalen
                    avbrytAvtale={context.avbryt}
                    kanAvbrytes={context.avtale.kanAvbrytes}
                    erVeileder={erVeileder}
                />
                {erVeileder && <DelLenkeTilAvtalen />}
                <Hendelselogg />
            </div>
        </>
    );
};

export default OppgaveLenker;
