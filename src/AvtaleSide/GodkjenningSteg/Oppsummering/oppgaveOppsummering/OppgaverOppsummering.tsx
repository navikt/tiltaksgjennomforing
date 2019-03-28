import * as React from 'react';
import Stegoppsummering from '../Stegoppsummering/Stegoppsummering';
import { Normaltekst, Element } from 'nav-frontend-typografi';
import { Avtale } from '../../../avtale';
import BEMHelper from '../../../../utils/bem';
import './oppgaveOppsummering.less';
import OppgaverIkon from './OppgaverIkon';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';
import EtikettFokus from 'nav-frontend-etiketter/lib/etikettfokus';

const cls = BEMHelper('oppgaveOppsummering');

interface Props {
    avtale: Avtale;
}

const OppgaverOppsummering = (props: Props) => {
    const arbeidsoppgaver = props.avtale.oppgaver.map(oppgave => (
        <div key={oppgave.id} className={cls.className}>
            <Undertittel>{oppgave.tittel}</Undertittel>
            <Normaltekst className={cls.element('beskrivelse')}>
                {oppgave.beskrivelse}
            </Normaltekst>
            <Element className={cls.element('label')}>Opplæring</Element>
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
            <div>
                <EtikettFokus className={cls.element('etikettInfo')}>
                    Arbeidsoppgaver er ikke fylt ut
                </EtikettFokus>
            </div>
        </Stegoppsummering>
    );
};

export default OppgaverOppsummering;
