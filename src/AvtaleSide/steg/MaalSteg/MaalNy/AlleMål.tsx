import { AvtaleContext } from '@/AvtaleProvider';
import { Maal } from '@/types/avtale';
import { Maalkategori } from '@/types/maalkategorier';
import React, { FunctionComponent, useContext } from 'react';

type Props = {
    målListe: Maal[];
    sletteMål: (id: string) => Maal[];
    endreMål: (id: string, beskrivelse: string, kategori: Maalkategori) => Maal[];
    ledigeMålkategorier: Maalkategori[];
};

//IKKE I BRUK
const AlleMål: FunctionComponent<Props> = props => {
    const avtaleContext = useContext(AvtaleContext);
    //const { sletteMål, endreMål, målListe } = useMål(avtaleContext.avtale.maal);

    const slett = (id: string) => {
        //const nyMålliste = avtaleContext.avtale.maal.filter(m => m.id !== id);
        const nyMålListe = props.sletteMål(id);
        avtaleContext.settAvtaleVerdier({ maal: nyMålListe }, true);
    };
    const endre = (id: string, beskrivelse: string, kategori: Maalkategori) => {
        // const nyMålListe = [...avtaleContext.avtale.maal];
        // const index = nyMålListe.findIndex(mål => mål.id === id);
        // nyMålListe[index] = {
        //     id: id,
        //     beskrivelse: beskrivelse,
        //     kategori: kategori,
        // };
        const nyMålListe = props.endreMål(id, beskrivelse, kategori);
        avtaleContext.settAvtaleVerdier({ maal: nyMålListe }, true);
    };

    return (
        <>
            {props.målListe.map(maal => (
                <></>
                // <EtMaal
                //     key={maal.beskrivelse}
                //     maal={maal}
                //     slett={slett}
                //     endre={endre}
                //     ledigeMålkategorier={props.ledigeMålkategorier}
                // />
            ))}
        </>
    );
};

export default AlleMål;
