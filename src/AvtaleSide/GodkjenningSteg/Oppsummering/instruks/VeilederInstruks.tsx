import React, { FunctionComponent } from 'react';
import VeilederpanelMedUtklippstavle from '../../../../komponenter/Veilederpanel/VeilederpanelMedUtklippstavleIkon';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import BEMHelper from '../../../../utils/bem';
import './instruks.less';
import { ReactComponent as PrintAvtalen } from '../../../../assets/ikoner/print-text.svg';
import { ReactComponent as FilAddGosys } from '../../../../assets/ikoner/file-add.svg';
import { ReactComponent as EmailSend } from '../../../../assets/ikoner/email-send-3.svg';
import { ReactComponent as RegArena } from '../../../../assets/ikoner/box-3.svg';

const cls = BEMHelper('instruks');

const VeilederInstruks: FunctionComponent = () => (
    <VeilederpanelMedUtklippstavle>
        <div className={cls.element('subheader')}>
            <Element>Etter at avtalen er godkjent, må du som veileder</Element>
        </div>
        <div className={cls.element('instrukslist')}>
            <PrintAvtalen className={cls.element('instrukslistsvg')} />
            <Normaltekst>skrive ut avtalen</Normaltekst>
        </div>
        <div className={cls.element('instrukslist')}>
            <FilAddGosys className={cls.element('instrukslistsvg')} />
            <Normaltekst>
                lage en førsteside i Gosys på bedriftsnummeret til arbeidsgiver
            </Normaltekst>
        </div>
        <div className={cls.element('instrukslist')}>
            <EmailSend className={cls.element('instrukslistsvg')} />
            <Normaltekst>sende avtalen til skanning</Normaltekst>
        </div>
        <div className={cls.element('instrukslist')}>
            <RegArena className={cls.element('instrukslistsvg')} />
            <Normaltekst>
                registrere tiltaksgjennomføringen i Arena på vanlig måte
            </Normaltekst>
        </div>
    </VeilederpanelMedUtklippstavle>
);

export default VeilederInstruks;
