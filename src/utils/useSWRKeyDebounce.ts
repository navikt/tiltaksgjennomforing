import { useEffect, useState } from 'react';

export const useSWRKeyDebounce = (keys: any[], delay: number) => {
    const [debouncedKeys, setDebouncedKeys] = useState<any[]>(keys);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedKeys(keys);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [keys, delay]);

    return debouncedKeys;
};
