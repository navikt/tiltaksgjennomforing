import React, { createContext, useState } from 'react';
import VarselKomponent from './komponenter/Varsel/VarselKomponent';

export const FeilVarselContext = createContext<(feilmelding?: string) => void>(() => {});

export const FeilVarselProvider = (props: any) => {
    const [feilVarsel, setFeilVarsel] = useState<string | undefined>(undefined);

    return (
        <>
            {feilVarsel && (
                <VarselKomponent kanLukkes={true} type="advarsel" onLukkVarsel={() => setFeilVarsel(undefined)}>
                    {feilVarsel}
                </VarselKomponent>
            )}
            <FeilVarselContext.Provider value={setFeilVarsel}>{props.children}</FeilVarselContext.Provider>
        </>
    );
};
