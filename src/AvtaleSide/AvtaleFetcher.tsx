import * as React from 'react';
import { FunctionComponent, ReactElement, useEffect, useState } from 'react';
import ApiError from '../api-error';
import { Context, medContext } from '../AvtaleContext';

type Props = { avtaleId: string; render: () => ReactElement<any> } & Context;

const AvtaleFetcher: FunctionComponent<Props> = props => {
    const [lastetOk, setLastetOk] = useState<boolean>(false);
    useEffect(() => {
        const avtaleId = props.avtaleId;
        Promise.all([props.hentAvtale(avtaleId), props.hentRolle(avtaleId)])
            .then(() => setLastetOk(true))
            .catch(error => {
                if (error instanceof ApiError) {
                    props.visFeilmelding('Kan ikke åpne avtale.');
                    setLastetOk(false);
                }
            });
    }, []);

    if (!lastetOk) {
        return null;
    }

    return props.render();
};

export default medContext(AvtaleFetcher);
