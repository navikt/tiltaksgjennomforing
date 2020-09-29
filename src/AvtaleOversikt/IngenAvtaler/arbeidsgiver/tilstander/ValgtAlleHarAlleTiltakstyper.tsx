import * as React from 'react';
import { FunctionComponent } from 'react';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import { ReactComponent as InfoIkon } from '@/assets/ikoner/info.svg';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import BEMHelper from '@/utils/bem';

const cls = BEMHelper('ingenAvtalerArbeidsgiver');

type Props = { bedriftNavn: string };

const ValgtAlleHarAlleTiltakstyper: FunctionComponent<Props> = props => {
    return (
        <Innholdsboks>
            <div className={cls.element('headerContainer')}>
                <InfoIkon className={cls.element('headerIkon')} />
                <Innholdstittel>Ingen avtaler</Innholdstittel>
            </div>
            <Normaltekst>Det har ikke blitt opprettet noen avtaler på {props.bedriftNavn}.</Normaltekst>
        </Innholdsboks>
    );
};

export default ValgtAlleHarAlleTiltakstyper;
