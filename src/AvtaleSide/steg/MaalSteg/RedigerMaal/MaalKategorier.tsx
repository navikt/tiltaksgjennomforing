import React, { FunctionComponent, useContext } from 'react';
import { Maalkategori } from '@/types/maalkategorier';
import { AvtaleContext } from '@/AvtaleProvider';

interface Props {
    valgtMaalKategori?: Maalkategori;
    ledigeMaalKategorier: Maalkategori[];
}

const MaalKategorier: FunctionComponent<Props> = props => {
    const context = useContext(AvtaleContext);
    const redigerComponentListe = [];
    redigerComponentListe.push(
        <option value="" key="nav.no">
            Velg mål
        </option>
    );
    if (props.valgtMaalKategori) {
        redigerComponentListe.push(
            <option value={props.valgtMaalKategori} key={props.valgtMaalKategori}>
                {props.valgtMaalKategori}
            </option>
        );
    }
    const liste = props.ledigeMaalKategorier
        .filter(mal => mal !== context.mellomLagring?.kategori)
        .map((maalKategori, index) => (
            <option value={maalKategori} key={index}>
                {maalKategori}
            </option>
        ));
    redigerComponentListe.push(...liste);
    return <>{redigerComponentListe}</>;
};

export default MaalKategorier;
