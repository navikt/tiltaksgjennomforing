import * as React from 'react';
import { Avtale } from '../../../avtale';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import Stegoppsummering from '../Stegoppsummering/Stegoppsummering';
import BEMHelper from '../../../../utils/bem';
import './målOppsummering.less';
import MålIkon from './MålIkon';

const cls = BEMHelper('mål');

interface Props {
    avtale: Avtale;
}

const MaalOppsummering = (props: Props) => {
    const maalListe = props.avtale.maal.map(maal => (
        <div key={maal.id} className={cls.className}>
            <Undertittel className={cls.element('label')}>
                {maal.kategori}
            </Undertittel>
            <Normaltekst className={cls.element('beskrivelse')}>
                {maal.beskrivelse}
            </Normaltekst>
        </div>
    ));
    return maalListe.length > 0 ? (
        <Stegoppsummering ikon={<MålIkon />} tittel="Mål">
            {maalListe}
        </Stegoppsummering>
    ) : (
        <Stegoppsummering ikon={<MålIkon />} tittel="Mål">
            <Normaltekst className={cls.element('ikkeSatt')}>
                Ikke fylt ut
            </Normaltekst>
        </Stegoppsummering>
    );
};

export default MaalOppsummering;
