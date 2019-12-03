import * as React from 'react';
import BEMHelper from '@/utils/bem';
import { Avtale } from '@/types/avtale';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import './LaasOppKnapp.less';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import { Rolle } from '@/AvtaleContext';

const cls = BEMHelper('laasOppKnapp');
interface Props {
    rolle: Rolle;
    avtale: Avtale;
    laasOpp: () => Promise<any>;
}

const LaasOppKnapp: React.FunctionComponent<Props> = props => {
    const låsOppAvtaleklikk = () => {
        if (
            window.confirm(
                'Er du sikker på at du vil låse opp avtalen og opprette en ny versjon?\nDu og arbeidsgiver kan endre innhold i avtalen og alle må godjhenne på nytt.'
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
                    {' '}
                    <LagreKnapp
                        className={cls.element('laasoppknapp')}
                        label={'Lag ny versjon'}
                        lagre={låsOppAvtaleklikk}
                    >
                        {' '}
                        Lås opp avtalen
                    </LagreKnapp>
                </Innholdsboks>
            )}
        </>
    );
};
export default LaasOppKnapp;
