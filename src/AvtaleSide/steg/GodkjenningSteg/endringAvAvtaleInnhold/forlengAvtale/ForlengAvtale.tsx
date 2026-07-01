import { useAvtale } from '@/AvtaleProvider';
import SlikVilTilskuddsperioderSeUt from '@/AvtaleSide/Oppgavelinje/SlikVilTilskuddsperioderSeUt';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import BekreftelseModal from '@/komponenter/modal/BekreftelseModal';
import { forlengAvtale, forlengAvtaleDryRun } from '@/services/rest-service';
import { TilskuddsPeriode } from '@/types/avtale';
import { handterFeil } from '@/utils/apiFeilUtils';
import { Alert, BodyShort, Label, Link } from '@navikt/ds-react';
import { useState } from 'react';
import styles from './forlengAvtale.module.less';
import DatovelgerForlengOgForkort from '@/komponenter/datovelger/DatovelgerForlengOgForkort';
import { formaterDato, NORSK_DATO_FORMAT } from '@/utils/datoUtils';
import { addDays } from 'date-fns';
import { NotePencilIcon } from '@navikt/aksel-icons';

const ForlengAvtale = () => {
    const { avtale, hentAvtale } = useAvtale();

    // Kan trygt anta at sluttdato er satt ved forlenging av avtale
    const naavaerendeSluttDato = avtale.gjeldendeInnhold.sluttDato!;
    const kanForlenges = avtale.tiltakstype === 'MENTOR' ? avtale.tilskuddPeriode.length > 0 : true;

    const [modalApen, setModalApen] = useState(false);
    const [sluttDato, setSluttDato] = useState<string | undefined>(naavaerendeSluttDato);
    const [feil, setFeil] = useState<string>();
    const [tilskuddsperioder, setTilskuddsperioder] = useState<TilskuddsPeriode[]>([]);

    const forleng = async (): Promise<void> => {
        if (sluttDato && !feil) {
            await forlengAvtale(avtale, sluttDato);
            await hentAvtale();
            lukkModal();
        }
    };
    const onDatoChange = async (dato: string | undefined): Promise<void> => {
        const harDato = dato && dato !== 'Invalid';

        setSluttDato(harDato ? dato : undefined);
        setFeil(undefined);

        if (harDato) {
            try {
                const nyAvtale = await forlengAvtaleDryRun(avtale, dato);
                setTilskuddsperioder(nyAvtale.tilskuddPeriode);
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
                        <NotePencilIcon style={{ marginRight: '0.5rem' }} />
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
                <div className={styles.forlengAvtale}>
                    {kanForlenges && (
                        <>
                            <div className={styles.navarendeSluttdato}>
                                <Label>Nåværende sluttdato for avtalen</Label>
                                <BodyShort size="small">
                                    {formaterDato(naavaerendeSluttDato, NORSK_DATO_FORMAT)}
                                </BodyShort>
                            </div>
                            <DatovelgerForlengOgForkort
                                value={sluttDato}
                                legend="Velg ny sluttdato for avtalen"
                                onChangeHåndtereNyDato={onDatoChange}
                                minDate={formaterDato(addDays(naavaerendeSluttDato, 1).toISOString(), 'yyyy-MM-dd')}
                            />
                            {feil && (
                                <>
                                    <VerticalSpacer rem={1} />
                                    <Alert variant="warning">
                                        <strong>Avtalen kan ikke forlenges</strong>
                                        <p className={styles.feilmeldingParagraf}>{feil}</p>
                                    </Alert>
                                </>
                            )}
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
