import { useEffect, useState } from 'react';
import { Nettressurs, Status } from '@/types/nettressurs';

export const useLaster: (
    lasteFunksjon: (skip: number, limit: number) => Promise<any[]>,
    pagesize: number,
) => {
    kanLasteMer: boolean;
    lasterMer: boolean;
    lastMer: () => Promise<any>;
    nettressurs: Nettressurs<any>;
} = (lasteFunksjon, pagesize: number) => {
    const [nettressurs, setNettressurs] = useState<Nettressurs<any[]>>({ status: Status.IkkeLastet });
    const [lasterMer, setLasterMer] = useState(false);
    const [kanLasteMer, setKanLasteMer] = useState(false);

    useEffect(() => {
        setNettressurs({ status: Status.LasterInn });
        lasteFunksjon(0, pagesize)
            .then((data: any) => {
                setNettressurs({ status: Status.Lastet, data });
                setKanLasteMer(data.length !== 0);
            })
            .catch((error: any) => setNettressurs({ status: Status.Feil, error: error }));
    }, [lasteFunksjon, pagesize]);

    if (nettressurs.status === Status.Lastet) {
        return {
            nettressurs: nettressurs,
            kanLasteMer,
            lasterMer,
            lastMer: () => {
                setLasterMer(true);
                return lasteFunksjon(nettressurs.data.length, pagesize)
                    .then((nyeData: any[]) => {
                        setNettressurs({ status: Status.Lastet, data: nettressurs.data.concat(nyeData) });
                        setLasterMer(false);
                        setKanLasteMer(nyeData.length !== 0);
                    })
                    .catch((error: any) => setNettressurs({ status: Status.Feil, error: error }));
            },
        };
    } else {
        return { nettressurs: nettressurs, lasterMer, kanLasteMer: false, lastMer: () => Promise.resolve() };
    }
};
