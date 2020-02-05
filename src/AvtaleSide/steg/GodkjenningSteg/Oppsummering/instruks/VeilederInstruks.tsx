import React, { FunctionComponent } from 'react';
import VeilederpanelMedUtklippstavle from '@/komponenter/Veilederpanel/VeilederpanelMedUtklippstavleIkon';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import BEMHelper from '@/utils/bem';
import './instruks.less';
import { TiltaksType } from '@/types/avtale';

const cls = BEMHelper('instruks');

const navnPåTiltakstype = {
    ARBEIDSTRENING: 'Arbeidstrening',
    MIDLERTIDIG_LONNSTILSKUDD: 'Midlertidig lønnstilskudd',
    VARIG_LONNSTILSKUDD: 'Varig lønnstilskudd',
};

const VeilederInstruks: FunctionComponent<{ tiltakstype: TiltaksType }> = props => (
    <VeilederpanelMedUtklippstavle>
        <div className={cls.element('subheader')}>
            <Element>Hva du må gjøre videre:</Element>
        </div>
        <div className={cls.element('instrukslist')}>
            <Normaltekst>
                Etter at avtalen er godkjent ligger oppgaven «Forbered tiltaksgjennomføring{' '}
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
