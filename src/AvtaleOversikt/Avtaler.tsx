import AvtalekortMobil from '@/AvtaleOversikt/AvtalekortMobil';
import AvtaleOversiktSkeleton from '@/AvtaleOversikt/AvtaleOversiktSkeleton/AvtaleOversiktSkeleton';
import AvtaleTabell from '@/AvtaleOversikt/AvtaleTabell';
import IngenAvtaler from '@/AvtaleOversikt/IngenAvtaler/IngenAvtaler';
import useAvtaleOversiktLayout from '@/AvtaleOversikt/useAvtaleOversiktLayout';
import { FeilVarselContext } from '@/FeilVarselProvider';
import { AvtalelisteRessurs } from '@/types/avtale';
import { InnloggetBruker } from '@/types/innlogget-bruker';
import { Status } from '@/types/nettressurs';
import { Varsel } from '@/types/varsel';
import { handterFeil } from '@/utils/apiFeilUtils';
import React, { FunctionComponent, useContext } from 'react';

type Props = {
    avtalelisteRessurs: AvtalelisteRessurs;
    innloggetBruker: InnloggetBruker;
    varsler: Varsel[];
};

export const Avtaler: FunctionComponent<Props> = (props) => {
    const feilVarsel = useContext(FeilVarselContext);
    const layout = useAvtaleOversiktLayout();

    if (props.avtalelisteRessurs.status === Status.LasterInn) {
        return <AvtaleOversiktSkeleton erNavAnsatt={props.innloggetBruker.erNavAnsatt} />;
    } else if (props.avtalelisteRessurs.status === Status.Lastet && props.avtalelisteRessurs.data.length === 0) {
        return <IngenAvtaler />;
    } else if (props.avtalelisteRessurs.status === Status.Lastet) {
        return layout.erNokPlassTilTabell ? (
            <AvtaleTabell
                avtaler={props.avtalelisteRessurs.data}
                varsler={props.varsler}
                innloggetBruker={props.innloggetBruker}
            />
        ) : (
            <AvtalekortMobil avtaler={props.avtalelisteRessurs.data} varsler={props.varsler} innloggetBruker={props.innloggetBruker} />
        );
    } else if (props.avtalelisteRessurs.status === Status.Feil) {
        handterFeil(props.avtalelisteRessurs.error, feilVarsel);
    }
    return null;
};

export default Avtaler;
