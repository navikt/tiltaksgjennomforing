import * as React from 'react';
import {Context, medContext} from '../../AvtaleContext';
import {pathTilStegIAvtale} from '../../paths';
import {AvtaleStegType} from '../AvtaleSide';
import './NesteForrige.less';
import StegmenyLenke from '../Stegmeny/StegmenyLenke/StegmenyLenke';

interface Props {
    steg: AvtaleStegType;
    aktivtSteg: string;
}

const NesteForrige = (props: Context & Props) => {
    const nesteforrigeLenker = Object.keys(props.steg).map(key => (
        <StegmenyLenke
            label={props.steg[key].label}
            aktiv={props.aktivtSteg === key}
            ferdig={false}
            url={pathTilStegIAvtale(props.avtale.id, key)}
            key={key}
        />
    ));

    return <nav className="nesteforrige">{nesteforrigeLenker}</nav>;
};

export default medContext<Props>(NesteForrige);
