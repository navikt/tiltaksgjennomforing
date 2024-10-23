import React, { FunctionComponent, PropsWithChildren, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useAvtale } from '@/AvtaleProvider';
import amplitude from '@/utils/amplitude';
import { useAsyncError } from '@/komponenter/useError';
import { Loader } from '@navikt/ds-react';

import { container } from './AvtaleFetcher.module.less';

const AvtaleFetcher: FunctionComponent<PropsWithChildren> = (props) => {
    const [laster, setLaster] = useState<boolean>(true);
    const { avtaleId } = useParams<any>();
    const { hentAvtale } = useAvtale();
    const ref = useRef<string>();
    const throwError = useAsyncError();

    useEffect(() => {
        const run = async () => {
            setLaster(true);
            try {
                await hentAvtale(avtaleId);
                setLaster(false);
                amplitude.logEvent('#tiltak-avtale-lastet');
            } catch (error) {
                amplitude.logEvent('#tiltak-avtale-lastet-feilet');
                throwError(error);
            }
        };
        if (avtaleId !== ref.current) {
            run();
        }
        ref.current = avtaleId;
    }, [avtaleId, ref, hentAvtale, setLaster, throwError]);

    if (laster) {
        return (
            <div className={container}>
                <Loader variant="neutral" size="xlarge" />
            </div>
        );
    }

    return <>{props.children}</>;
};

export default AvtaleFetcher;
