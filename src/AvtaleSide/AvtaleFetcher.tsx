import { ApiError } from '@/types/errors';
import amplitude from '@/utils/amplitude';
import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import { AvtaleContext as NyAvtaleContext } from '@/NyAvtaleProvider';
import { BjelleVarselContext } from '@/BjelleVarselProvider';
import { FeilVarselContext } from '@/FeilVarselProvider';
import AvtaleSide from '@/AvtaleSide/AvtaleSide';
import { useParams } from 'react-router-dom';

type Props = {
    avtaleId: string;
};

const AvtaleFetcher: FunctionComponent<Props> = props => {
    const [lastetOk, setLastetOk] = useState<boolean>(false);
    const { avtaleId } = useParams();
    const visFeilmelding = useContext(FeilVarselContext);
    const { hentVarsler } = useContext(BjelleVarselContext);
    const { hentAvtale } = useContext(NyAvtaleContext);

    useEffect(() => {
        Promise.all([hentAvtale(avtaleId), hentVarsler(avtaleId)])
            .then(() => {
                setLastetOk(true);
                amplitude.logEvent('#tiltak-avtale-lastet');
            })
            .catch(error => {
                if (error instanceof ApiError) {
                    visFeilmelding('Kan ikke åpne avtale.');
                    setLastetOk(false);
                }
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
