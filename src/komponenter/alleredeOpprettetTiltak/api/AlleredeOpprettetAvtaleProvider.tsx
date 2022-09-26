import React, { Dispatch, PropsWithChildren, SetStateAction, useState } from 'react';
import { AlleredeRegistrertAvtale } from '@/types/avtale';

export interface Context {
    alleredeRegistrertAvtale: AlleredeRegistrertAvtale[] | [];
    setAlleredeRegistrertAvtale: Dispatch<SetStateAction<AlleredeRegistrertAvtale[]>>;
}

export const AlleredeOpprettetAvtaleContext = React.createContext<Context>({ alleredeRegistrertAvtale: [] } as Context);

export const AlleredeOpprettetAvtaleProvider: React.FC = ({ children }: PropsWithChildren<{}>) => {
    const [alleredeOpprettet, setAlleredeOpprettet] = useState<AlleredeRegistrertAvtale[] | []>([]);

    const context: Context = {
        alleredeRegistrertAvtale: alleredeOpprettet,
        setAlleredeRegistrertAvtale: setAlleredeOpprettet,
    };

    return (
        <AlleredeOpprettetAvtaleContext.Provider value={context}>{children}</AlleredeOpprettetAvtaleContext.Provider>
    );
};
