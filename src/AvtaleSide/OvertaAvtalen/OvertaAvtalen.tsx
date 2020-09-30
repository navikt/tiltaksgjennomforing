import React, { useState } from 'react';
import { ReactComponent as OvertaAvtalenSVG } from '@/assets/ikoner/overtaAvtalen.svg';
import Lenke from 'nav-frontend-lenker';
import BEMHelper from '@/utils/bem';
import './overtaAvtalen.less';
import OvertaAvtaleModal from '@/AvtaleSide/OvertaAvtalen/OvertaAvtaleModal';
import UtkastModusModal from '@/AvtaleSide/OvertaAvtalen/UtkastModusModal';

interface Props {
    erVeileder: boolean;
    forskjelligNavIdent: boolean;
    erUfordelt: boolean;
}

const cls = BEMHelper('overtaavtalen');

const OvertaAvtalen = (props: Props) => {
    const [overtaModalIsOpen, setOvertaModalIsOpen] = useState<boolean>(false);

    return props.erVeileder && props.forskjelligNavIdent ? (
        <>
            <div className={cls.className}>
                <Lenke onClick={() => setOvertaModalIsOpen(true)} href="#" className={cls.element('lenke')}>
                    <OvertaAvtalenSVG className={cls.element('ikon')} />
                    Overta avtale
                </Lenke>
            </div>
            {props.erUfordelt ? (
                <UtkastModusModal isOpen={overtaModalIsOpen} lukkModal={() => setOvertaModalIsOpen(false)} />
            ) : (
                <OvertaAvtaleModal isOpen={overtaModalIsOpen} lukkModal={() => setOvertaModalIsOpen(false)} />
            )}
        </>
    ) : null;
};

export default OvertaAvtalen;
