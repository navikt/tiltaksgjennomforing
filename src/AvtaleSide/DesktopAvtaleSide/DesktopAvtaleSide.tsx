import React from 'react';
import { Rolle } from '../../AvtaleContext';
import BEMHelper from '../../utils/bem';
import { StegInfo } from '../AvtaleSide';
import DelLenkeTilAvtalen from '../DelLenkeTilAvtalen/DelLenkeTilAvtalen';
import NesteForrige from '../NesteForrige/NesteForrige';
import Stegmeny from '../Stegmeny/Stegmeny';
import TilbakeTilOversiktLenke from '../TilbakeTilOversiktLenke/TilbakeTilOversiktLenke';

interface Props {
    avtaleSteg: StegInfo[];
    aktivtSteg: StegInfo;
    rolle: Rolle;
}
const cls = BEMHelper('avtaleside');
const DesktopAvtaleSide: React.FunctionComponent<Props> = props => {
    return (
        <>
            <div className="avtaleside__desktop">
                <div className={cls.element('lenkerlinje')}>
                    <TilbakeTilOversiktLenke />
                    {props.rolle === 'VEILEDER' && <DelLenkeTilAvtalen />}
                </div>
                <div className="avtaleside__container">
                    <Stegmeny
                        steg={props.avtaleSteg}
                        aktivtSteg={props.aktivtSteg}
                    />
                    <form className="avtaleside__innhold">
                        {props.aktivtSteg.komponent}

                        <NesteForrige
                            avtaleSteg={props.avtaleSteg}
                            aktivtSteg={props.aktivtSteg}
                        />
                    </form>
                </div>
            </div>
        </>
    );
};
export default DesktopAvtaleSide;
