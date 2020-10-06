import { AvtaleContext } from '@/AvtaleProvider';
import AvtaleSide from '@/AvtaleSide/AvtaleSide';
import { BjelleVarselContext } from '@/BjelleVarselProvider';
import { FeilVarselContext } from '@/FeilVarselProvider';
import amplitude from '@/utils/amplitude';
import { handterFeil } from '@/utils/apiFeilUtils';
import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

type Props = {
    avtaleId: string;
};

const AvtaleFetcher: FunctionComponent<Props> = props => {
    const [lastetOk, setLastetOk] = useState<boolean>(false);
    const { avtaleId } = useParams();
    const visFeilmelding = useContext(FeilVarselContext);
    const { hentVarsler } = useContext(BjelleVarselContext);
    const { hentAvtale } = useContext(AvtaleContext);

    useEffect(() => {
        Promise.all([hentAvtale(avtaleId), hentVarsler(avtaleId)])
            .then(() => {
                setLastetOk(true);
                amplitude.logEvent('#tiltak-avtale-lastet');
            })
            .catch(error => {
                setLastetOk(false);
                handterFeil(error, visFeilmelding, 'Kunne ikke åpne avtale');
                amplitude.logEvent('#tiltak-avtale-lastet-feilet');
            });
        // eslint-disable-next-line
    }, [avtaleId]);

    if (!lastetOk) {
        return null;
    }

    return <AvtaleSide />;
};

export default AvtaleFetcher;
