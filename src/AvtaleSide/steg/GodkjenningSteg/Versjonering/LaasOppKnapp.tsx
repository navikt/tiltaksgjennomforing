import * as React from 'react';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';

interface Props {
    laasOpp: () => Promise<any>;
}

const LaasOppKnapp: React.FunctionComponent<Props> = props => {
    const låsOppAvtaleklikk = () => {
        if (
            window.confirm(
                'Er du sikker på at du vil låse opp avtalen og opprette en ny versjon?\nDu og arbeidsgiver kan endre innhold i avtalen og alle må godkjenne på nytt.'
            )
        ) {
            return props.laasOpp();
        }
        return Promise.reject();
    };

    return (
        <LagreKnapp knapptype={'standard'} label={'Lås opp avtale'} lagre={låsOppAvtaleklikk}>
            Lås opp avtalen
        </LagreKnapp>
    );
};
export default LaasOppKnapp;
