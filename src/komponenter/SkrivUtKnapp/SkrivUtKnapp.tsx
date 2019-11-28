import { ReactComponent as PrinterSvg } from '@/assets/ikoner/printer.svg';
import { Knapp } from 'nav-frontend-knapper';
import * as React from 'react';
import { FunctionComponent } from 'react';
import BEMHelper from '@/utils/bem';
import './SkrivUtKnapp.less';

const printAvtale = () => {
    window.print();
};

const cls = BEMHelper('skriv-ut-knapp');

const SkrivUtKnapp: FunctionComponent = () => (
    <Knapp className={cls.className} onClick={printAvtale}>
        Skriv ut avtale
        <div className={cls.element('ikon')}>
            <PrinterSvg />
        </div>
    </Knapp>
);

export default SkrivUtKnapp;
