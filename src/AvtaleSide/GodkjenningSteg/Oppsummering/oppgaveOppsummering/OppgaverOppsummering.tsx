import * as React from 'react';
import Stegoppsummering from '../Stegoppsummering/Stegoppsummering';
import { Ingress, Normaltekst, Element } from 'nav-frontend-typografi';
import { Avtale } from '../../../avtale';
import BEMHelper from '../../../../utils/bem';
import './oppgaveOppsummering.less';
import OppgaverIkon from './OppgaverIkon';

const cls = BEMHelper('oppgaveOppsummering');

interface Props {
    avtale: Avtale;
}

const OppgaverOppsummering = (props: Props) => {
    const arbeidsoppgaver = props.avtale.oppgaver.map(oppgave => (
        <div key={oppgave.id} className={cls.className}>
            <Ingress className={cls.element('oppgave-tittel')}>
                {oppgave.tittel}
            </Ingress>
            <Element className={cls.element('label')}>
                Hva går arbeidsoppgaven ut på?
            </Element>
            <Normaltekst className={cls.element('beskrivelse')}>
                {oppgave.beskrivelse}
            </Normaltekst>
            <Element className={cls.element('label')}>
                Hvilken opplæring skal deltakeren få?
            </Element>
            <Normaltekst className={cls.element('beskrivelse')}>
                {oppgave.opplaering}
            </Normaltekst>
        </div>
    ));

    return arbeidsoppgaver.length > 0 ? (
        <Stegoppsummering ikon={<OppgaverIkon />} tittel="Arbeidsoppgaver">
            {arbeidsoppgaver}
        </Stegoppsummering>
    ) : (
        <Stegoppsummering ikon={<OppgaverIkon />} tittel="Arbeidsoppgaver">
            <div className={cls.element('ikkeFyltUt')}>
                <Normaltekst>Ikke fylt ut</Normaltekst>
            </div>
        </Stegoppsummering>
    );
};

export default OppgaverOppsummering;
