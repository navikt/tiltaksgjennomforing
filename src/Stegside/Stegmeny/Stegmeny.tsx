import * as React from 'react';
import StegmenyLenke from './StegmenyLenke/StegmenyLenke';
import './Stegmeny.less';
import { Context, medContext } from '../../AvtaleContext';
import { AvtaleStegType } from '../Stegside';
import { lagStegUrl } from '../../paths';

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
            url={lagStegUrl(props.avtale.id, key)}
            key={key}
        />
    ));

    return <nav className="stegmeny">{stegLenker}</nav>;
};

export default medContext(Stegmeny);
