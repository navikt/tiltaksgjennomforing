import { Beregningsgrunnlag, Kontonummer } from '@/types/avtale';
import { Label } from '@navikt/ds-react';
import { FunctionComponent } from 'react';
import SjekkOmVerdiEksisterer from '../SjekkOmVerdiEksisterer/SjekkOmVerdiEksisterer';
import Stegoppsummering from '../Stegoppsummering/Stegoppsummering';

const BeregningTilskuddOppsummeringVTAO: FunctionComponent<Beregningsgrunnlag & Kontonummer> = (props) => {
    return (
        <Stegoppsummering tittel="Beregning av tilskudd">
            <Label>Kontonummer</Label> <SjekkOmVerdiEksisterer verdi={props.arbeidsgiverKontonummer} />
        </Stegoppsummering>
    );
};

export default BeregningTilskuddOppsummeringVTAO;
