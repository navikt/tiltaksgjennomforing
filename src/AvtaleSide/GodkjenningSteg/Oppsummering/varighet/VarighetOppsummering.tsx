import * as React from 'react';
import { Avtale } from '../../../avtale';
import Stegoppsummering from '../Stegoppsummering/Stegoppsummering';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import moment from 'moment';
import VarighetIkon from './VarighetIkon';
import { SjekkOmInputEksisterer } from '../Avtaleparter/Avtaleparter';
import BEMHelper from '../../../../utils/bem';
import './varighet.less';
import EtikettFokus from 'nav-frontend-etiketter/lib/etikettfokus';

const cls = BEMHelper('varighetOppsummering');

interface Props {
    avtale: Avtale;
}

const settInnRadStatus = (status: boolean, content: any): React.ReactNode => {
    if (status) {
        return (
            <Normaltekst className={cls.element('navn')}>{content}</Normaltekst>
        );
    }
    return standardTomBlokk();
};

const ukeSulfix = (antall: number): string => {
    return antall > 1 ? ' uker' : ' uke';
};

export const sjekkOmVerdiErSatt = (input: number): boolean => {
    if (input) {
        if (input > 0) {
            return true;
        }
    }
    return false;
};

const formaterDato = (dato: number): string => {
    return moment(dato).format('DD.MM.YYYY');
};

const harDato = (dato: number): string => {
    return dato ? formaterDato(dato).toString() : '';
};

const standardTomBlokk = (): React.ReactNode => {
    return <EtikettFokus>Ikke fylt ut</EtikettFokus>;
};

const VarighetOppsummering = ({ avtale }: { avtale: Avtale }) => {
    const {
        startDato,
        arbeidstreningLengde,
        arbeidstreningStillingprosent,
    } = avtale;
    const stillingProsent = arbeidstreningStillingprosent
        ? arbeidstreningStillingprosent.toString() + '%'
        : '';

    return (
        <Stegoppsummering ikon={<VarighetIkon />} tittel="Dato og arbeidstid">
            <div className={cls.element('content')}>
                <div className={cls.element('rad')}>
                    <div className={cls.element('element')}>
                        <Element className={cls.element('label')}>
                            Startdato
                        </Element>
                        {SjekkOmInputEksisterer(
                            harDato(startDato),
                            'normaltekst',
                            'varighetOppsummering'
                        )}
                    </div>
                    <div className={cls.element('element')}>
                        <Element className={cls.element('label')}>
                            Varighet
                        </Element>
                        {settInnRadStatus(
                            sjekkOmVerdiErSatt(arbeidstreningLengde),
                            arbeidstreningLengde
                                ? arbeidstreningLengde.toString() +
                                      ukeSulfix(arbeidstreningLengde)
                                : ''
                        )}
                    </div>
                    <div className={cls.element('element')}>
                        <Element className={cls.element('label')}>
                            Stillingsprosent
                        </Element>
                        {SjekkOmInputEksisterer(
                            stillingProsent,
                            'normaltekst',
                            'varighetOppsummering'
                        )}
                    </div>
                </div>
            </div>
        </Stegoppsummering>
    );
};

export default VarighetOppsummering;
