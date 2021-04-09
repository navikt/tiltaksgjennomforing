import TidligereVersjoner from '@/AvtaleSide/steg/GodkjenningSteg/Versjonering/TidligereVersjoner';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import { Versjonering } from '@/types/avtale';
import { Rolle } from '@/types/innlogget-bruker';
import * as React from 'react';
import MediaQuery from 'react-responsive';

interface Props {
    rolle: Rolle;
    avtale: Versjonering;
    laasOpp: () => Promise<any>;
}

const VersjoneringKomponent: React.FunctionComponent<Props> = props => {
    const harTidligereVersjoner = props.avtale.versjoner.length > 1;

    if (props.rolle !== 'VEILEDER' && !harTidligereVersjoner) {
        return null;
    }
    if (!props.avtale.kanLåsesOpp && !harTidligereVersjoner) {
        return null;
    }

    return harTidligereVersjoner ? (
        <MediaQuery print={false}>
            <Innholdsboks>
                <TidligereVersjoner {...props.avtale} />
            </Innholdsboks>
        </MediaQuery>
    ) : null;
};
export default VersjoneringKomponent;
