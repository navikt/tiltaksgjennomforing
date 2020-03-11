import BekreftelseModal from '@/komponenter/modal/BekreftelseModal';
import { Knapp } from 'nav-frontend-knapper';
import React, { FunctionComponent, useState } from 'react';

type Props = {
    laasOpp: () => Promise<any>;
};

const LaasOppKnapp: FunctionComponent<Props> = props => {
    const [bekreftLaasOppModalOpen, setBekreftLaasOppModalOpen] = useState(false);

    const låsOppAvtaleklikk = () => {
        setBekreftLaasOppModalOpen(true);
    };

    const varselTekst = (
        <>
            1) Endre – gjør de endringene du ønsker. <br />
            2) Godkjenn – Du og de andre partene må godkjenne ny versjon
            <p>Gamle versjoner ligger under "Historikk".</p>
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
                avbrytelseTekst="Behold avtale"
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
