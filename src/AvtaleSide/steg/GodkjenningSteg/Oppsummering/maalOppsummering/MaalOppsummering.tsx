import { MaalListe } from '@/types/avtale';
import BEMHelper from '@/utils/bem';
import React, { FunctionComponent } from 'react';
import { BodyShort, Heading, Tag } from '@navikt/ds-react';

import { messages } from '@/messages';
import Stegoppsummering from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/Stegoppsummering/Stegoppsummering'

import MaalIkon from './MaalIkon';
import './MaalOppsummering.less';

const cls = BEMHelper('mål');

const MaalOppsummering: FunctionComponent<MaalListe> = (props) => {
    const maalListe = props.maal.map((maal) => (
        <div key={maal.id} className={cls.className}>
            <Heading level='3' size="small" className={cls.element('label')}>
                {messages[maal.kategori]}
            </Heading>
            <BodyShort size="small" className={cls.element('beskrivelse')}>
                {maal.beskrivelse}
            </BodyShort>
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
