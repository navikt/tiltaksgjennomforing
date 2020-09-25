import { Context, medContext } from '@/AvtaleContext';
import { ApiError } from '@/types/errors';
import amplitude from '@/utils/amplitude';
import React, { FunctionComponent, useEffect, useState } from 'react';

type Props = {
    avtaleId: string;
} & Context;

const AvtaleFetcher: FunctionComponent<Props> = props => {
    const [lastetOk, setLastetOk] = useState<boolean>(false);
    const avtaleId = props.avtaleId || 'dummy';
    useEffect(() => {
        Promise.all([props.hentAvtale(avtaleId), props.hentRolle(avtaleId), props.hentVarsler(avtaleId)])
            .then(() => {
                setLastetOk(true);
                amplitude.setUserProperties({ rolle: props.rolle });
                amplitude.logEvent('#tiltak-avtale-lastet');
            })
            .catch(error => {
                if (error instanceof ApiError) {
                    props.visFeilmelding('Kan ikke åpne avtale.');
                    setLastetOk(false);
                }
                amplitude.logEvent('#tiltak-avtale-lastet-feilet');
            });
        // eslint-disable-next-line
    }, [avtaleId]);
    if (!lastetOk) {
        return null;
    }
    return <>{props.children}</>;
};

export default medContext(AvtaleFetcher);
