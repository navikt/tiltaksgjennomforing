import * as React from 'react';
import { FunctionComponent, useContext } from 'react';
import { Status } from '@/types/nettressurs';
import AvtaleOversiktSkeleton from '@/AvtaleOversikt/AvtaleOversiktSkeleton/AvtaleOversiktSkeleton';
import IngenAvtaler from '@/AvtaleOversikt/IngenAvtaler/IngenAvtaler';
import MediaQuery from 'react-responsive';
import AvtaleTabell from '@/AvtaleOversikt/AvtaleTabell';
import AvtalekortMobil from '@/AvtaleOversikt/AvtalekortMobil';
import { AvtalelisteRessurs } from '@/types/avtale';
import { InnloggetBruker } from '@/InnloggingBoundary/useInnlogget';
import { FeilVarselContext } from '@/FeilVarselProvider';
import Varsel from '@/types/varsel';

type Props = {
    avtalelisteRessurs: AvtalelisteRessurs;
    innloggetBruker: InnloggetBruker;
    varsler: Varsel[];
};

export const Avtaler: FunctionComponent<Props> = props => {
    const feilVarsel = useContext(FeilVarselContext);

    let avtalerInnhold;
    if (props.avtalelisteRessurs.status === Status.LasterInn) {
        avtalerInnhold = <AvtaleOversiktSkeleton erNavAnsatt={props.innloggetBruker.erNavAnsatt} />;
    } else if (props.avtalelisteRessurs.status === Status.Lastet && props.avtalelisteRessurs.data.length === 0) {
        avtalerInnhold = <IngenAvtaler />;
    } else if (props.avtalelisteRessurs.status === Status.Lastet) {
        avtalerInnhold = (
            <>
                <MediaQuery minWidth={880}>
                    <AvtaleTabell
                        avtaler={props.avtalelisteRessurs.data}
                        varsler={props.varsler}
                        innloggetBruker={props.innloggetBruker}
                    />
                </MediaQuery>
                <MediaQuery maxWidth={889}>
                    <AvtalekortMobil avtaler={props.avtalelisteRessurs.data} varsler={props.varsler} />
                </MediaQuery>
            </>
        );
    } else if (props.avtalelisteRessurs.status === Status.Feil) {
        feilVarsel(props.avtalelisteRessurs.error);
    }
    return <>{avtalerInnhold}</>;
};

export default Avtaler;
