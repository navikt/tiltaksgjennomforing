import Lenke from 'nav-frontend-lenker';
import React, { useState } from 'react';
import { ReactComponent as ShareIkon } from '../../assets/ikoner/share.svg';
import { Rolle } from '../../AvtaleContext';
import KopierLenkeModal from '../../komponenter/modal/KopierLenkeModal';
import { StegInfo } from '../AvtaleSide';
import NesteForrige from '../NesteForrige/NesteForrige';
import Stegmeny from '../Stegmeny/Stegmeny';
import { pathTilOversikt } from '../../paths';
import VenstreChevron from 'nav-frontend-chevron/lib/venstre-chevron';
import { Normaltekst } from 'nav-frontend-typografi';
import BEMHelper from '../../utils/bem';

interface Props {
    avtaleSteg: StegInfo[];
    aktivtSteg: StegInfo;
    rolle: Rolle;
}
const cls = BEMHelper('avtaleside');
const DesktopAvtaleSide: React.FunctionComponent<Props> = props => {
    const [isOpen, setOpen] = useState<boolean>(false);
    return (
        <>
            <div className="avtaleside__desktop">
                <div className={cls.element('lenkerlinje')}>
                    <div className={cls.element('tilbake')}>
                        <Lenke
                            href={pathTilOversikt}
                            className={cls.element('tilbakelenke', 'tilbake')}
                        >
                            <VenstreChevron
                                className={cls.element('chevron')}
                            />

                            <Normaltekst>Tilbake til oversikt</Normaltekst>
                        </Lenke>
                    </div>
                    {props.rolle === 'VEILEDER' && (
                        <div className="avtaleside__lenkedeling">
                            <Lenke onClick={() => setOpen(true)} href="#">
                                Del lenke til avtalen <ShareIkon />
                            </Lenke>
                        </div>
                    )}
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

            <KopierLenkeModal
                isOpen={isOpen}
                lukkModal={() => setOpen(false)}
            />
        </>
    );
};
export default DesktopAvtaleSide;
