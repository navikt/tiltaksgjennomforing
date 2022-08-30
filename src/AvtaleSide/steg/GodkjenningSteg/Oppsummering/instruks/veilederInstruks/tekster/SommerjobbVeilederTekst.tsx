import React, { FunctionComponent } from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { TiltaksType } from '@/types/avtale';
import BEMHelper from '@/utils/bem';

interface Props {
    tiltakstype: TiltaksType;
}

const SommerjobbVeilederTekst: FunctionComponent<Props> = (props) => {
    if (props.tiltakstype !== 'SOMMERJOBB') return null;
    const cls = BEMHelper('instruks');

    return (
        <ul>
            <li className={cls.element('list-element')}>
                <Normaltekst>
                    Etter at du har godkjent avtalen, må beslutter godkjenne tilskuddsperioden. Når beslutter har
                    godkjent, er avtalen endelig godkjent og tiltaket kan starte opp.
                </Normaltekst>
            </li>

            <li className={cls.element('list-element')}>
                <Normaltekst>
                    Hvis beslutter ikke godkjenner vil du få en melding i tjenesten med en begrunnelse og hva som
                    eventuelt må rettes opp i avtalen.
                </Normaltekst>
            </li>
            <li>
                <Normaltekst>Avtalen blir automatisk journalført i Gosys.</Normaltekst>
            </li>
        </ul>
    );
};
export default SommerjobbVeilederTekst;
