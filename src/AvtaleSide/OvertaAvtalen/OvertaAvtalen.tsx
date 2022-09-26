import { ReactComponent as OvertaAvtalenSVG } from '@/assets/ikoner/overtaAvtalen.svg';
import OvertaAvtaleModal from '@/AvtaleSide/OvertaAvtalen/OvertaAvtaleModal';
import UfordeltModusModal from '@/AvtaleSide/OvertaAvtalen/UfordeltModusModal';
import BEMHelper from '@/utils/bem';
import { Link } from '@navikt/ds-react';
import React, { useState } from 'react';
import './overtaAvtalen.less';

interface Props {
    forskjelligNavIdent: boolean;
    erUfordelt: boolean;
}

const cls = BEMHelper('overtaavtalen');

const OvertaAvtalen = (props: Props) => {
    const [overtaModalIsOpen, setOvertaModalIsOpen] = useState<boolean>(false);

    if (!props.forskjelligNavIdent) {
        return null;
    }

    return (
        <>
            <div className={cls.className}>
                <Link
                    onClick={() => setOvertaModalIsOpen(true)}
                    href="#"
                    className={cls.element('link')}
                    role="menuitem"
                >
                    <div aria-hidden={true}>
                        <OvertaAvtalenSVG className={cls.element('ikon')} />
                    </div>
                    Overta avtale
                </Link>
            </div>
            {props.erUfordelt ? (
                <UfordeltModusModal isOpen={overtaModalIsOpen} lukkModal={() => setOvertaModalIsOpen(false)} />
            ) : (
                <OvertaAvtaleModal isOpen={overtaModalIsOpen} lukkModal={() => setOvertaModalIsOpen(false)} />
            )}
        </>
    );
};

export default OvertaAvtalen;
