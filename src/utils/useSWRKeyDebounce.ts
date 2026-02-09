import { useEffect, useRef, useState } from 'react';
import isEqual from 'lodash.isequal';

export const useSWRKeyDebounce = (keys: any[], delay: number) => {
    const [debouncedKeys, setDebouncedKeys] = useState<any[]>(keys);
    const timeoutRef = useRef<NodeJS.Timeout>();

    useEffect(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        const handler = setTimeout(() => {
            setDebouncedKeys((prevKeys) => (isEqual(prevKeys, keys) ? prevKeys : keys));
            // Only update if keys have actually changed;
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [keys, delay]);

    return debouncedKeys;
};
