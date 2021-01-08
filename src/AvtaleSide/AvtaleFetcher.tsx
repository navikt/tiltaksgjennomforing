import { AvtaleContext } from '@/AvtaleProvider';
import amplitude from '@/utils/amplitude';
import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const AvtaleFetcher: FunctionComponent = props => {
    const [lastetOk, setLastetOk] = useState<boolean>(false);
    const { avtaleId } = useParams();
    const { hentAvtale } = useContext(AvtaleContext);

    useEffect(() => {
        hentAvtale(avtaleId)
            .then(() => {
                setLastetOk(true);
                amplitude.logEvent('#tiltak-avtale-lastet');
            })
            .catch(error => {
                setLastetOk(false);
                amplitude.logEvent('#tiltak-avtale-lastet-feilet');
            });
        // eslint-disable-next-line
    }, [avtaleId]);

    if (!lastetOk) {
        return null;
    }

    return <>{props.children}</>;
};

export default AvtaleFetcher;
