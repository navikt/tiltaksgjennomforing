import { AvtaleContext } from '@/AvtaleProvider';
import SlikVilTilskuddsperioderSeUt from '@/AvtaleSide/Oppgavelinje/SlikVilTilskuddsperioderSeUt';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import BekreftelseModal from '@/komponenter/modal/BekreftelseModal';
import { forlengAvtale, forlengAvtaleDryRun } from '@/services/rest-service';
import { TilskuddsPeriode } from '@/types/avtale';
import { handterFeil } from '@/utils/apiFeilUtils';
import { Notes } from '@navikt/ds-icons/cjs';
import moment from 'moment';
import { Datepicker } from 'nav-datovelger';
import Lenke from 'nav-frontend-lenker';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import React, { FunctionComponent, useContext, useState } from 'react';

const ForlengAvtale: FunctionComponent = () => {
    const avtaleContext = useContext(AvtaleContext);

    const [modalApen, setModalApen] = useState(false);
    const [sluttDato, setSluttDato] = useState<string | undefined>();
    const [feil, setFeil] = useState<string>();
    const [tilskuddsperioder, setTilskuddsperioder] = useState<TilskuddsPeriode[]>([]);

    const forleng = async () => {
        if (sluttDato) {
            await forlengAvtale(avtaleContext.avtale, sluttDato);
            await avtaleContext.hentAvtale();
            lukkModal();
        }
    };
    const onDatoChange = async (dato: string | undefined) => {
        setSluttDato(dato);
        if (dato) {
            try {
                const nyAvtale = await forlengAvtaleDryRun(avtaleContext.avtale, dato);
                setTilskuddsperioder(nyAvtale.tilskuddPeriode);
                setFeil(undefined);
            } catch (e: any) {
                handterFeil(e, (feilmelding) => {
                    setFeil(feilmelding);
                });
            }
        }
    };

    const forlengeTekst = (
        <div style={{ minHeight: '20rem' }}>
            <SkjemaGruppe feil={feil}>
                <label className="skjemaelement__label">Velg ny sluttdato for avtalen</label>
                <Datepicker
                    inputProps={{ placeholder: 'dd.mm.åååå' }}
                    value={sluttDato}
                    limitations={{
                        minDate: moment(avtaleContext.avtale.gjeldendeInnhold.sluttDato).add(1, 'days').format('YYYY-MM-DD'),
                    }}
                    onChange={(dato) => onDatoChange(dato)}
                />
            </SkjemaGruppe>
            <VerticalSpacer rem={2} />
            <SlikVilTilskuddsperioderSeUt
                overskrift="Slik vil tilskuddsperiodene se ut etter at avtalen forlenges"
                tilskuddsperioder={tilskuddsperioder}
            />
        </div>
    );

    const lukkModal = () => {
        setModalApen(false);
        setTilskuddsperioder([]);
        setSluttDato(undefined);
        setFeil(undefined);
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
