import moment from 'moment';
import { Element } from 'nav-frontend-typografi';
import * as React from 'react';
import { FunctionComponent } from 'react';
import BEMHelper from '@/utils/bem';
import { Varighet } from '@/types/avtale';
import SjekkOmVerdiEksisterer from '../SjekkOmVerdiEksisterer/SjekkOmVerdiEksisterer';
import Stegoppsummering from '../Stegoppsummering/Stegoppsummering';
import './varighet.less';
import VarighetIkon from './VarighetIkon';

const cls = BEMHelper('varighetOppsummering');

const formaterDato = (dato: number): string => {
    return moment(dato).format('DD.MM.YYYY');
};

const harDato = (dato: number): string => {
    return dato ? formaterDato(dato).toString() : '';
};

const VarighetOppsummering: FunctionComponent<Varighet> = ({ startDato, sluttDato, stillingprosent }) => {
    const stillingProsent = stillingprosent ? stillingprosent.toString() + '%' : '';

    return (
        <Stegoppsummering ikon={<VarighetIkon />} tittel="Dato og arbeidstid">
            <div className={cls.element('content')}>
                <div className={cls.element('rad')}>
                    <div className={cls.element('element')}>
                        <Element className={cls.element('label')}>Startdato</Element>
                        <SjekkOmVerdiEksisterer verdi={harDato(startDato)} clsName="varighetOppsummering" />
                    </div>
                    <div className={cls.element('element')}>
                        <Element className={cls.element('label')}>Sluttdato</Element>
                        <SjekkOmVerdiEksisterer verdi={harDato(sluttDato)} clsName="varighetOppsummering" />
                    </div>
                    <div className={cls.element('element')}>
                        <Element className={cls.element('label')}>Stillingsprosent</Element>
                        <SjekkOmVerdiEksisterer verdi={stillingProsent} clsName="varighetOppsummering" />
                    </div>
                </div>
            </div>
        </Stegoppsummering>
    );
};

export default VarighetOppsummering;
