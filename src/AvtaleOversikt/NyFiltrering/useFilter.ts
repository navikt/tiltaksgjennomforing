import { useEffect, useState } from 'react';
import { useHistory } from "react-router";

export const useFilter = () => {

    const [filtre, setFiltre] = useState<any>({});
    const history = useHistory();

    useEffect(() => {
        const params: any = {};
        for (let [k, v] of new URLSearchParams(window.location.search)) {
            params[k] = v;
        }
        setFiltre(params)
    }, [window.location.search])


    const endreFilter = (f: any) => {
        const nyeFiltre = {...filtre, ...f}
        Object.keys(nyeFiltre).forEach(k => !nyeFiltre[k] && delete nyeFiltre[k]);
        history.push("?" + new URLSearchParams(nyeFiltre).toString())
        setFiltre(nyeFiltre)
    }

    return [filtre, endreFilter];
};
