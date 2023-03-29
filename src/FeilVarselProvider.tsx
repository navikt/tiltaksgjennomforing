import React, {createContext, FunctionComponent, PropsWithChildren, useState} from 'react';
import VarselKomponent from './komponenter/Varsel/VarselKomponent';
import {IntlProvider} from "react-intl";

export const FeilVarselContext = createContext<(feilmelding?: string) => void>(() => {
    // Skal sette feilVarsel-state til undefined, men tilgjengelig først inne i FeilVarselProvider
});

export const FeilVarselProvider: FunctionComponent<PropsWithChildren> = (props) => {
    const [feilVarsel, setFeilVarsel] = useState<string | undefined>(undefined);

    return (
        <>
            {feilVarsel && (
                <VarselKomponent kanLukkes={true} type="warning" onLukkVarsel={() => setFeilVarsel(undefined)}>
                    {feilVarsel}
                </VarselKomponent>
            )}
            <FeilVarselContext.Provider value={setFeilVarsel}>{props.children}</FeilVarselContext.Provider>
        </>
    );
};
