import * as React from 'react';
import { Systemtittel } from 'nav-frontend-typografi';
import './Stegoppsummering.less';
import BEMHelper from '@/utils/bem';

const cls = BEMHelper('stegoppsummering');

interface Props {
    tittel: string;
    ikon?: React.ReactNode;
}

const Stegoppsummering: React.FunctionComponent<Props> = ({ tittel, ikon, children }) => (
    <div className={cls.className}>
        <div className={cls.element('header')}>
            {ikon}
            <Systemtittel className={cls.element('tittel')}>{tittel}</Systemtittel>
        </div>
        {children}
    </div>
);

export default Stegoppsummering;
