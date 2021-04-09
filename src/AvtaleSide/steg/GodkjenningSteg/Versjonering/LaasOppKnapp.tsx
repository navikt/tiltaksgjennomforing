import { ReactComponent as VarselIkon } from '@/assets/ikoner/varsel.svg';
import BekreftelseModal from '@/komponenter/modal/BekreftelseModal';
import BEMHelper from '@/utils/bem';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent, useState } from 'react';
import './LaasOppKnapp.less';
import Lenke from 'nav-frontend-lenker';
import { Unlocked } from '@navikt/ds-icons';

type Props = {
    laasOpp: () => Promise<any>;
};

const cls = BEMHelper('laasoppknapp');

const LaasOppKnapp: FunctionComponent<Props> = props => {
    const [bekreftLaasOppModalOpen, setBekreftLaasOppModalOpen] = useState(false);

    const låsOppAvtaleklikk = () => {
        setBekreftLaasOppModalOpen(true);
    };

    const varselTekst = (
        <>
            <span className={cls.element('modal-nb-tekst')}>
                <VarselIkon />
                <Element>NB: Alle parter må godkjenne på nytt</Element>
            </span>
            <Normaltekst className={cls.element('modal-footer-tekst')}>
                Nåværende versjon av avtalen vil du finne du under "tidligere versjoner av avtalen".
            </Normaltekst>
        </>
    );

    const bekreftLaasOpp = async () => {
        await props.laasOpp();
        setBekreftLaasOppModalOpen(false);
    };

    return (
        <div className={cls.className}>
            <Lenke
                onClick={event => {
                    event.stopPropagation();
                    låsOppAvtaleklikk();
                }}
                href="#"
                role="menuitem"
                className={cls.element('lenke')}
            >
                <div aria-hidden={true}>
                    <Unlocked className={cls.element('ikon')} />
                </div>
                Lås opp avtalen
            </Lenke>
            <BekreftelseModal
                avbrytelseTekst="Avbryt"
                bekreftelseTekst="Endre avtale"
                bekreftOnClick={() => bekreftLaasOpp()}
                modalIsOpen={bekreftLaasOppModalOpen}
                lukkModal={() => setBekreftLaasOppModalOpen(false)}
                oversiktTekst="Endre avtale"
                varselTekst={varselTekst}
            />
        </div>
    );
};
export default LaasOppKnapp;
