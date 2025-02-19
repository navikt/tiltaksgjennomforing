import React, { FunctionComponent } from 'react';
import { BodyShort } from '@navikt/ds-react';
import BEMHelper from '@/utils/bem';
import { TiltaksType } from '@/types/avtale';

interface Props {
    tiltakstype: TiltaksType;
}

const VTAOVeilederTekst: FunctionComponent<Props> = (props) => {
    if (props.tiltakstype === 'VTAO') {
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
                        Arena skal ikke lenger benyttes til registrering av avtale, tilsagn eller refusjon for varig
                        tilrettelagt arbeid i ordinær virksomhet.
                    </BodyShort>
                </li>
                <li className={cls.element('list-element')}>
                    <BodyShort size="small">
                        Tilsagnsbrevet sendes ikke lenger til innboksen til arbeidsgiver i Altinn. Innholdet i
                        tilsagnsbrevet er innarbeidet i avtalen til arbeidsgiver.
                    </BodyShort>
                </li>
                <li className={cls.element('list-element')}>
                    <BodyShort size="small">
                        Det går automatisk melding til NAV Arbeid og ytelser med beskjed om innvilget tiltaksplass.
                    </BodyShort>
                </li>
                <li>
                    <BodyShort size="small">Avtalen blir automatisk journalført i Gosys.</BodyShort>
                </li>
            </ul>
        );
    }
    return null;
};
export default VTAOVeilederTekst;
