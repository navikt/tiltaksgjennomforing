import React, { useState } from 'react';
import { AvtaleStegType } from '../AvtaleSide';
import Stegmeny from '../Stegmeny/Stegmeny';
import Lenke from 'nav-frontend-lenker';
import { ReactComponent as ShareIkon } from '../../assets/ikoner/share.svg';
import KopierLenkeModal from '../../komponenter/modal/KopierLenkeModal';
import { Rolle } from '../../AvtaleContext';
import NesteForrige from "../NesteForrige/NesteForrige";
import Hello from "../NesteForrige/NesteForrige";

interface Props {
    avtaleSteg: AvtaleStegType;
    aktivtSteg: string;
    rolle: Rolle;
}

const DesktopAvtaleSide: React.FunctionComponent<Props> = props => {
    const [isOpen, setOpen] = useState<boolean>(false);
    return (
        <>
            <div className="avtaleside__desktop">
                {props.rolle === 'VEILEDER' && (
                    <div className="avtaleside__lenkedeling">
                        <Lenke onClick={() => setOpen(true)} href="#">
                            Del lenke til avtalen <ShareIkon />
                        </Lenke>
                    </div>
                )}

                <div className="avtaleside__container">
                    <Stegmeny
                        steg={props.avtaleSteg}
                        aktivtSteg={props.aktivtSteg}
                    />
                    <form className="avtaleside__innhold">
                        {props.avtaleSteg[props.aktivtSteg].komponent}
                        <div><Hello avtaleSteg={props.avtaleSteg} aktivtSteg={props.aktivtSteg} />
                        </div>
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
