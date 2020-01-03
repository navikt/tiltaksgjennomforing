import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import React, { useState } from 'react';
import { Rolle } from '@/AvtaleContext';
import BEMHelper from '@/utils/bem';
import { StegInfo } from '../AvtaleSide';
import DelLenkeTilAvtalen from '../DelLenkeTilAvtalen/DelLenkeTilAvtalen';
import TilbakeTilOversiktLenke from '../TilbakeTilOversiktLenke/TilbakeTilOversiktLenke';
import KopierLenkeModal from '../DelLenkeTilAvtalen/KopierLenkeModal';

interface Props {
    avtaleSteg: StegInfo[];
    rolle: Rolle;
    varsler?: JSX.Element[];
    tilbakeTilOversiktKlikk: () => void;
}
const cls = BEMHelper('avtaleside');

const MobilAvtaleSide: React.FunctionComponent<Props> = props => {
    const [isOpen, setOpen] = useState<boolean>(false);
    const ekspanderbartPanel = props.avtaleSteg.map(steg => (
        <div className="avtaleside__ekspanderbart-panel" key={steg.id}>
            <Ekspanderbartpanel tittel={steg.label}>{steg.komponent}</Ekspanderbartpanel>
        </div>
    ));

    return (
        <>
            <div className={cls.element('lenkerlinje')}>
                <TilbakeTilOversiktLenke onClick={props.tilbakeTilOversiktKlikk} />
                {props.rolle === 'VEILEDER' && <DelLenkeTilAvtalen />}
            </div>
            {props.varsler}
            <form>{ekspanderbartPanel}</form>

            <KopierLenkeModal isOpen={isOpen} lukkModal={() => setOpen(false)} />
        </>
    );
};

export default MobilAvtaleSide;
