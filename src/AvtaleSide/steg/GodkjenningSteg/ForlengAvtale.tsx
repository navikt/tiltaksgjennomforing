import { AvtaleContext } from '@/AvtaleProvider';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import BekreftelseModal from '@/komponenter/modal/BekreftelseModal';
import { forlengAvtale, forlengAvtaleDryRun } from '@/services/rest-service';
import { TilskuddsPeriode } from '@/types/avtale';
import moment from 'moment';
import { Datovelger } from 'nav-datovelger';
import { Knapp } from 'nav-frontend-knapper';
import React, { FunctionComponent, useContext, useState } from 'react';
import TilskuddsPerioder from '../BeregningTilskudd/tilskuddsPerioder/TilskuddsPerioder';

const ForlengAvtale: FunctionComponent = () => {
    const avtaleContext = useContext(AvtaleContext);

    const [modalApen, setModalApen] = useState(false);
    const [sluttDato, setsluttDato] = useState<string | undefined>();
    const [tilskuddsperioder, setTilskuddsperioder] = useState<TilskuddsPeriode[]>(
        avtaleContext.avtale.tilskuddPeriode
    );

    const forleng = async () => {
        if (sluttDato) {
            await forlengAvtale(avtaleContext.avtale, sluttDato);
            await avtaleContext.hentAvtale();
            lukkModal();
        }
    };
    const onDatoChange = async (dato: string | undefined) => {
        setsluttDato(dato);
        if (dato) {
            const nyAvtale = await forlengAvtaleDryRun(avtaleContext.avtale, dato);
            setTilskuddsperioder(nyAvtale.tilskuddPeriode);
        }
    };

    const forlengeTekst = (
        <>
            <label className="skjemaelement__label">Velg ny sluttdato for avtalen</label>
            <Datovelger
                input={{ placeholder: 'dd.mm.åååå' }}
                valgtDato={sluttDato}
                avgrensninger={{
                    minDato: moment(avtaleContext.avtale.sluttDato)
                        .add(1, 'days')
                        .format('YYYY-MM-DD'),
                }}
                onChange={dato => onDatoChange(dato)}
            />
            <VerticalSpacer rem={2} />
            <TilskuddsPerioder tilskuddsperioder={tilskuddsperioder} />
        </>
    );

    const lukkModal = () => {
        setModalApen(false);
        setTilskuddsperioder(avtaleContext.avtale.tilskuddPeriode);
        setsluttDato(undefined);
    };

    return (
        <>
            <div>
                <Knapp onClick={() => setModalApen(true)}>Forleng avtale</Knapp>
            </div>

            <BekreftelseModal
                style={{ maxWidth: '100%' }}
                avbrytelseTekst="Avbryt"
                bekreftelseTekst="Forleng"
                oversiktTekst="Forleng avtale"
                modalIsOpen={modalApen}
                bekreftOnClick={forleng}
                lukkModal={lukkModal}
                varselTekst={forlengeTekst}
            />
        </>
    );
};

export default ForlengAvtale;
