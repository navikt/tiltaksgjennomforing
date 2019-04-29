import React, { useState } from 'react';
import { AvtaleStegType } from '../AvtaleSide';
import Stegmeny from '../Stegmeny/Stegmeny';
import Lenke from 'nav-frontend-lenker';
import { ReactComponent as ShareIkon } from '../../assets/ikoner/share.svg';
import KopierLenkeModal from '../../komponenter/modal/KopierLenkeModal';

interface Props {
    avtaleSteg: AvtaleStegType;
    aktivtSteg: string;
}

const DesktopAvtaleSide: React.FunctionComponent<Props> = props => {
    const [isOpen, setOpen] = useState<boolean>(false);
    return (
        <>
            <div className="avtaleside__desktop">
                <div className="avtaleside__lenkedeling">
                    <Lenke onClick={() => setOpen(true)} href="#">
                        Del lenke til avtalen <ShareIkon />
                    </Lenke>
                </div>

                <div className="avtaleside__container">
                    <Stegmeny
                        steg={props.avtaleSteg}
                        aktivtSteg={props.aktivtSteg}
                    />
                    <form className="avtaleside__innhold">
                        {props.avtaleSteg[props.aktivtSteg].komponent}
                    </form>
                </div>
            </div>

            <KopierLenkeModal
                isOpen={isOpen}
                lukkModal={() => setOpen(false)}
            />
        </>
    );
};
export default DesktopAvtaleSide;
