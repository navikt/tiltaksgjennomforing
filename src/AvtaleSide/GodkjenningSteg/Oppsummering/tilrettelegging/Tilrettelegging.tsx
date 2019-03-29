import React from 'react';
import Stegoppsummering from '../Stegoppsummering/Stegoppsummering';
import BEMHelper from '../../../../utils/bem';
import { Avtale } from '../../../avtale';
import { Element } from 'nav-frontend-typografi';
import './tilrettelegging.less';
import TilretteleggingIkon from './TilretteleggingIkon';
import { SjekkOmInputEksisterer } from '../Avtaleparter/Avtaleparter';

const cls = BEMHelper('tilrettelegging');

interface Props {
    avtale: Avtale;
}

const Tilrettelegging = ({ avtale }: { avtale: Avtale }) => {
    const { tilrettelegging } = avtale;
    return (
        <Stegoppsummering
            ikon={<TilretteleggingIkon />}
            tittel="Tilrettelegging"
        >
            <div className={cls.className}>
                <Element className={cls.element('label')}>
                    Tilretteleggingsbehov
                </Element>
                {SjekkOmInputEksisterer(
                    tilrettelegging,
                    'NormalTekst',
                    'tilrettelegging'
                )}
            </div>
        </Stegoppsummering>
    );
};

export default Tilrettelegging;
