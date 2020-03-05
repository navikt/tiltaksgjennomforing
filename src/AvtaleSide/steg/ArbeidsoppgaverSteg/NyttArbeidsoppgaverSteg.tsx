import * as React from 'react';
import { FunctionComponent } from 'react';
import { medContext } from '@/AvtaleContext';
import PakrevdTextarea from '@/komponenter/PakrevdTextarea/PakrevdTextarea';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import { Normaltekst } from 'nav-frontend-typografi';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { InputStegProps } from '@/AvtaleSide/input-steg-props';
import { Stilling } from '@/types/avtale';

const NyttArbeidsoppgaverSteg: FunctionComponent<InputStegProps<Stilling>> = props => {
    return (
        <Innholdsboks utfyller="arbeidsgiver">
            <SkjemaTittel>Hvilke arbeidsoppgaver skal utføres?</SkjemaTittel>
            <Normaltekst>
                Her skal du beskrive hvilke arbeidsoppgaver som deltakeren skal utføre hos dere under arbeidstreningen.
            </Normaltekst>
            <VerticalSpacer thirtyTwoPx={true} />
            <PakrevdTextarea
                label=""
                verdi={props.avtale.arbeidsoppgaver || ''}
                settVerdi={verdi => props.settAvtaleVerdi('arbeidsoppgaver', verdi)}
                maxLengde={1000}
                feilmelding="Beskrivelse av arbeidsoppgaver er påkrevd"
            />
            <VerticalSpacer thirtyTwoPx={true} />
            <LagreKnapp lagre={props.lagreAvtale} label={'Lagre'} suksessmelding={'Avtale lagret'} />
        </Innholdsboks>
    );
};

export default medContext(NyttArbeidsoppgaverSteg);
