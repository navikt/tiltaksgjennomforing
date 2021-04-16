import { AvtaleContext } from '@/AvtaleProvider';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import BekreftelseModal from '@/komponenter/modal/BekreftelseModal';
import { forkortAvtale, forkortAvtaleDryRun } from '@/services/rest-service';
import { TilskuddsPeriode } from '@/types/avtale';
import moment from 'moment';
import { Datovelger } from 'nav-datovelger';
import React, { FunctionComponent, useContext, useState } from 'react';
import TilskuddsPerioder from '../BeregningTilskudd/tilskuddsPerioder/TilskuddsPerioder';
import Lenke from 'nav-frontend-lenker';
import { Notes } from '@navikt/ds-icons/cjs';

const ForkortAvtale: FunctionComponent = () => {
    const avtaleContext = useContext(AvtaleContext);

    const [modalApen, setModalApen] = useState(false);
    const [sluttDato, setsluttDato] = useState<string | undefined>();
    const [tilskuddsperioder, setTilskuddsperioder] = useState<TilskuddsPeriode[]>(
        avtaleContext.avtale.tilskuddPeriode
    );

    const forkort = async () => {
        if (sluttDato) {
            await forkortAvtale(avtaleContext.avtale, sluttDato);
            await avtaleContext.hentAvtale();
            lukkModal();
        }
    };
    const onDatoChange = async (dato: string | undefined) => {
        setsluttDato(dato);
        if (dato) {
            const nyAvtale = await forkortAvtaleDryRun(avtaleContext.avtale, dato);
            setTilskuddsperioder(nyAvtale.tilskuddPeriode);
        }
    };

    const forkorteTekst = (
        <>
            <label className="skjemaelement__label">Velg ny sluttdato for avtalen</label>
            <Datovelger
                input={{ placeholder: 'dd.mm.åååå' }}
                valgtDato={sluttDato}
                avgrensninger={{
                    maksDato: moment(avtaleContext.avtale.sluttDato)
                        .subtract(1, 'days')
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
                    Forkort avtale
                </Lenke>
            </div>

            <BekreftelseModal
                style={{ maxWidth: '100%', minHeight: '20rem' }}
                avbrytelseTekst="Avbryt"
                bekreftelseTekst="Forkort"
                oversiktTekst="Forkort avtale"
                modalIsOpen={modalApen}
                bekreftOnClick={forkort}
                lukkModal={lukkModal}
                varselTekst={forkorteTekst}
            />
        </>
    );
};

export default ForkortAvtale;
