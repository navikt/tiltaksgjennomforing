import React, { FunctionComponent, useContext } from 'react';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import { AvtaleContext } from '@/AvtaleProvider';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';

const TilskuddsperioderVisning: FunctionComponent = () => {
    const innloggetBruker = useContext(InnloggetBrukerContext);
    const { avtale } = useContext(AvtaleContext);

    if (avtale.tilskuddPeriode.length === 0) {
        return null;
    }

    return (
        <div>
            <Ekspanderbartpanel tittel="">
                <div>test</div>
            </Ekspanderbartpanel>
        </div>
    );
};
export default TilskuddsperioderVisning;
