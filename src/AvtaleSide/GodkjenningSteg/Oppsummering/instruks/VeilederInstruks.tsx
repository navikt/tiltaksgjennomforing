import React, { FunctionComponent } from 'react';
import VeilederpanelMedUtklippstavle from '../../../../komponenter/Veilederpanel/VeilederpanelMedUtklippstavleIkon';
import { Normaltekst, Element } from 'nav-frontend-typografi';
import BEMHelper from '../../../../utils/bem';
import './instruks.less';

const cls = BEMHelper('instruks');

const VeilederInstruks: FunctionComponent = () => (
    <VeilederpanelMedUtklippstavle>
        <div className={cls.element('subheader')}>
            <Element>Som veileder må du</Element>
        </div>
        <ul>
            <li>
                <Normaltekst>skrive ut avtalen</Normaltekst>
            </li>
            <li>
                <Normaltekst>
                    lage en førsteside i Gosys på bedriftsnummeret til
                    arbeidsgiver
                </Normaltekst>
            </li>
            <li>
                <Normaltekst>sende avtalen til skanning</Normaltekst>
            </li>
            <li>
                <Normaltekst>
                    registrere tiltaksgjennomføringen i Arena på vanlig måte
                </Normaltekst>
            </li>
        </ul>
    </VeilederpanelMedUtklippstavle>
);

export default VeilederInstruks;
