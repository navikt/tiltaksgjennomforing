import EtikettFokus from 'nav-frontend-etiketter/lib/etikettfokus';
import { Element } from 'nav-frontend-typografi';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';
import * as React from 'react';
import { FunctionComponent } from 'react';
import BEMHelper from '@/utils/bem';
import { Oppgaver } from '@/types/avtale';
import Stegoppsummering from '../Stegoppsummering/Stegoppsummering';
import './oppgaveOppsummering.less';
import OppgaverIkon from './OppgaverIkon';
import TekstBlokk from '@/komponenter/typografi/TekstBlokk';

const cls = BEMHelper('oppgaveOppsummering');

const OppgaverOppsummering: FunctionComponent<Oppgaver> = props => {
    const arbeidsoppgaver = props.oppgaver.map(oppgave => (
        <div key={oppgave.id} className={cls.className}>
            <Undertittel>{oppgave.tittel}</Undertittel>
            <TekstBlokk>{oppgave.beskrivelse}</TekstBlokk>
            <Element className={cls.element('label')}>Opplæring</Element>
            <TekstBlokk>{oppgave.opplaering}</TekstBlokk>
        </div>
    ));

    return arbeidsoppgaver.length > 0 ? (
        <Stegoppsummering ikon={<OppgaverIkon />} tittel="Arbeidsoppgaver">
            {arbeidsoppgaver}
        </Stegoppsummering>
    ) : (
        <Stegoppsummering ikon={<OppgaverIkon />} tittel="Arbeidsoppgaver">
            <div>
                <EtikettFokus className={cls.element('etikettInfo')}>Arbeidsoppgaver er ikke fylt ut</EtikettFokus>
            </div>
        </Stegoppsummering>
    );
};

export default OppgaverOppsummering;
