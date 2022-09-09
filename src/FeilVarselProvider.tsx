import React, { createContext, FunctionComponent, useState } from 'react';
import VarselKomponent from './komponenter/Varsel/VarselKomponent';

export const FeilVarselContext = createContext<(feilmelding?: string) => void>(() => {
    // Skal sette feilVarsel-state til undefined, men tilgjengelig først inne i FeilVarselProvider
});

export const FeilVarselProvider: FunctionComponent = (props) => {
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
