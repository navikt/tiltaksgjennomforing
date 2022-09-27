import React, { Dispatch, PropsWithChildren, SetStateAction, useEffect, useState } from 'react';
import { AlleredeRegistrertAvtale } from '@/types/avtale';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { endrePathAlleredeOpprettet, Path } from '@/komponenter/alleredeOpprettetTiltak/api/alleredeUtils';

export interface Context {
    alleredeRegistrertAvtale: AlleredeOpprettetInfo;
    setAlleredeRegistrertAvtale: Dispatch<SetStateAction<AlleredeOpprettetInfo>>;
}

export interface AlleredeOpprettetInfo {
    avtaler: AlleredeRegistrertAvtale[] | [];
    deltaker: string;
    steg: string;
}

const initAlleredeOpprettetInfo: AlleredeOpprettetInfo = {
    avtaler: [],
    deltaker: '',
    steg: '',
};

export const AlleredeOpprettetAvtaleContext = React.createContext<Context>({
    alleredeRegistrertAvtale: initAlleredeOpprettetInfo,
} as Context);

const AlleredeOpprettetAvtaleProvider = ({ children, history }: PropsWithChildren<RouteComponentProps<any>>) => {
    const [alleredeOpprettet, setAlleredeOpprettet] = useState<AlleredeOpprettetInfo>(initAlleredeOpprettetInfo);

    useEffect(
        () =>
            history.listen((location, action) => {
                const pathnameList: string[] = location.pathname.split('/');
                endrePathAlleredeOpprettet(pathnameList, Path.OPPRETT, alleredeOpprettet, setAlleredeOpprettet);
                endrePathAlleredeOpprettet(pathnameList, Path.GODKJENN, alleredeOpprettet, setAlleredeOpprettet);
            }),
        // eslint-disable-next-line
        [history]
    );

    const context: Context = {
        alleredeRegistrertAvtale: alleredeOpprettet,
        setAlleredeRegistrertAvtale: setAlleredeOpprettet,
    };

    return (
        <AlleredeOpprettetAvtaleContext.Provider value={context}>{children}</AlleredeOpprettetAvtaleContext.Provider>
    );
};
export default withRouter(AlleredeOpprettetAvtaleProvider);
