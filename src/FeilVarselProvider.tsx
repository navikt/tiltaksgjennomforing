import React, { createContext, FunctionComponent, PropsWithChildren, useState } from 'react';
import { Alert, AlertProps } from '@navikt/ds-react';

export const FeilVarselContext = createContext<(feilmelding?: string) => void>(() => {
    // Skal sette feilVarsel-state til undefined, men tilgjengelig først inne i FeilVarselProvider
});

export const FeilVarselProvider: FunctionComponent<PropsWithChildren> = (props) => {
    const [feilVarsel, setFeilVarsel] = useState<string | undefined>(undefined);

    const AlertWithCloseButton = ({
        children,
        variant,
    }: {
        children?: React.ReactNode;
        variant: AlertProps['variant'];
    }) => {
        const [show, setShow] = React.useState(true);
        const lukkVarselModal = () => {
            setFeilVarsel(undefined);
            setShow(false);
        };
        return show ? (
            <Alert variant={variant} closeButton onClose={() => lukkVarselModal()}>
                {children || 'Content'}
            </Alert>
        ) : null;
    };
    return (
        <>
            {feilVarsel && <AlertWithCloseButton variant="warning">{feilVarsel}</AlertWithCloseButton>}
            <FeilVarselContext.Provider value={setFeilVarsel}>{props.children}</FeilVarselContext.Provider>
        </>
    );
};
