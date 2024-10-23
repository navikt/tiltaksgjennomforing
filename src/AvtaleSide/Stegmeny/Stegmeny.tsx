import React, { FunctionComponent, useContext } from 'react';
import { generatePath } from 'react-router-dom';

import './Stegmeny.less';
import StegmenyLenke from './StegmenyLenke/StegmenyLenke';
import { AvtaleContext } from '@/AvtaleProvider';
import { Path } from '@/Router';
import { StegInfo } from '@/AvtaleSide/AvtaleSide';

interface Props {
    steg: StegInfo[];
    aktivtSteg: StegInfo;
}

const Stegmeny: FunctionComponent<Props> = (props: Props) => {
    const { avtale } = useContext(AvtaleContext);
    const stegLenker = props.steg.map((steg, i) => (
        <StegmenyLenke
            id={steg.id}
            label={steg.label}
            aktiv={props.aktivtSteg === steg}
            url={generatePath(Path.AVTALE_STEG, { avtaleId: avtale.id, steg: steg.id })}
            key={steg.id}
        />
    ));

    return (
        <nav id="stegmeny" className="stegmeny" role="navigation">
            <div role="menu">{stegLenker}</div>
        </nav>
    );
};

export default Stegmeny;
