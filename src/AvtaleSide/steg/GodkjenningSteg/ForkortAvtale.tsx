import { AvtaleContext } from '@/AvtaleProvider';
import SlikVilTilskuddsperioderSeUt from '@/AvtaleSide/Oppgavelinje/SlikVilTilskuddsperioderSeUt';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import BekreftelseModal from '@/komponenter/modal/BekreftelseModal';
import PakrevdTextarea from '@/komponenter/PakrevdTextarea/PakrevdTextarea';
import { forkortAvtale, forkortAvtaleDryRun } from '@/services/rest-service';
import { TilskuddsPeriode } from '@/types/avtale';
import { handterFeil } from '@/utils/apiFeilUtils';
import { Notes } from '@navikt/ds-icons/cjs';
import moment from 'moment';
import { Datepicker } from 'nav-datovelger';
import Lenke from 'nav-frontend-lenker';
import { Radio, SkjemaGruppe } from 'nav-frontend-skjema';
import React, { FunctionComponent, useContext, useState } from 'react';

const ForkortAvtale: FunctionComponent = () => {
    const avtaleContext = useContext(AvtaleContext);

    const [modalApen, setModalApen] = useState(false);
    const [sluttDato, setSluttDato] = useState<string | undefined>();
    const [datoFeil, setDatoFeil] = useState<string>();
    const [grunn, setGrunn] = useState<string>('');
    const [annetGrunn, setAnnetGrunn] = useState<string>();

    const [tilskuddsperioder, setTilskuddsperioder] = useState<TilskuddsPeriode[]>([]);

    const forkort = async () => {
        if (!sluttDato) {
            setDatoFeil('Dato må fylles ut');
            return;
        }
        await forkortAvtale(avtaleContext.avtale, sluttDato, grunn, annetGrunn);
        await avtaleContext.hentAvtale();
        lukkModal();
    };
    const onDatoChange = async (dato: string | undefined) => {
        setSluttDato(dato);
        setDatoFeil(undefined);
        if (dato) {
            try {
                const nyAvtale = await forkortAvtaleDryRun(avtaleContext.avtale, dato);
                setTilskuddsperioder(nyAvtale.tilskuddPeriode);
            } catch (error: any) {
                handterFeil(error, (feilmelding) => setDatoFeil(feilmelding));
            }
        }
    };

    const forkorteTekst = (
        <>
            <SkjemaGruppe feil={datoFeil} title="Velg ny sluttdato for avtalen">
                <Datepicker
                    inputProps={{ placeholder: 'dd.mm.åååå' }}
                    value={sluttDato}
                    limitations={{
                        maxDate: moment(avtaleContext.avtale.gjeldendeInnhold.sluttDato).subtract(1, 'days').format('YYYY-MM-DD'),
                        minDate: moment(avtaleContext.avtale.gjeldendeInnhold.startDato).format('YYYY-MM-DD'),
                    }}
                    onChange={(dato) => onDatoChange(dato)}
                />
            </SkjemaGruppe>
            <VerticalSpacer rem={1} />
            <SkjemaGruppe title="Hvorfor forkortes avtalen?">
                {['Begynt i arbeid', 'Fått tilbud om annet tiltak', 'Syk', 'Ikke møtt', 'Fullført', 'Annet'].map(
                    (g) => (
                        <Radio
                            key={g}
                            label={g}
                            name="grunn"
                            value={g}
                            checked={g === grunn}
                            onChange={(event) => {
                                setGrunn(event.currentTarget.value);
                                setAnnetGrunn(undefined);
                            }}
                            role="menuitemradio"
                        />
                    )
                )}
            </SkjemaGruppe>
            <VerticalSpacer rem={1} />
            {grunn === 'Annet' && (
                <PakrevdTextarea
                    label=""
                    verdi={annetGrunn}
                    placeholder="Begrunnelse (påkrevd)"
                    settVerdi={(verdi) => setAnnetGrunn(verdi)}
                    maxLengde={500}
                    feilmelding="Begrunnelse er påkrevd"
                />
            )}
            <VerticalSpacer rem={2} />
            <SlikVilTilskuddsperioderSeUt
                overskrift="Slik vil tilskuddsperiodene se ut etter at avtalen forkortes"
                tilskuddsperioder={tilskuddsperioder}
            />
        </>
    );

    const lukkModal = () => {
        setModalApen(false);
        setTilskuddsperioder([]);
        setSluttDato(undefined);
    };

    return (
        <>
            <div>
                <Lenke
                    onClick={(event) => {
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
                style={{ maxWidth: '100%' }}
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
