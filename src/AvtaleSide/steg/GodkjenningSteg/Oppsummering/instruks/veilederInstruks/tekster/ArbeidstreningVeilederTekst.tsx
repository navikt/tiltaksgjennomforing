import React from 'react';
import { BodyShort } from '@navikt/ds-react';

import BEMHelper from '@/utils/bem';

function ArbeidstreningVeilederTekst() {
    const cls = BEMHelper('instruks');

    return (
        <ul>
            <li className={cls.element('list-element')}>
                <BodyShort size="small">Arena skal ikke lenger benyttes til registrering av avtale.</BodyShort>
            </li>
            <li className={cls.element('list-element')}>
                <BodyShort size="small">
                    Når avtalen er godkjent av alle parter, så sendes vedtaksbrevet automatisk til deltaker.
                </BodyShort>
            </li>
            <li className={cls.element('list-element')}>
                <BodyShort size="small">Avtalen blir automatisk journalført i Gosys.</BodyShort>
            </li>
        </ul>
    );
}

export default ArbeidstreningVeilederTekst;
