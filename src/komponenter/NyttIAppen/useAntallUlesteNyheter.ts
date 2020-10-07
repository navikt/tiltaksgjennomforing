import { useEffect, useState } from 'react';
import { Nyhet } from './Nytt';

const hentAntallUlesteNyheter = (nyheter: Nyhet[], antallLesteNyheter: number) => {
    if (nyheter.length === 0) {
        return 0;
    }

    return nyheter.length - antallLesteNyheter;
};

const LOCAL_STORAGE_KEY = 'antallLesteNyheter';

const useAntallUlesteNyheter = (nyheter: Nyhet[], onFørsteBesøk: () => void): [number, number, () => void] => {
    const [antallUlesteNyheter, setAntallUlesteNyheter] = useState<number>(0);
    const [antallUlesteVedSidelast, setAntallUlesteVedSidelast] = useState<number>(0);

    useEffect(() => {
        try {
            const localStorageValue = window.localStorage.getItem(LOCAL_STORAGE_KEY);

            if (localStorageValue) {
                const antallLesteFraLocalStorage = Number.parseInt(JSON.parse(localStorageValue));
                const antallUlesteNyheter = hentAntallUlesteNyheter(nyheter, antallLesteFraLocalStorage);

                setAntallUlesteNyheter(antallUlesteNyheter);
                setAntallUlesteVedSidelast(antallUlesteNyheter);
            } else {
                onFørsteBesøk();
                setAntallUlesteNyheter(1);
                setAntallUlesteVedSidelast(1);
            }
        } catch (error) {
            console.error('Kunne ikke hente fra local storage:', error);
        }
        // eslint-disable-next-line
    }, [nyheter]);

    const markerSomLest = () => {
        setAntallUlesteNyheter(0);

        try {
            const antallLesteNyheter = JSON.stringify(nyheter.length);
            window.localStorage.setItem(LOCAL_STORAGE_KEY, antallLesteNyheter);
        } catch (error) {
            console.error('Kunne ikke lagre til local storage:', error);
        }
    };

    return [antallUlesteNyheter, antallUlesteVedSidelast, markerSomLest];
};

export default useAntallUlesteNyheter;
