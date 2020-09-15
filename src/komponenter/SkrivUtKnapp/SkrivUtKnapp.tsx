import { ReactComponent as PrinterSvg } from '@/assets/ikoner/printer.svg';
import BEMHelper from '@/utils/bem';
import { Knapp } from 'nav-frontend-knapper';
import * as React from 'react';
import { FunctionComponent } from 'react';
import './SkrivUtKnapp.less';

const printAvtale = () => {
    window.print();
};

const cls = BEMHelper('skriv-ut-knapp');

const SkrivUtKnapp: FunctionComponent = () => (
    <Knapp className={cls.className} onClick={printAvtale}>
        Skriv ut avtale
        <div className={cls.element('ikon')}>
            <PrinterSvg id="printerSvg" style={{ width: '24', height: '24' }} />
        </div>
    </Knapp>
);

export default SkrivUtKnapp;
