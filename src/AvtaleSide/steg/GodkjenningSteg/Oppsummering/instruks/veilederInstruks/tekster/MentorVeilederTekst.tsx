import React from 'react';
import { BodyShort } from '@navikt/ds-react';

import BEMHelper from '@/utils/bem';

const MentorVeilederTekst = () => {
    const cls = BEMHelper('instruks');

    return (
        <ul>
            <li className={cls.element('list-element')}>
                <BodyShort size="small">
                    Etter at du har godkjent avtalen, må avtalen og den første tilskuddsperioden godkjennes av
                    beslutter. Det er først da avtalen er endelig godkjent.
                </BodyShort>
            </li>

            <li className={cls.element('list-element')}>
                <BodyShort size="small">
                    Arena skal ikke lenger benyttes til registrering av avtale, tilsagn eller refusjon for mentor.
                </BodyShort>
            </li>
            <li className={cls.element('list-element')}>
                <BodyShort size="small">
                    Tilsagnsbrevet sendes ikke lenger til innboksen til arbeidsgiver i Altinn. Innholdet i
                    tilsagnsbrevet er innarbeidet i avtalen til arbeidsgiver.
                </BodyShort>
            </li>
            <li className={cls.element('list-element')}>
                <BodyShort size="small">Avtalen blir automatisk journalført i Gosys.</BodyShort>
            </li>
        </ul>
    );
};

export default MentorVeilederTekst;
