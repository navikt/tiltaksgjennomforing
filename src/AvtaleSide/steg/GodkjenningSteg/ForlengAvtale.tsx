import { AvtaleContext } from '@/AvtaleProvider';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import BekreftelseModal from '@/komponenter/modal/BekreftelseModal';
import { forlengAvtale, forlengAvtaleDryRun } from '@/services/rest-service';
import { TilskuddsPeriode } from '@/types/avtale';
import moment from 'moment';
import { Datovelger } from 'nav-datovelger';
import React, { FunctionComponent, useContext, useState } from 'react';
import Lenke from 'nav-frontend-lenker';
import { Notes } from '@navikt/ds-icons/cjs';
import SlikVilTilskuddsperioderSeUt from '@/AvtaleSide/Oppgavelinje/SlikVilTilskuddsperioderSeUt';

const ForlengAvtale: FunctionComponent = () => {
    const avtaleContext = useContext(AvtaleContext);

    const [modalApen, setModalApen] = useState(false);
    const [sluttDato, setsluttDato] = useState<string | undefined>();
    const [tilskuddsperioder, setTilskuddsperioder] = useState<TilskuddsPeriode[]>([]);

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
            <SlikVilTilskuddsperioderSeUt tilskuddsperioder={tilskuddsperioder} />
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
                <Lenke
                    onClick={event => {
                        event.stopPropagation();
                        setModalApen(true);
                    }}
                    href="#"
                    role="menuitem"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <div aria-hidden={true}>
                        <Notes style={{ marginRight: '0.5rem' }} />
                    </div>
                    Forleng avtale
                </Lenke>
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
