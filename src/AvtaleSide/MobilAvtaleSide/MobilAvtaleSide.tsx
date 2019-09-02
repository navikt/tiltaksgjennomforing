import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import React, { useState } from 'react';
import { Rolle } from '../../AvtaleContext';
import KopierLenkeModal from '../../komponenter/modal/KopierLenkeModal';
import BEMHelper from '../../utils/bem';
import { StegInfo } from '../AvtaleSide';
import DelLenkeTilAvtalen from '../DelLenkeTilAvtalen/DelLenkeTilAvtalen';
import TilbakeTilOversiktLenke from '../TilbakeTilOversiktLenke/TilbakeTilOversiktLenke';
import { element } from 'prop-types';
import classNames from 'classnames';

interface Props {
    avtaleSteg: StegInfo[];
    rolle: Rolle;
}

const cls = BEMHelper('avtaleside');

const MobilAvtaleSide: React.FunctionComponent<Props> = props => {
    const [isOpen, setOpen] = useState<boolean>(false);
    const ekspanderbartPanel = props.avtaleSteg.map(steg => (
        <div className="avtaleside__ekspanderbart-panel" key={steg.id}>
            <Ekspanderbartpanel tittel={steg.label}>
                {steg.komponent}
            </Ekspanderbartpanel>
        </div>
    ));

    return (
        <>
            <div
                className={classNames('avtaleside__lenkerlinje', {
                    avtaleside__arbeidsgiver: props.rolle === 'ARBEIDSGIVER',
                })}
            >
                <TilbakeTilOversiktLenke />
                {props.rolle === 'VEILEDER' && <DelLenkeTilAvtalen />}
            </div>
            <form>{ekspanderbartPanel}</form>

            <KopierLenkeModal
                isOpen={isOpen}
                lukkModal={() => setOpen(false)}
            />
        </>
    );
};

export default MobilAvtaleSide;
