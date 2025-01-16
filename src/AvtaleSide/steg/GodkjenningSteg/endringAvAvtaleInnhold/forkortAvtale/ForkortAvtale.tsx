import { AvtaleContext } from '@/AvtaleProvider';
import SlikVilTilskuddsperioderSeUt from '@/AvtaleSide/Oppgavelinje/SlikVilTilskuddsperioderSeUt';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import BekreftelseModal from '@/komponenter/modal/BekreftelseModal';
import PakrevdTextarea from '@/komponenter/PakrevdTextarea/PakrevdTextarea';
import { forkortAvtale, forkortAvtaleDryRun } from '@/services/rest-service';
import { TilskuddsPeriode } from '@/types/avtale';
import { handterFeil } from '@/utils/apiFeilUtils';
import { Notes } from '@navikt/ds-icons/cjs';
import { BodyShort, Fieldset, Label, Link, Radio, RadioGroup } from '@navikt/ds-react';
import React, { FunctionComponent, useContext, useState } from 'react';
import BEMHelper from '@/utils/bem';
import DatovelgerForlengOgForkort from '@/komponenter/datovelger/DatovelgerForlengOgForkort';
import { formaterDato, NORSK_DATO_FORMAT } from '@/utils/datoUtils';
import './forkortAvtale.less';
import { addDays, format } from 'date-fns';

const ForkortAvtale: FunctionComponent = () => {
    const avtaleContext = useContext(AvtaleContext);
    const cls = BEMHelper('forkortAvtale');

    const [modalApen, setModalApen] = useState(false);
    const [sluttDato, setSluttDato] = useState<string | undefined>();
    const [datoFeil, setDatoFeil] = useState<string>();
    const [grunn, setGrunn] = useState<string>('');
    const [annetGrunn, setAnnetGrunn] = useState<string>();
    // Hvis man skal forkorte, kan vi gå ut fra at start og sluttdato alltid er satt
    const naavaerendeDato = avtaleContext.avtale.gjeldendeInnhold.sluttDato!;
    const startDato = avtaleContext.avtale.gjeldendeInnhold.startDato!;

    const [tilskuddsperioder, setTilskuddsperioder] = useState<TilskuddsPeriode[]>([]);

    const forkort = async (): Promise<void> => {
        if (!sluttDato) {
            setDatoFeil('Dato må fylles ut');
            return;
        }
        await forkortAvtale(avtaleContext.avtale, sluttDato, grunn, annetGrunn);
        await avtaleContext.hentAvtale();
        lukkModal();
    };

    const onDatoChange = async (dato: string | undefined): Promise<void> => {
        setSluttDato(dato);
        setDatoFeil(undefined);
        if (dato) {
            try {
                const nyAvtale = await forkortAvtaleDryRun(avtaleContext.avtale, dato);
                setTilskuddsperioder(nyAvtale.tilskuddPeriode);
            } catch (error: any) {
                handterFeil(error, (feilmelding: string) => setDatoFeil(feilmelding));
            }
        }
    };

    const lukkModal = (): void => {
        setModalApen(false);
        setTilskuddsperioder([]);
        setSluttDato(undefined);
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
                    Forkort avtale
                </Link>
            </div>

            <BekreftelseModal
                style={{ maxWidth: '100%' }}
                avbrytelseTekst="Avbryt"
                bekreftelseTekst="Forkort"
                oversiktTekst="Forkort avtale"
                modalIsOpen={modalApen}
                bekreftOnClick={forkort}
                lukkModal={lukkModal}
            >
                <div className={cls.className}>
                    <div className={cls.element('navarende-sluttdato')}>
                        <Label>Nåværende sluttdato for avtalen</Label>
                        <BodyShort size="small">{formaterDato(naavaerendeDato, NORSK_DATO_FORMAT)}</BodyShort>
                    </div>

                    <Fieldset
                        legend="Velg ny sluttdato for avtalen"
                        error={datoFeil}
                        title="Velg ny sluttdato for avtalen"
                    >
                        <DatovelgerForlengOgForkort
                            datoFelt="sluttDato"
                            label=""
                            onChangeHåndtereNyDato={onDatoChange}
                            minDate={formaterDato(startDato, 'yyyy-MM-dd')}
                            maxDate={format(addDays(naavaerendeDato, -1), 'yyyy-MM-dd')}
                        />
                    </Fieldset>
                    <VerticalSpacer rem={1} />
                    <Fieldset legend="Hvorfor forkortes avtalen?" title="Hvorfor forkortes avtalen?">
                        {[
                            'Begynt i arbeid',
                            'Fått tilbud om annet tiltak',
                            'Syk',
                            'Ikke møtt',
                            'Fullført',
                            'Annet',
                        ].map((label: string, index: number) => (
                            <RadioGroup legend="" key={index} value={grunn}>
                                <Radio
                                    key={label}
                                    name="grunn"
                                    value={label}
                                    checked={label === grunn}
                                    onChange={(event) => {
                                        setGrunn(event.currentTarget.value);
                                        setAnnetGrunn(undefined);
                                    }}
                                    role="menuitemradio"
                                >
                                    {label}
                                </Radio>
                            </RadioGroup>
                        ))}
                    </Fieldset>
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
                </div>
            </BekreftelseModal>
        </>
    );
};

export default ForkortAvtale;
