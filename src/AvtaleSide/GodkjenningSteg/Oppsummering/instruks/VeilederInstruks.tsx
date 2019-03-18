import React from 'react';
import VeilederpanelMedUtklippstavle from '../../../../komponenter/Veilederpanel/VeilederpanelMedUtklippstavleIkon';
import { Normaltekst, Element } from 'nav-frontend-typografi';
import BEMHelper from '../../../../utils/bem';
import './instruks.less';

const cls = BEMHelper('instruks');

const VeilederInstruks = () => {
    return (
        <VeilederpanelMedUtklippstavle>
            <div className={cls.element('subheader')}>
                <Element>Som veileder må du:</Element>
            </div>
            <Normaltekst>1 - Printe ut avtalen</Normaltekst>
            <Normaltekst>
                2 - Lage en førsteside i Gosys på bedriftsnummer til
                arbeidsgiver
            </Normaltekst>
            <Normaltekst>3 - Send avtalen til scanning.</Normaltekst>
            <Normaltekst>
                4 - Journalfør avtalen på arbeidsgiver bedriftsnummer
            </Normaltekst>
            <Normaltekst>5 - Lag oppgave til behandling i Arena</Normaltekst>
            <Normaltekst>
                6 - Registrèr tiltaksgjennomføringen i Arena på vanlig måte
            </Normaltekst>
        </VeilederpanelMedUtklippstavle>
    );
};

export default VeilederInstruks;
