import EtikettFokus from 'nav-frontend-etiketter/lib/etikettfokus';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import * as React from 'react';
import { FunctionComponent } from 'react';
import BEMHelper from '../../../../utils/bem';
import { MaalListe } from '../../../avtale';
import Stegoppsummering from '../Stegoppsummering/Stegoppsummering';
import './MaalOppsummering.less';
import MålIkon from './MålIkon';

const cls = BEMHelper('mål');

const MaalOppsummering: FunctionComponent<MaalListe> = props => {
    const maalListe = props.maal.map(maal => (
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
            <EtikettFokus className={cls.element('etikettInfo')}>
                Mål er ikke fylt ut
            </EtikettFokus>
        </Stegoppsummering>
    );
};

export default MaalOppsummering;
