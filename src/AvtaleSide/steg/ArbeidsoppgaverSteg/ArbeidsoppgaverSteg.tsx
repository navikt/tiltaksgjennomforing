import { AvtaleContext } from '@/AvtaleProvider';
import { InputStegProps } from '@/AvtaleSide/input-steg-props';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import PakrevdTextarea from '@/komponenter/PakrevdTextarea/PakrevdTextarea';
import { Stilling } from '@/types/avtale';
import { Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent, useContext } from 'react';

const ArbeidsoppgaverSteg: FunctionComponent = props => {
    const avtaleContext: InputStegProps<Stilling> = useContext(AvtaleContext);

    return (
        <Innholdsboks utfyller="arbeidsgiver">
            <SkjemaTittel>Hvilke arbeidsoppgaver skal utføres?</SkjemaTittel>
            <Normaltekst>
                Her skal du beskrive hvilke arbeidsoppgaver som deltakeren skal utføre hos dere under arbeidstreningen.
            </Normaltekst>
            <VerticalSpacer rem={2} />
            <PakrevdTextarea
                label=""
                verdi={avtaleContext.avtale.arbeidsoppgaver || ''}
                settVerdi={verdi => avtaleContext.settAvtaleVerdi('arbeidsoppgaver', verdi)}
                maxLengde={1000}
                feilmelding="Beskrivelse av arbeidsoppgaver er påkrevd"
            />
            <VerticalSpacer rem={2} />
            <LagreKnapp lagre={avtaleContext.lagreAvtale} label={'Lagre'} suksessmelding={'Avtale lagret'} />
        </Innholdsboks>
    );
};

export default ArbeidsoppgaverSteg;
