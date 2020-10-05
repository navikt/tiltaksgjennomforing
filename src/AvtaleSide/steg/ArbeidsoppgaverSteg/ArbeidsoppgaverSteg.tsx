import * as React from 'react';
import { FunctionComponent, useContext } from 'react';
import PakrevdTextarea from '@/komponenter/PakrevdTextarea/PakrevdTextarea';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import { Normaltekst } from 'nav-frontend-typografi';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { InputStegProps } from '@/AvtaleSide/input-steg-props';
import { Stilling } from '@/types/avtale';
import { AvtaleContext } from '@/NyAvtaleProvider';

const ArbeidsoppgaverSteg: FunctionComponent = props => {
    const avtaleContext: InputStegProps<Stilling> = useContext(AvtaleContext);

    return (
        <Innholdsboks utfyller="arbeidsgiver">
            <SkjemaTittel>Hvilke arbeidsoppgaver skal utføres?</SkjemaTittel>
            <Normaltekst>
                Her skal du beskrive hvilke arbeidsoppgaver som deltakeren skal utføre hos dere under arbeidstreningen.
            </Normaltekst>
            <VerticalSpacer thirtyTwoPx={true} />
            <PakrevdTextarea
                label=""
                verdi={avtaleContext.avtale.arbeidsoppgaver || ''}
                settVerdi={verdi => avtaleContext.settAvtaleVerdi('arbeidsoppgaver', verdi)}
                maxLengde={1000}
                feilmelding="Beskrivelse av arbeidsoppgaver er påkrevd"
            />
            <VerticalSpacer thirtyTwoPx={true} />
            <LagreKnapp lagre={avtaleContext.lagreAvtale} label={'Lagre'} suksessmelding={'Avtale lagret'} />
        </Innholdsboks>
    );
};

export default ArbeidsoppgaverSteg;
