import React, { createContext, FunctionComponent, PropsWithChildren, useState } from 'react';
import { Alert, AlertProps } from '@navikt/ds-react';

export const FeilVarselContext = createContext<(feilmelding?: string) => void>(() => {
    // Skal sette feilVarsel-state til undefined, men tilgjengelig først inne i FeilVarselProvider
});

export const FeilVarselProvider: FunctionComponent<PropsWithChildren> = (props) => {
    const [feilVarsel, setFeilVarsel] = useState<string | undefined>(undefined);

    return (
        <>
            {feilVarsel && (
                <Alert
                    variant="warning"
                    closeButton
                    onClose={() => {
                        setFeilVarsel(undefined);
                    }}
                >
                    {feilVarsel}
                </Alert>
            )}
            <FeilVarselContext.Provider value={setFeilVarsel}>{props.children}</FeilVarselContext.Provider>
        </>
    );
};
