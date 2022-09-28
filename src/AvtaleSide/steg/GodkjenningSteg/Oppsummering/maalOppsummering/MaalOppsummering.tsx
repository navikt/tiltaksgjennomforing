import { MaalListe } from '@/types/avtale';
import BEMHelper from '@/utils/bem';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import { Tag } from '@navikt/ds-react';
import { FormattedMessage } from 'react-intl';
import Stegoppsummering from '../Stegoppsummering/Stegoppsummering';
import MaalIkon from './MaalIkon';
import './MaalOppsummering.less';

const cls = BEMHelper('mål');

const MaalOppsummering: FunctionComponent<MaalListe> = (props) => {
    const maalListe = props.maal.map((maal) => (
        <div key={maal.id} className={cls.className}>
            <Undertittel className={cls.element('label')}>
                <FormattedMessage id={maal.kategori} />
            </Undertittel>
            <Normaltekst className={cls.element('beskrivelse')}>{maal.beskrivelse}</Normaltekst>
        </div>
    ));
    return maalListe.length > 0 ? (
        <Stegoppsummering ikon={<MaalIkon />} tittel="Mål">
            {maalListe}
        </Stegoppsummering>
    ) : (
        <Stegoppsummering ikon={<MaalIkon />} tittel="Mål">
            <Tag variant="warning" className={cls.element('etikettInfo')}>
                Mål er ikke fylt ut
            </Tag>
        </Stegoppsummering>
    );
};

export default MaalOppsummering;
