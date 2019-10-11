import React, { FunctionComponent } from 'react';
import VeilederpanelMedUtklippstavle from '@/komponenter/Veilederpanel/VeilederpanelMedUtklippstavleIkon';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import BEMHelper from '@/utils/bem';
import './instruks.less';

const cls = BEMHelper('instruks');

const VeilederInstruks: FunctionComponent = () => (
    <VeilederpanelMedUtklippstavle>
        <div className={cls.element('subheader')}>
            <Element>Ny rutine:</Element>
        </div>
        <div className={cls.element('instrukslist')}>
            <Normaltekst>
                Etter at avtalen er godkjent ligger oppgaven «Forbered
                tiltaksgjennomføring Arbeidstrening» på kontorets arbeidsbenk i
                Arena som du må fullføre.
            </Normaltekst>
        </div>
        <div className={cls.element('instrukslist')}>
            <Normaltekst>
                Avtalen blir automatisk journalført i Gosys, og du trenger
                derfor ikke å sende inn avtalen til scanning.
            </Normaltekst>
        </div>
    </VeilederpanelMedUtklippstavle>
);

export default VeilederInstruks;
