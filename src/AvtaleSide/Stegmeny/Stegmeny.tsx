import { AvtaleContext } from '@/AvtaleProvider';
import { pathTilStegIAvtale } from '@/paths';
import * as React from 'react';
import { FunctionComponent, useContext } from 'react';
import { StegInfo } from '../AvtaleSide';
import './Stegmeny.less';
import StegmenyLenke from './StegmenyLenke/StegmenyLenke';

interface Props {
    steg: StegInfo[];
    aktivtSteg: StegInfo;
}

const Stegmeny: FunctionComponent<Props> = (props: Props) => {
    const { avtale } = useContext(AvtaleContext);
    const stegLenker = props.steg.map(steg => (
        <StegmenyLenke
            label={steg.label}
            aktiv={props.aktivtSteg === steg}
            ferdig={false}
            url={pathTilStegIAvtale(avtale.id, steg.id)}
            key={steg.id}
        />
    ));

    return (
        <nav className="stegmeny" role="navigation">
            <div role="menu">{stegLenker}</div>
        </nav>
    );
};

export default Stegmeny;
