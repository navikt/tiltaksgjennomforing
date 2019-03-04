import * as React from 'react';
import { FunctionComponent, ReactElement, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import ApiError from '../api-error';
import { Context, medContext } from '../AvtaleContext';

interface MatchProps {
    avtaleId: string;
    stegPath: string;
}

type Props = RouteComponentProps<MatchProps> &
    Context & { render: () => ReactElement<any> };

const AvtaleFetcher: FunctionComponent<Props> = props => {
    const [lastetOk, setLastetOk] = useState<boolean>(false);
    useEffect(() => {
        const avtaleId = props.match.params.avtaleId;
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

export default medContext<Props>(AvtaleFetcher);
