import { AvtaleContext } from '@/AvtaleProvider';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import BekreftelseModal from '@/komponenter/modal/BekreftelseModal';
import { forkortAvtale, forkortAvtaleDryRun } from '@/services/rest-service';
import { AvbrytelseGrunn, TilskuddsPeriode } from '@/types/avtale';
import moment from 'moment';
import { Datovelger } from 'nav-datovelger';
import React, { FunctionComponent, useContext, useState } from 'react';
import TilskuddsPerioder from '../BeregningTilskudd/tilskuddsPerioder/TilskuddsPerioder';
import Lenke from 'nav-frontend-lenker';
import { Notes } from '@navikt/ds-icons/cjs';
import { Radio, SkjemaGruppe } from 'nav-frontend-skjema';
import { SkjemaelementFeil } from 'nav-frontend-skjema/lib/skjemaelement-feilmelding';
import PakrevdTextarea from '@/komponenter/PakrevdTextarea/PakrevdTextarea';

const ForkortAvtale: FunctionComponent = () => {
    const avtaleContext = useContext(AvtaleContext);

    const [modalApen, setModalApen] = useState(false);
    const [sluttDato, setsluttDato] = useState<string | undefined>();
    const [grunnFeil, setGrunnFeil] = useState<undefined | SkjemaelementFeil>(undefined);
    const [grunn, setGrunn] = useState<string>('');
    const [annetGrunn, setAnnetGrunn] = useState<string>();

    const [tilskuddsperioder, setTilskuddsperioder] = useState<TilskuddsPeriode[]>(
        avtaleContext.avtale.tilskuddPeriode
    );

    const forkort = async () => {
        if (sluttDato) {
            await forkortAvtale(avtaleContext.avtale, sluttDato, grunn, annetGrunn);
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
            <VerticalSpacer rem={1} />
            <SkjemaGruppe title="Hvorfor forkortes avtalen?" feil={grunnFeil}>
                {['Begynt i arbeid', 'Fått tilbud om annet tiltak', 'Syk', 'Ikke møtt', 'Annet'].map(g => (
                    <Radio
                        key={g}
                        label={g}
                        name="grunn"
                        value={g}
                        checked={g === grunn}
                        onChange={event => {
                            setGrunn(event.currentTarget.value);
                        }}
                        role="menuitemradio"
                    />
                ))}
            </SkjemaGruppe>
            <VerticalSpacer rem={1} />
            {grunn === 'Annet' && (
                <PakrevdTextarea
                    label=""
                    verdi={annetGrunn}
                    placeholder="Begrunnelse (påkrevd)"
                    settVerdi={verdi => setAnnetGrunn(verdi)}
                    maxLengde={500}
                    feilmelding="Begrunnelse er påkrevd"
                />
            )}
            <VerticalSpacer rem={1} />
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
