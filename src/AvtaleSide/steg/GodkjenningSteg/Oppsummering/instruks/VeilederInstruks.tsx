import VeilederpanelMedUtklippstavle from '@/komponenter/Veilederpanel/VeilederpanelMedUtklippstavleIkon';
import { TiltaksType } from '@/types/avtale';
import BEMHelper from '@/utils/bem';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import './instruks.less';

const cls = BEMHelper('instruks');

const navnPåTiltakstype = {
    ARBEIDSTRENING: 'Arbeidstrening',
    MIDLERTIDIG_LONNSTILSKUDD: 'Midlertidig lønnstilskudd',
    VARIG_LONNSTILSKUDD: 'Varig lønnstilskudd',
    MENTOR: 'Mentor',
    SOMMERJOBB: 'Sommerjobb',
};

const VeilederInstruks: FunctionComponent<{ tiltakstype: TiltaksType }> = props => (
    <VeilederpanelMedUtklippstavle>
        <div className={cls.element('subheader')}>
            <Element>Hva du må gjøre videre:</Element>
        </div>
        {navnPåTiltakstype.SOMMERJOBB && (
            <ul>
                <li>
                    <Normaltekst>
                        Etter at du har godkjent avtalen, må beslutter godkjenne tilskuddsperioden. Når beslutter har
                        godkjent, er avtalen endelig godkjent og tiltaket kan starte opp.
                    </Normaltekst>
                </li>
                <li>
                    <Normaltekst>
                        Hvis beslutter ikke godkjenner vil du få en melding i tjenesten med en begrunnelse og hva som
                        eventuelt må rettes opp i avtalen.
                    </Normaltekst>
                </li>
                <li>
                    <Normaltekst>Avtalen blir automatisk journalført i Gosys.</Normaltekst>
                </li>
            </ul>
        )}
        <div className={cls.element('instrukslist')}>
            <Normaltekst>
                Etter at avtalen er godkjent, ligger oppgaven «Forbered tiltaksgjennomføring{' '}
                {navnPåTiltakstype[props.tiltakstype]}» på kontorets arbeidsbenk i Arena som du må fullføre.
            </Normaltekst>
        </div>
        <div className={cls.element('instrukslist')}>
            <Normaltekst>
                Avtalen blir automatisk journalført i Gosys, og du trenger derfor ikke å sende inn avtalen til scanning.
            </Normaltekst>
        </div>
    </VeilederpanelMedUtklippstavle>
);

export default VeilederInstruks;
