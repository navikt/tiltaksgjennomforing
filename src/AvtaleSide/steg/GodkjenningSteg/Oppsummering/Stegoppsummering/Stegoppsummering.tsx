import * as React from 'react';
import './Stegoppsummering.less';
import BEMHelper from '@/utils/bem';
import { Heading } from '@navikt/ds-react';
import {PropsWithChildren} from "react";

const cls = BEMHelper('stegoppsummering');

interface Props {
    tittel: string;
    ikon?: React.ReactNode;
}

const Stegoppsummering: React.FunctionComponent<PropsWithChildren<Props>> = ({ tittel, ikon, children }) => (
    <div className={cls.className}>
        <div className={cls.element('header')}>
            {ikon}
            <Heading level="2" size="medium" className={cls.element('tittel')}>
                {tittel}
            </Heading>
        </div>
        {children}
    </div>
);

export default Stegoppsummering;
