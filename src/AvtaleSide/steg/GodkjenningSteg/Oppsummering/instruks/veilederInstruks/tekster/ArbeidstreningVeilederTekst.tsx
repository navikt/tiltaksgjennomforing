import React from 'react';
import { BodyShort } from '@navikt/ds-react';

import BEMHelper from '@/utils/bem';
import { TiltaksType, Avtaleopphav } from '@/types/avtale';

interface Props {
    tiltakstype: TiltaksType;
    opphav: Avtaleopphav;
}

function ArbeidstreningVeilederTekst(props: Props) {
    const { tiltakstype, opphav } = props;
    const cls = BEMHelper('instruks');

    return (
        <ul>
            <li className={cls.element('list-element')}>
                {opphav === 'ARENA' && (
                    <BodyShort size="small">Arena skal ikke lenger benyttes til registrering av avtale.</BodyShort>
                )}
                {opphav !== 'ARENA' && (
                    <BodyShort size="small">
                        Etter at avtalen er godkjent, ligger oppgaven «Forbered tiltaksgjennomføring {tiltakstype}» på
                        kontorets arbeidsbenk i Arena som du må fullføre.
                    </BodyShort>
                )}
            </li>
            <li>
                <BodyShort size="small">
                    Avtalen blir automatisk journalført i Gosys, og du trenger derfor ikke å sende inn avtalen til
                    scanning.
                </BodyShort>
            </li>
        </ul>
    );
}

export default ArbeidstreningVeilederTekst;
