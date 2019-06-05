import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import Lenke from 'nav-frontend-lenker';
import React, { useState } from 'react';
import shareIkon from '../../assets/ikoner/share.svg';
import { Rolle } from '../../AvtaleContext';
import KopierLenkeModal from '../../komponenter/modal/KopierLenkeModal';
import { StegInfo } from '../AvtaleSide';
import { pathTilOversikt } from '../../paths';
import VenstreChevron from 'nav-frontend-chevron/lib/venstre-chevron';
import { Normaltekst } from 'nav-frontend-typografi';
import BEMHelper from '../../utils/bem';

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
            <div className={cls.element('lenkerlinje')}>
                <div className={cls.element('tilbake')}>
                    <Lenke
                        href={pathTilOversikt}
                        className={cls.element('tilbakelenke', 'tilbake')}
                    >
                        <VenstreChevron className={cls.element('chevron')} />

                        <Normaltekst>Tilbake til oversikt</Normaltekst>
                    </Lenke>
                </div>
                {props.rolle === 'VEILEDER' && (
                    <div className="avtaleside__lenkedeling">
                        <Lenke onClick={() => setOpen(true)} href="#">
                            Del lenke til avtalen <img src={shareIkon} />
                        </Lenke>
                    </div>
                )}
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
