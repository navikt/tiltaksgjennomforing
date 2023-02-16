import { AvtaleContext } from '@/AvtaleProvider';
import SlikVilTilskuddsperioderSeUt from '@/AvtaleSide/Oppgavelinje/SlikVilTilskuddsperioderSeUt';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import BekreftelseModal from '@/komponenter/modal/BekreftelseModal';
import { justerArenaMigreringsdato, justerArenaMigreringsdatoDryRun } from '@/services/rest-service';
import { TilskuddsPeriode } from '@/types/avtale';
import { handterFeil } from '@/utils/apiFeilUtils';
import BEMHelper from '@/utils/bem';
import { Notes } from '@navikt/ds-icons/cjs';
import { Link } from '@navikt/ds-react';
import moment from 'moment';
import { Datepicker } from 'nav-datovelger';
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

    const forleng = async () => {
        if (sluttDato) {
            await justerArenaMigreringsdato(avtaleContext.avtale, sluttDato);
            await avtaleContext.hentAvtale();
            lukkModal();
        }
    };
    const onDatoChange = async (dato: string | undefined) => {
        setSluttDato(dato);
        if (dato) {
            try {
                const nyAvtale = await justerArenaMigreringsdatoDryRun(avtaleContext.avtale, dato);
                setTilskuddsperioder(nyAvtale.tilskuddPeriode);
                setFeil(undefined);
            } catch (e: any) {
                handterFeil(e, (feilmelding) => {
                    setFeil(feilmelding);
                });
            }
        }
    };

    const modalInnhold = (
        <div className={cls.className}>
            <div className={cls.element('navarende-sluttdato')}>
                {/* <Label>Juster</Label> */}
                {/* <BodyShort size="small">{'avtaleContext.avtale.gjeldendeInnhold.sluttDato'}</BodyShort> */}
            </div>
            <SkjemaGruppe feil={feil}>
                <label className="skjemaelement__label">Velg til og med dato som avtalen har vært behandlet i arena.</label>
                <Datepicker
                    inputProps={{ placeholder: 'dd.mm.åååå' }}
                    value={sluttDato}
                    limitations={{
                        minDate: moment(avtaleContext.avtale.gjeldendeInnhold.startDato)
                            .add(1, 'days')
                            .format('YYYY-MM-DD'),
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
                bekreftOnClick={forleng}
                lukkModal={lukkModal}
                modalInnhold={modalInnhold}
            />
        </>
    );
};

export default JusterArenaMigreringsdato;
