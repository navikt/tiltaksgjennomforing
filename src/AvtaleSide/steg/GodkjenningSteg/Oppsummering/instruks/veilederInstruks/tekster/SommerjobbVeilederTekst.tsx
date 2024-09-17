import React from 'react';
import { BodyShort } from '@navikt/ds-react';

import BEMHelper from '@/utils/bem';

const SommerjobbVeilederTekst = () => {
    const cls = BEMHelper('instruks');

    return (
        <ul>
            <li className={cls.element('list-element')}>
                <BodyShort size="small">
                    Etter at du har godkjent avtalen, må beslutter godkjenne tilskuddsperioden. Når beslutter har
                    godkjent, er avtalen endelig godkjent og tiltaket kan starte opp.
                </BodyShort>
            </li>

            <li className={cls.element('list-element')}>
                <BodyShort size="small">
                    Hvis beslutter ikke godkjenner vil du få en melding i tjenesten med en begrunnelse og hva som
                    eventuelt må rettes opp i avtalen.
                </BodyShort>
            </li>
            <li>
                <BodyShort size="small">Avtalen blir automatisk journalført i Gosys.</BodyShort>
            </li>
        </ul>
    );
};
export default SommerjobbVeilederTekst;
