import { Rolle } from '@/AvtaleContext';
import LaasOppKnapp from '@/AvtaleSide/steg/GodkjenningSteg/Versjonering/LaasOppKnapp';
import TidligereVersjoner from '@/AvtaleSide/steg/GodkjenningSteg/Versjonering/TidligereVersjoner';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import SkjemaUndertittel from '@/komponenter/form/SkjemaUndertittel';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { AltAvtaleinnhold, Versjonering } from '@/types/avtale';
import * as React from 'react';
import MediaQuery from 'react-responsive';

interface Props {
    rolle: Rolle;
    avtale: Versjonering<AltAvtaleinnhold>;
    laasOpp: () => Promise<any>;
}

const VersjoneringKomponent: React.FunctionComponent<Props> = props => {
    const tidligereVersjoner = props.avtale.versjoner.length > 1 && (
        <>
            <SkjemaUndertittel>Tidligere versjoner av avtalen</SkjemaUndertittel>
            <TidligereVersjoner {...props.avtale} />
        </>
    );

    const behandleAvtale = props.rolle === 'VEILEDER' && props.avtale.kanLåsesOpp && (
        <>
            <SkjemaTittel>Behandle avtale</SkjemaTittel>
            <LaasOppKnapp laasOpp={props.laasOpp} />
            <VerticalSpacer thirtyTwoPx={true} />
        </>
    );

    if (!tidligereVersjoner && !behandleAvtale) {
        return null;
    }

    return (
        <MediaQuery print={false}>
            <Innholdsboks>
                {behandleAvtale}
                {tidligereVersjoner}
            </Innholdsboks>
        </MediaQuery>
    );
};
export default VersjoneringKomponent;
