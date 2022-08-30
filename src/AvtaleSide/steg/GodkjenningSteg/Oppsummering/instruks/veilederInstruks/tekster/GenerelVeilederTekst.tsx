import React, { FunctionComponent } from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
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
                <Normaltekst>
                    Etter at avtalen er godkjent, ligger oppgaven «Forbered tiltaksgjennomføring {props.tiltakstype}» på
                    kontorets arbeidsbenk i Arena som du må fullføre.
                </Normaltekst>
            </li>
            <li>
                <Normaltekst>
                    Avtalen blir automatisk journalført i Gosys, og du trenger derfor ikke å sende inn avtalen til
                    scanning.
                </Normaltekst>
            </li>
        </ul>
    );
};
export default GenerelVeilederTekst;
