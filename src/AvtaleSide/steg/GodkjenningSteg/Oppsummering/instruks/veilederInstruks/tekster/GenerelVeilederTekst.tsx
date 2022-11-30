import React, { FunctionComponent } from 'react';
import { BodyShort } from '@navikt/ds-react';
import BEMHelper from '@/utils/bem';

interface Props {
    tiltakstype: string;
    erPilot: boolean;
}

const GenerelVeilederTekst: FunctionComponent<Props> = (props) => {
    if (props.tiltakstype === 'SOMMERJOBB' && props.erPilot) return null;
    const cls = BEMHelper('instruks');
    return (
        <ul>
            <li className={cls.element('list-element')}>
                <BodyShort size="small">
                    Etter at avtalen er godkjent, ligger oppgaven «Forbered tiltaksgjennomføring {props.tiltakstype}» på
                    kontorets arbeidsbenk i Arena som du må fullføre.
                </BodyShort>
            </li>
            <li>
                <BodyShort size="small">
                    Avtalen blir automatisk journalført i Gosys, og du trenger derfor ikke å sende inn avtalen til
                    scanning.
                </BodyShort>
            </li>
        </ul>
    );
};
export default GenerelVeilederTekst;
