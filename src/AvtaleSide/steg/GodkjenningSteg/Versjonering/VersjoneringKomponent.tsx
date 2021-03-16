import TidligereVersjoner from '@/AvtaleSide/steg/GodkjenningSteg/Versjonering/TidligereVersjoner';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { Versjonering } from '@/types/avtale';
import { Rolle } from '@/types/innlogget-bruker';
import * as React from 'react';
import MediaQuery from 'react-responsive';
import BehandleAvtale from '../BehandleAvtale';

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

    return (
        <MediaQuery print={false}>
            <Innholdsboks>
                {props.rolle === 'VEILEDER' && <BehandleAvtale />}
                <VerticalSpacer rem={2} />
                {harTidligereVersjoner && <TidligereVersjoner {...props.avtale} />}
            </Innholdsboks>
        </MediaQuery>
    );
};
export default VersjoneringKomponent;
