import React from 'react';
import { Rolle } from '../../AvtaleContext';
import BEMHelper from '../../utils/bem';
import { StegInfo } from '../AvtaleSide';
import DelLenkeTilAvtalen from '../DelLenkeTilAvtalen/DelLenkeTilAvtalen';
import NesteForrige from '../NesteForrige/NesteForrige';
import Stegmeny from '../Stegmeny/Stegmeny';
import TilbakeTilOversiktLenke from '../TilbakeTilOversiktLenke/TilbakeTilOversiktLenke';
import AvbryteAvtalen from '../AvbryteAvtalen/AvbryteAvtalen';
import { Avtale } from '../avtale';

interface Props {
    avtaleSteg: StegInfo[];
    aktivtSteg: StegInfo;
    rolle: Rolle;
    avtale: Avtale;
}

const cls = BEMHelper('avtaleside');
const DesktopAvtaleSide: React.FunctionComponent<Props> = props => {
    const avbrytAvtalen = () => {
        alert('Er du sikker at du vil avbryte avtalen?');
        props.avtale.avbruttStatus = true;
    };
    return (
        <>
            <div className="avtaleside__desktop">
                <div className={cls.element('lenkerlinje')}>
                    <TilbakeTilOversiktLenke />
                    {props.avtale.kanAvbrytes &&
                        !props.avtale.avbruttStatus && (
                            <AvbryteAvtalen
                                avtale={props.avtale}
                                avbrytOnclick={avbrytAvtalen}
                            />
                        )}
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
