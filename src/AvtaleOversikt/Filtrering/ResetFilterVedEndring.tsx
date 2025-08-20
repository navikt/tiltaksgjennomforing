import React, { useContext, useEffect, useRef } from 'react';
import { FiltreringContext } from '@/AvtaleOversikt/Filtrering/FiltreringProvider';
import { Status } from '@/types/nettressurs';

type Props = React.PropsWithChildren;

function ResetFilterVedEndring(props: Props) {
    const { children } = props;
    const [filter, , , setNettressursCtx] = useContext(FiltreringContext);
    const filterRef = useRef(filter);

    useEffect(() => {
        if (filterRef.current !== filter) {
            setNettressursCtx({ status: Status.OMLAST });
            filterRef.current = filter;
        }
    }, [filter, filterRef, setNettressursCtx]);

    return children;
}

export default ResetFilterVedEndring;
