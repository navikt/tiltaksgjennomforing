import * as React from 'react';
import { Avtale } from '@/types/avtale';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import { Rolle } from '@/AvtaleContext';

interface Props {
    rolle: Rolle;
    avtale: Avtale;
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
        <>
            {props.rolle === 'VEILEDER' && props.avtale.kanLåsesOpp && (
                <Innholdsboks>
                    <LagreKnapp label={'Lås opp avtale'} lagre={låsOppAvtaleklikk}>
                        Lås opp avtalen
                    </LagreKnapp>
                </Innholdsboks>
            )}
        </>
    );
};
export default LaasOppKnapp;
