import { Rolle } from '@/AvtaleContext';
import BEMHelper from '@/utils/bem';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import React from 'react';
import { StegInfo } from '../AvtaleSide';
import Hendelselogg from '../Hendelselogg/Hendelselogg';
import TilbakeTilOversiktLenke from '../TilbakeTilOversiktLenke/TilbakeTilOversiktLenke';

interface Props {
    avtaleSteg: StegInfo[];
    rolle: Rolle;
    varsler?: JSX.Element[];
    tilbakeTilOversiktKlikk: () => void;
}

const cls = BEMHelper('avtaleside');

const MobilAvtaleSide: React.FunctionComponent<Props> = props => {
    const ekspanderbartPanel = props.avtaleSteg.map(steg => (
        <div className="avtaleside__ekspanderbart-panel" key={steg.id}>
            <Ekspanderbartpanel tittel={steg.label}>{steg.komponent}</Ekspanderbartpanel>
        </div>
    ));

    return (
        <>
            <div className={cls.element('lenkerlinje')}>
                <TilbakeTilOversiktLenke onClick={props.tilbakeTilOversiktKlikk} />
                <Hendelselogg />
            </div>
            {props.varsler}
            <form>{ekspanderbartPanel}</form>
        </>
    );
};

export default MobilAvtaleSide;
