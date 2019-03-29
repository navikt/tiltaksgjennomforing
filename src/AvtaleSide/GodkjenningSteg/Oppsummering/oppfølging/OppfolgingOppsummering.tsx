import * as React from 'react';
import { Avtale } from '../../../avtale';
import Stegoppsummering from '../Stegoppsummering/Stegoppsummering';
import { Element } from 'nav-frontend-typografi';
import OppfølgingIkon from './OppfølgingIkon';
import BEMHelper from '../../../../utils/bem';
import './oppfølging.less';
import { HarData } from '../Avtaleparter/Avtaleparter';

const cls = BEMHelper('oppfolging');

interface Props {
    avtale: Avtale;
}

const OppfolgingOppsummering = ({ avtale }: { avtale: Avtale }) => {
    const { oppfolging } = avtale;
    return (
        <Stegoppsummering ikon={<OppfølgingIkon />} tittel="Oppfølging">
            <div className={cls.className}>
                <Element className={cls.element('label')}>
                    Oppfølgingsbehov
                </Element>
                {HarData(oppfolging)}
            </div>
        </Stegoppsummering>
    );
};

export default OppfolgingOppsummering;
