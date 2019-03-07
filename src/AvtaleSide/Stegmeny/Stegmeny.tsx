import * as React from 'react';
import { Context, medContext } from '../../AvtaleContext';
import { pathTilStegIAvtale } from '../../paths';
import { AvtaleStegType } from '../AvtaleSide';
import './Stegmeny.less';
import StegmenyLenke from './StegmenyLenke/StegmenyLenke';

interface Props {
    steg: AvtaleStegType;
    aktivtSteg: string;
}

const Stegmeny = (props: Context & Props) => {
    const stegLenker = Object.keys(props.steg).map(key => (
        <StegmenyLenke
            label={props.steg[key].label}
            aktiv={props.aktivtSteg === key}
            ferdig={false}
            url={pathTilStegIAvtale(props.avtale.id, key)}
            key={key}
        />
    ));

    return <nav className="stegmeny">{stegLenker}</nav>;
};

export default medContext<Props>(Stegmeny);
