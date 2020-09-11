import React from 'react';
import { ReactComponent as OvertaAvtalenSVG } from '@/assets/ikoner/overtaAvtalen.svg';
import Lenke from 'nav-frontend-lenker';
import BEMHelper from '@/utils/bem';
import './overtaAvtalen.less';

interface Props {
    apneModal: () => void;
}

const cls = BEMHelper('overtaavtalen');

const OvertaAvtalen = (props: Props) => (
    <div className={cls.className}>
        <Lenke
            onClick={() => {
                props.apneModal();
            }}
            href="#"
            className={cls.element('lenke')}
        >
            <OvertaAvtalenSVG className={cls.element('ikon')} />
            Overta avtale
        </Lenke>
    </div>
);

export default OvertaAvtalen;
