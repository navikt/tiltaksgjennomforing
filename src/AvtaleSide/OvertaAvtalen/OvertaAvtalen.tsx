import { ReactComponent as OvertaAvtalenSVG } from '@/assets/ikoner/overtaAvtalen.svg';
import OvertaAvtaleModal from '@/AvtaleSide/OvertaAvtalen/OvertaAvtaleModal';
import UfordeltModusModal from '@/AvtaleSide/OvertaAvtalen/UfordeltModusModal';
import BEMHelper from '@/utils/bem';
import Lenke from 'nav-frontend-lenker';
import React, { useState } from 'react';
import './overtaAvtalen.less';

interface Props {
    forskjelligNavIdent: boolean;
    erUfordelt: boolean;
}

const cls = BEMHelper('overtaavtalen');

const OvertaAvtalen = (props: Props) => {
    const [overtaModalIsOpen, setOvertaModalIsOpen] = useState<boolean>(false);

    return props.forskjelligNavIdent ? (
        <>
            <div className={cls.className}>
                <Lenke
                    onClick={() => setOvertaModalIsOpen(true)}
                    href="#"
                    className={cls.element('lenke')}
                    role="menuitem"
                >
                    <div aria-hidden={true}>
                        <OvertaAvtalenSVG className={cls.element('ikon')} />
                    </div>
                    Overta avtale
                </Lenke>
            </div>
            {props.erUfordelt ? (
                <UfordeltModusModal isOpen={overtaModalIsOpen} lukkModal={() => setOvertaModalIsOpen(false)} />
            ) : (
                <OvertaAvtaleModal isOpen={overtaModalIsOpen} lukkModal={() => setOvertaModalIsOpen(false)} />
            )}
        </>
    ) : null;
};

export default OvertaAvtalen;
