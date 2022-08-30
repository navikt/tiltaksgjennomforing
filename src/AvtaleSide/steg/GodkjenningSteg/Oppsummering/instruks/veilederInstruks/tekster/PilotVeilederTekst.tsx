import React, { FunctionComponent } from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import BEMHelper from '@/utils/bem';

const PilotVeilederTekst: FunctionComponent<{ erPilot: boolean }> = ({ erPilot }: { erPilot: boolean }) => {
    if (!erPilot) return null;
    const cls = BEMHelper('instruks');
    return (
        <ul>
            <li className={cls.element('list-element')}>
                <Normaltekst>
                    Etter at du har godkjent avtalen, må avtalen og de første tilskuddsperiodene godkjennes av
                    beslutter. Det er først da avtalen er endelig godkjent.
                </Normaltekst>
            </li>
            <li className={cls.element('list-element')}>
                <Normaltekst>
                    Arena skal ikke lenger benyttes til registrering av avtale, tilsagn eller refusjon for
                    lønnstilskudd.
                </Normaltekst>
            </li>
            <li className={cls.element('list-element')}>
                <Normaltekst>
                    Tilsagnsbrevet sendes ikke lenger til innboksen til arbeidsgiver i Altinn. Innholdet i
                    tilsagnsbrevet er innarbeidet i avtalen til arbeidsgiver.
                </Normaltekst>
            </li>
            <li>
                <Normaltekst>Avtalen blir automatisk journalført i Gosys.</Normaltekst>
            </li>
        </ul>
    );
};
export default PilotVeilederTekst;
