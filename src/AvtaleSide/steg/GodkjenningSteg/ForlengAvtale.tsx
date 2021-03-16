import { AvtaleContext } from '@/AvtaleProvider';
import BekreftelseModal from '@/komponenter/modal/BekreftelseModal';
import { forlengAvtale } from '@/services/rest-service';
import { Datovelger } from 'nav-datovelger';
import { Knapp } from 'nav-frontend-knapper';
import React, { FunctionComponent, useContext, useState } from 'react';

const ForlengAvtale: FunctionComponent = () => {
    const [modalApen, setModalApen] = useState(false);
    const [sluttDato, setsluttDato] = useState<string | undefined>();
    const avtaleContext = useContext(AvtaleContext);

    const forleng = async () => {
        if (sluttDato) {
            await forlengAvtale(avtaleContext.avtale, sluttDato);
            await avtaleContext.hentAvtale();
            setModalApen(false);
        }
    };

    const forlengeTekst = (
        <>
            <label className="skjemaelement__label">Velg ny sluttdato for avtalen</label>
            <Datovelger
                input={{ placeholder: 'dd.mm.åååå' }}
                valgtDato={sluttDato}
                avgrensninger={{}}
                onChange={dato => setsluttDato(dato)}
            />
        </>
    );

    return (
        <>
            <div>
                <Knapp onClick={() => setModalApen(true)}>Forleng avtale</Knapp>
            </div>

            <BekreftelseModal
                avbrytelseTekst="Avbryt"
                bekreftelseTekst="Forleng"
                oversiktTekst="Forleng avtale"
                modalIsOpen={modalApen}
                bekreftOnClick={forleng}
                lukkModal={() => setModalApen(false)}
                varselTekst={forlengeTekst}
            />
        </>
    );
};

export default ForlengAvtale;
