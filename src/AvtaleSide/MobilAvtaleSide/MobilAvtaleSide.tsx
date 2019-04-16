import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import React, { useState } from 'react';
import { AvtaleStegType } from '../AvtaleSide';
import Lenke from 'nav-frontend-lenker';
import shareIkon from '../../assets/ikoner/share.svg';
import KopierLenkeModal from '../../komponenter/modal/KopierLenkeModal';

interface Props {
    avtaleSteg: AvtaleStegType;
}

const MobilAvtaleSide: React.FunctionComponent<Props> = props => {
    const [isOpen, setOpen] = useState<boolean>(false);
    const ekspanderbartPanel = Object.keys(props.avtaleSteg).map(steg => (
        <div className="avtaleside__ekspanderbart-panel" key={steg}>
            <Ekspanderbartpanel tittel={props.avtaleSteg[steg].label}>
                {props.avtaleSteg[steg].komponent}
            </Ekspanderbartpanel>
        </div>
    ));

    return (
        <>
            <div className="avtaleside__lenkedeling">
                <Lenke onClick={() => setOpen(true)} href="#">
                    Del lenke til avtalen <img src={shareIkon} />
                </Lenke>
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
