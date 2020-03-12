import { ReactComponent as VarselIkon } from '@/assets/ikoner/varsel.svg';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import BekreftelseModal from '@/komponenter/modal/BekreftelseModal';
import BEMHelper from '@/utils/bem';
import { Knapp } from 'nav-frontend-knapper';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent, useState } from 'react';
import './LaasOppKnapp.less';

type Props = {
    laasOpp: () => Promise<any>;
};

const cls = BEMHelper('laasoppknapp');

const LaasOppKnapp: FunctionComponent<Props> = props => {
    const [bekreftLaasOppModalOpen, setBekreftLaasOppModalOpen] = useState(true);

    const låsOppAvtaleklikk = () => {
        setBekreftLaasOppModalOpen(true);
    };

    const varselTekst = (
        <>
            <span className={cls.element('modal-nb-tekst')}>
                <VarselIkon />
                <Element>NB: Alle parter må godkjenne på nytt</Element>
            </span>
            <VerticalSpacer thirtyTwoPx={true} />
            <Normaltekst>Nåværende versjoner av avtalen finner du under "tidligere versjoner".</Normaltekst>
            <VerticalSpacer twentyPx={true} />
        </>
    );

    const bekreftLaasOpp = async () => {
        await props.laasOpp();
        setBekreftLaasOppModalOpen(false);
    };

    return (
        <>
            <Knapp type={'standard'} onClick={låsOppAvtaleklikk}>
                Lås opp avtalen
            </Knapp>

            <BekreftelseModal
                avbrytelseTekst="Avbryt"
                bekreftelseTekst="Endre avtale"
                bekreftOnClick={() => bekreftLaasOpp()}
                modalIsOpen={bekreftLaasOppModalOpen}
                lukkModal={() => setBekreftLaasOppModalOpen(false)}
                oversiktTekst="Endre avtale"
                varselTekst={varselTekst}
            />
        </>
    );
};
export default LaasOppKnapp;
