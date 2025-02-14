import AvtalekortMobil from '@/AvtaleOversikt/AvtalekortMobil';
import AvtaleOversiktSkeleton from '@/AvtaleOversikt/AvtaleOversiktSkeleton/AvtaleOversiktSkeleton';
import AvtaleTabell from '@/AvtaleOversikt/AvtaleTabell';
import IngenAvtaler from '@/AvtaleOversikt/IngenAvtaler/IngenAvtaler';
import useAvtaleOversiktLayout from '@/AvtaleOversikt/useAvtaleOversiktLayout';
import { FeilVarselContext } from '@/FeilVarselProvider';
import IkkeTilgang403 from '@/Router/IkkeTilgang403';
import { PageableAvtalelisteRessurs } from '@/types/avtale';
import { IkkeTilgangError } from '@/types/errors';
import { InnloggetBruker } from '@/types/innlogget-bruker';
import { Status } from '@/types/nettressurs';
import { Varsel } from '@/types/varsel';
import { handterFeil } from '@/utils/apiFeilUtils';
import { FunctionComponent, useContext } from 'react';

type Props = {
    avtalelisteRessurs: PageableAvtalelisteRessurs;
    innloggetBruker: InnloggetBruker;
    varsler: Varsel[];
};
const harIngenAltinnTilganger = (innloggetBruker: InnloggetBruker) =>
    Object.entries(innloggetBruker.tilganger).length === 0;

export const Avtaler: FunctionComponent<Props> = (props) => {
    const feilVarsel = useContext(FeilVarselContext);
    const layout = useAvtaleOversiktLayout();

    if (props.avtalelisteRessurs.status === Status.LasterInn) {
        return <AvtaleOversiktSkeleton erNavAnsatt={props.innloggetBruker.erNavAnsatt} />;
    } else if (
        props.avtalelisteRessurs.status === Status.Lastet &&
        props.avtalelisteRessurs.data.avtaler.length === 0
    ) {
        return <IngenAvtaler />;
    } else if (props.innloggetBruker.rolle === 'ARBEIDSGIVER' && harIngenAltinnTilganger(props.innloggetBruker)) {
        return <IngenAvtaler />;
    } else if (props.avtalelisteRessurs.status === Status.Lastet) {
        return layout.erNokPlassTilTabell ? (
            <AvtaleTabell
                avtaler={props.avtalelisteRessurs.data.avtaler}
                varsler={props.varsler}
                innloggetBruker={props.innloggetBruker}
            />
        ) : (
            <AvtalekortMobil
                avtaler={props.avtalelisteRessurs.data.avtaler}
                varsler={props.varsler}
                innloggetBruker={props.innloggetBruker}
            />
        );
    } else if (
        props.avtalelisteRessurs.status === Status.Feil &&
        props.avtalelisteRessurs.error instanceof IkkeTilgangError
    ) {
        return <IkkeTilgang403 enkelVisning />;
    } else if (props.avtalelisteRessurs.status === Status.Feil) {
        handterFeil(props.avtalelisteRessurs.error, feilVarsel);
    }
    return null;
};

export default Avtaler;
