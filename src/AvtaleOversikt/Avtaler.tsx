import * as React from 'react';
import { FunctionComponent, useContext } from 'react';
import { Status } from '@/types/nettressurs';
import AvtaleOversiktSkeleton from '@/AvtaleOversikt/AvtaleOversiktSkeleton/AvtaleOversiktSkeleton';
import IngenAvtaler from '@/AvtaleOversikt/IngenAvtaler/IngenAvtaler';
import AvtaleTabell from '@/AvtaleOversikt/AvtaleTabell';
import AvtalekortMobil from '@/AvtaleOversikt/AvtalekortMobil';
import { AvtalelisteRessurs } from '@/types/avtale';
import { InnloggetBruker } from '@/InnloggingBoundary/useInnlogget';
import { FeilVarselContext } from '@/FeilVarselProvider';
import Varsel from '@/types/varsel';
import useAvtaleOversiktLayout from '@/AvtaleOversikt/useAvtaleOversiktLayout';

type Props = {
    avtalelisteRessurs: AvtalelisteRessurs;
    innloggetBruker: InnloggetBruker;
    varsler: Varsel[];
};

export const Avtaler: FunctionComponent<Props> = props => {
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
            <AvtalekortMobil avtaler={props.avtalelisteRessurs.data} varsler={props.varsler} />
        );
    } else if (props.avtalelisteRessurs.status === Status.Feil) {
        feilVarsel(props.avtalelisteRessurs.error);
    }
    return null;
};

export default Avtaler;
