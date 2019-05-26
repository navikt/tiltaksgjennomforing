import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import React, { useState } from 'react';
import Lenke from 'nav-frontend-lenker';
import shareIkon from '../../assets/ikoner/share.svg';
import KopierLenkeModal from '../../komponenter/modal/KopierLenkeModal';
import { Rolle } from '../../AvtaleContext';
import { StegInfo } from '../AvtaleSide';

interface Props {
    avtaleSteg: StegInfo[];
    rolle: Rolle;
}

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
            {props.rolle === 'VEILEDER' && (
                <div className="avtaleside__lenkedeling">
                    <Lenke onClick={() => setOpen(true)} href="#">
                        Del lenke til avtalen <img src={shareIkon} />
                    </Lenke>
                </div>
            )}
            <form>{ekspanderbartPanel}</form>

            <KopierLenkeModal
                isOpen={isOpen}
                lukkModal={() => setOpen(false)}
            />
        </>
    );
};

export default MobilAvtaleSide;
