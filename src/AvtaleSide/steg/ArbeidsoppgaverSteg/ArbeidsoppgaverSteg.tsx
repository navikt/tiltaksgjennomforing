import { AvtaleContext } from '@/AvtaleProvider';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import PakrevdTextarea from '@/komponenter/PakrevdTextarea/PakrevdTextarea';
import { BodyShort } from '@navikt/ds-react';
import React, { FunctionComponent, useContext } from 'react';

const ArbeidsoppgaverSteg: FunctionComponent = (props) => {
    const avtaleContext = useContext(AvtaleContext);

    return (
        <Innholdsboks>
            <SkjemaTittel>Hvilke arbeidsoppgaver skal utføres?</SkjemaTittel>
            <BodyShort size="small">
                Her skal du beskrive hvilke arbeidsoppgaver som deltakeren skal utføre hos dere under arbeidstreningen.
            </BodyShort>
            <VerticalSpacer rem={2} />
            <PakrevdTextarea
                label=""
                verdi={avtaleContext.avtale.gjeldendeInnhold.arbeidsoppgaver || ''}
                settVerdi={(verdi) => avtaleContext.settAvtaleInnholdVerdi('arbeidsoppgaver', verdi)}
                maxLengde={1000}
                feilmelding="Beskrivelse av arbeidsoppgaver er påkrevd"
            />
            <VerticalSpacer rem={2} />
            <LagreKnapp lagre={avtaleContext.lagreAvtale} suksessmelding={'Avtale lagret'}>
                Lagre
            </LagreKnapp>
        </Innholdsboks>
    );
};

export default ArbeidsoppgaverSteg;
