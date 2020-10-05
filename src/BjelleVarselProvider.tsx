import * as React from 'react';
import { FunctionComponent, useState } from 'react';
import Varsel from '@/types/varsel';
import * as RestService from './services/rest-service';

interface Context {
    varsler: Varsel[];
    hentVarsler: (avtaleId: string) => Promise<any>;
}

export const BjelleVarselContext = React.createContext<Context>({} as Context);

const BjelleVarselProvider: FunctionComponent = props => {
    const [varsler, setVarsler] = useState<Varsel[]>([]);
    const hentVarsler = (avtaleId: string) => RestService.hentAvtaleVarsler(avtaleId).then(setVarsler);

    return (
        <BjelleVarselContext.Provider value={{ varsler, hentVarsler }}>{props.children}</BjelleVarselContext.Provider>
    );
};

export default BjelleVarselProvider;
