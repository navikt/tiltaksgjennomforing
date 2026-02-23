import { useAvtale } from '@/AvtaleProvider';
import SlikVilTilskuddsperioderSeUt from '@/AvtaleSide/Oppgavelinje/SlikVilTilskuddsperioderSeUt';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import BekreftelseModal from '@/komponenter/modal/BekreftelseModal';
import { forlengAvtale, forlengAvtaleDryRun } from '@/services/rest-service';
import { TilskuddsPeriode } from '@/types/avtale';
import { handterFeil } from '@/utils/apiFeilUtils';
import { Notes } from '@navikt/ds-icons/cjs';
import { Alert, BodyShort, Fieldset, Label, Link } from '@navikt/ds-react';
import React, { useState } from 'react';
import BEMHelper from '@/utils/bem';
import './forlengAvtale.less';
import DatovelgerForlengOgForkort from '@/komponenter/datovelger/DatovelgerForlengOgForkort';
import { formaterDato, NORSK_DATO_FORMAT } from '@/utils/datoUtils';
import { addDays } from 'date-fns';

const ForlengAvtale = () => {
    const { avtale, hentAvtale } = useAvtale();
    const cls = BEMHelper('forlengAvtale');

    const [modalApen, setModalApen] = useState(false);
    const [sluttDato, setSluttDato] = useState<string | undefined>();
    const [feil, setFeil] = useState<string>();
    const [tilskuddsperioder, setTilskuddsperioder] = useState<TilskuddsPeriode[]>([]);

    // Kan trygt anta at sluttdato er satt ved forlenging av avtale
    const naavaerendeSluttDato = avtale.gjeldendeInnhold.sluttDato!;
    const kanForlenges = avtale.tiltakstype === 'MENTOR' ? avtale.tilskuddPeriode.length > 0 : true;

    const forleng = async (): Promise<void> => {
        if (sluttDato) {
            await forlengAvtale(avtale, sluttDato);
            await hentAvtale();
            lukkModal();
        }
    };
    const onDatoChange = async (dato: string | undefined): Promise<void> => {
        setSluttDato(dato);
        if (dato) {
            try {
                const nyAvtale = await forlengAvtaleDryRun(avtale, dato);
                setTilskuddsperioder(nyAvtale.tilskuddPeriode);
                setFeil(undefined);
            } catch (e: any) {
                handterFeil(e, (feilmelding) => {
                    setFeil(feilmelding);
                });
            }
        }
    };

    const lukkModal = () => {
        setModalApen(false);
        setTilskuddsperioder([]);
        setSluttDato(undefined);
        setFeil(undefined);
    };

    return (
        <>
            <div>
                <Link
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
                </Link>
            </div>

            <BekreftelseModal
                style={{ maxWidth: '100%' }}
                avbrytelseTekst="Avbryt"
                bekreftelseTekst="Forleng"
                oversiktTekst="Forleng avtale"
                modalIsOpen={modalApen}
                bekreftOnClick={kanForlenges ? forleng : undefined}
                lukkModal={lukkModal}
            >
                <div className={cls.className}>
                    {kanForlenges && (
                        <>
                            <div className={cls.element('navarende-sluttdato')}>
                                <Label>Nåværende sluttdato for avtalen</Label>
                                <BodyShort size="small">
                                    {formaterDato(naavaerendeSluttDato, NORSK_DATO_FORMAT)}
                                </BodyShort>
                            </div>
                            <Fieldset legend="sluttdato" error={feil}>
                                <DatovelgerForlengOgForkort
                                    datoFelt="sluttDato"
                                    legend="Velg ny sluttdato for avtalen"
                                    onChangeHåndtereNyDato={onDatoChange}
                                    minDate={formaterDato(addDays(naavaerendeSluttDato, 1).toISOString(), 'yyyy-MM-dd')}
                                />
                            </Fieldset>
                            <VerticalSpacer rem={2} />
                            <SlikVilTilskuddsperioderSeUt
                                overskrift="Slik vil tilskuddsperiodene se ut etter at avtalen forlenges"
                                tilskuddsperioder={tilskuddsperioder}
                            />
                        </>
                    )}
                    {!kanForlenges && (
                        <Alert variant="warning">
                            Dette er en eldre avtale som ble opprettet før overgang til ny refusjonsløsning og kan
                            derfor ikke forlenges.
                            <br />
                            Vennligst opprett en ny avtale.
                        </Alert>
                    )}
                </div>
            </BekreftelseModal>
        </>
    );
};

export default ForlengAvtale;
