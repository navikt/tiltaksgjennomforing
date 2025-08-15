import IngenAvtaler from '@/AvtaleOversikt/IngenAvtaler/IngenAvtaler';
import { FeilVarselContext } from '@/FeilVarselProvider';
import { AvtalelisteMinimalForBeslutterRessurs } from '@/types/avtale';
import { InnloggetBruker } from '@/types/innlogget-bruker';
import { Status } from '@/types/nettressurs';
import { Varsel } from '@/types/varsel';
import { handterFeil } from '@/utils/apiFeilUtils';
import { FunctionComponent, useContext } from 'react';
import AvtaleTabellBeslutter from './AvtaleTabellBeslutter';
import BeslutterOversiktSkeleton from './BeslutterOversiktSkeleton/BeslutterOversiktSkeleton';

type Props = {
    avtalelisteRessurs: AvtalelisteMinimalForBeslutterRessurs;
    innloggetBruker: InnloggetBruker;
    varsler: Varsel[];
};

export const AvtalerBeslutter: FunctionComponent<Props> = (props) => {
    const feilVarsel = useContext(FeilVarselContext);
    if (props.avtalelisteRessurs.status === Status.LASTER_INN) {
        return <BeslutterOversiktSkeleton erNavAnsatt={props.innloggetBruker.erNavAnsatt} />;
    } else if (props.avtalelisteRessurs.status === Status.LASTET && props.avtalelisteRessurs.data.length === 0) {
        return <IngenAvtaler />;
    } else if (props.avtalelisteRessurs.status === Status.LASTET) {
        return <AvtaleTabellBeslutter avtaler={props.avtalelisteRessurs.data} varsler={props.varsler} />;
    } else if (props.avtalelisteRessurs.status === Status.FEIL) {
        handterFeil(props.avtalelisteRessurs.error, feilVarsel);
    }
    return null;
};

export default AvtalerBeslutter;
