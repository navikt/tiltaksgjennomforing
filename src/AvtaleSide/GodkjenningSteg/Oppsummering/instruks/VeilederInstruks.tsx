import React, { FunctionComponent } from 'react';
import VeilederpanelMedUtklippstavle from '@/komponenter/Veilederpanel/VeilederpanelMedUtklippstavleIkon';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import BEMHelper from '@/utils/bem';
import './instruks.less';
import { ReactComponent as Benken } from '@/assets/ikoner/benken.svg';
import { ReactComponent as Info } from '@/assets/ikoner/info.svg';
import { ReactComponent as Arena } from '@/assets/ikoner/arena.svg';

const cls = BEMHelper('instruks');

const VeilederInstruks: FunctionComponent = () => (
    <VeilederpanelMedUtklippstavle>
        <div className={cls.element('subheader')}>
            <Element>NB! Ny rutine:</Element>
        </div>
        <div className={cls.element('instrukslist')}>
            <Arena className={cls.element('instrukslistsvg')} />
            <Normaltekst>
                Etter at avtalen er godkjent trenger du som veileder kun å{' '}
                <b> registrere tiltaksgjennomføringen i Arena.</b>
            </Normaltekst>
        </div>
        <div className={cls.element('instrukslist')}>
            <Benken className={cls.element('instrukslistsvg')} />
            <Normaltekst>
                Etter av avtalen er godkjent ligger oppgaven «Forbered
                tiltaksgjennomføring Arbeidstrening» på kontorets arbeidsbenk i
                Arena.
            </Normaltekst>
        </div>
        <div className={cls.element('instrukslist')}>
            <Info className={cls.element('instrukslistsvg')} />
            <Normaltekst>
                Avtalen blir automatisk journalført i Gosys, og du trenger
                derfor ikke å sende inn avtalen til scanning.
            </Normaltekst>
        </div>
    </VeilederpanelMedUtklippstavle>
);

export default VeilederInstruks;
