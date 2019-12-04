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
    const tidligereVersjoner = (
        <>
            <SkjemaUndertittel>Tidligere versjoner</SkjemaUndertittel>
            <TidligereVersjoner {...props.avtale} />
        </>
    );

    if (props.avtale.versjoner.length < 2) {
        return null;
    }
    return (
        <MediaQuery print={false}>
            <Innholdsboks>
                {props.rolle === 'VEILEDER' && props.avtale.kanLåsesOpp && (
                    <>
                        <SkjemaTittel>Behandle avtale</SkjemaTittel>
                        <LaasOppKnapp laasOpp={props.laasOpp} />
                        <VerticalSpacer thirtyTwoPx={true} />
                    </>
                )}
                {tidligereVersjoner}
            </Innholdsboks>
        </MediaQuery>
    );
};
export default Versjonering;
