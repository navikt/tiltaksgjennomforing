import React, {createContext, useState} from 'react';
import {useEffect} from "react";
import {Feilkode} from "@/types/feilkode";

export interface Feil {
    feilkoder: Feilkode[];
}

export const FeilProviderContext = createContext<[Feil, React.Dispatch<React.SetStateAction<Feil>>]>([
    {feilkoder:[]},
    () => null,
]);

export const FeilProvider = (props: any) => {
    const [feilmeldinger, setFeilmeldinger] = useState<Feil>({ feilkoder: [] });

    useEffect(() =>
    {
        console.log("*****: ",feilmeldinger);
    },[feilmeldinger]);

    return <FeilProviderContext.Provider value={[feilmeldinger, setFeilmeldinger]}>{props.children}</FeilProviderContext.Provider>;
};
