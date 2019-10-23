import { Context, medContext } from '@/AvtaleContext';
import { pathTilStegIAvtale } from '@/paths';
import * as React from 'react';
import { StegInfo } from '../AvtaleSide';
import './Stegmeny.less';
import StegmenyLenke from './StegmenyLenke/StegmenyLenke';

interface Props {
    steg: StegInfo[];
    aktivtSteg: StegInfo;
}

const Stegmeny = (props: Context & Props) => {
    const stegLenker = props.steg.map(steg => (
        <StegmenyLenke
            label={steg.label}
            aktiv={props.aktivtSteg === steg}
            ferdig={false}
            url={pathTilStegIAvtale(props.avtale.id, steg.id)}
            key={steg.id}
        />
    ));

    return <nav className="stegmeny">{stegLenker}</nav>;
};

export default medContext(Stegmeny);
