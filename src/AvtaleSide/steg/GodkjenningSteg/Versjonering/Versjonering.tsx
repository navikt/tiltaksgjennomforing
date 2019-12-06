import * as React from 'react';
import { Avtale } from '@/types/avtale';
import { Rolle } from '@/AvtaleContext';
import TidligereVersjoner from '@/AvtaleSide/steg/GodkjenningSteg/Versjonering/TidligereVersjoner';
import LaasOppKnapp from '@/AvtaleSide/steg/GodkjenningSteg/Versjonering/LaasOppKnapp';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import SkjemaUndertittel from '@/komponenter/form/SkjemaUndertittel';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import MediaQuery from 'react-responsive';

interface Props {
    rolle: Rolle;
    avtale: Avtale;
    laasOpp: () => Promise<any>;
}

const Versjonering: React.FunctionComponent<Props> = props => {
    const tidligereVersjoner = props.avtale.versjoner.length > 1 && (
        <Innholdsboks>
            {' '}
            <>
                <SkjemaUndertittel>Tidligere versjoner av avtalen</SkjemaUndertittel>
                <TidligereVersjoner {...props.avtale} />
            </>
        </Innholdsboks>
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
            {/*<Innholdsboks>
                {behandleAvtale}
            </Innholdsboks>*/}
            {tidligereVersjoner}
        </MediaQuery>
    );
};
export default Versjonering;
