import { AvtaleContext } from '@/AvtaleProvider';
import SlikVilTilskuddsperioderSeUt from '@/AvtaleSide/Oppgavelinje/SlikVilTilskuddsperioderSeUt';
import BekreftelseModal from '@/komponenter/modal/BekreftelseModal';
import { justerArenaMigreringsdato, justerArenaMigreringsdatoDryRun } from '@/services/rest-service';
import { TilskuddsPeriode } from '@/types/avtale';
import { handterFeil } from '@/utils/apiFeilUtils';
import BEMHelper from '@/utils/bem';
import { Notes } from '@navikt/ds-icons/cjs';
import { Link, UNSAFE_MonthPicker } from '@navikt/ds-react';
import moment from 'moment';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import { FunctionComponent, useContext, useState } from 'react';
//import './forlengAvtale.less';

const JusterArenaMigreringsdato: FunctionComponent = () => {
    const avtaleContext = useContext(AvtaleContext);
    const cls = BEMHelper('forlengAvtale');

    const [modalApen, setModalApen] = useState(false);
    const [sluttDato, setSluttDato] = useState<string | undefined>();
    const [feil, setFeil] = useState<string>();
    const [tilskuddsperioder, setTilskuddsperioder] = useState<TilskuddsPeriode[]>([]);

    const juster = async () => {
        if (sluttDato) {
            await justerArenaMigreringsdato(avtaleContext.avtale, sluttDato);
            await avtaleContext.hentAvtale();
            lukkModal();
        }
    };
    const onDatoChange = async (dato: string | undefined) => { 
        if (dato) {
            const datoUtenTimezone = moment(dato).format('YYYY-MM-DD');
            setSluttDato(datoUtenTimezone);

            try {
                const nyAvtale = await justerArenaMigreringsdatoDryRun(avtaleContext.avtale, datoUtenTimezone);
                setTilskuddsperioder(nyAvtale.tilskuddPeriode);
                setFeil(undefined);
            } catch (e: any) {
                handterFeil(e, (feilmelding) => {
                    setFeil(feilmelding);
                });
            }
        }
    };

    const startDatoDate = avtaleContext.avtale.gjeldendeInnhold.startDato ?  new Date(avtaleContext.avtale.gjeldendeInnhold.startDato) : undefined;
    
    const modalInnhold = (
        <div className={cls.className}>
            <div className={cls.element('navarende-sluttdato')}>
            </div>
            <SkjemaGruppe feil={feil}>
                <label className="skjemaelement__label">
                    Velg første måned avtalen skal behandles i ny løsning og ikke i Arena.
                </label>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <UNSAFE_MonthPicker.Standalone
                        onMonthSelect={(dato: any) => onDatoChange(dato)}
                        dropdownCaption
                        fromDate={startDatoDate}
                        toDate={new Date('2023-02-01')}
                    />
                </div>
            </SkjemaGruppe>
            <SlikVilTilskuddsperioderSeUt
                overskrift="Slik vil tilskuddsperiodene se ut etter at dato for arenamigrering er justert:"
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

    const startDatoErEtterMigreringsdato = avtaleContext.avtale.gjeldendeInnhold.startDato && moment(avtaleContext.avtale.gjeldendeInnhold.startDato).isAfter(moment('2023-02-01'));
    if (!avtaleContext.avtale.gjeldendeInnhold.startDato || startDatoErEtterMigreringsdato) {
        return null;
    }

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
                    Juster arenamigreringsdato
                </Link>
            </div>

            <BekreftelseModal
                style={{ maxWidth: '100%' }}
                avbrytelseTekst="Avbryt"
                bekreftelseTekst="Juster"
                oversiktTekst="Juster dato for arenamigrering"
                modalIsOpen={modalApen}
                bekreftOnClick={juster}
                lukkModal={lukkModal}
                modalInnhold={modalInnhold}
            />
        </>
    );
};

export default JusterArenaMigreringsdato;
