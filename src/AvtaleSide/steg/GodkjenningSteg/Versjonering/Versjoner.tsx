import * as React from 'react';
import { Avtale } from '@/types/avtale';
import { Rolle } from '@/AvtaleContext';
import TidligereVersjoner from '@/AvtaleSide/steg/GodkjenningSteg/Versjonering/TidligereVersjoner';
import LaasOppKnapp from '@/AvtaleSide/steg/GodkjenningSteg/Versjonering/LaasOppKnapp';

interface Props {
    rolle: Rolle;
    avtale: Avtale;
    laasOpp: () => Promise<any>;
}

const Versjoner: React.FunctionComponent<Props> = props => {
    return (
        <>
            <LaasOppKnapp rolle={props.rolle} avtale={props.avtale} laasOpp={props.laasOpp} />
            <TidligereVersjoner {...props.avtale} />
        </>
    );
};
export default Versjoner;
