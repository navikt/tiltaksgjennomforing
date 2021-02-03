import { AvtaleContext } from '@/AvtaleProvider';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import PakrevdTextarea from '@/komponenter/PakrevdTextarea/PakrevdTextarea';
import { AvbrytelseGrunn } from '@/types/avtale';
import BEMHelper from '@/utils/bem';
import moment from 'moment';
import { Datovelger } from 'nav-datovelger';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { Radio, SkjemaGruppe } from 'nav-frontend-skjema';
import { SkjemaelementFeil } from 'nav-frontend-skjema/lib/skjemaelement-feilmelding';
import { Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import './AvbrytAvtaleModal.less';
import BekreftelseModal from './BekreftelseModal';

interface Props {
    isOpen: boolean;
    lukkModal: () => void;
    avbrytAvtale: (avbruttDato: string, avbruttGrunn: string) => Promise<any>;
}

const DAGENS_DATO = moment().format(moment.HTML5_FMT.DATE);
const cls = BEMHelper('avbryt-avtale-modal');

const AvbrytAvtaleModal: FunctionComponent<Props> = props => {
    const [annetGrunn, setAnnetGrunn] = useState('');
    const [grunnFeil, setGrunnFeil] = useState<undefined | SkjemaelementFeil>(undefined);
    const [datoFeil, setDatoFeil] = useState<undefined | SkjemaelementFeil>(undefined);
    const [avbruttGrunn, setAvbruttGrunn] = useState<AvbrytelseGrunn | string>('');
    const [feil, setFeil] = useState('');
    const avtaleContext = useContext(AvtaleContext);
    const [avbruttDato, setAvbruttDato] = useState(avtaleContext.avtale.startDato || DAGENS_DATO);

    const avbruttGrunnSatt = () =>
        !avbruttGrunn || !avbruttDato || (avbruttGrunn === 'Annet' && !annetGrunn) || avbruttDatoErOverEttÅrTilbake();

    const sjekkOgSetAvbryttGrunn = (grunn: boolean, setfeil: () => void) => {
        if (grunn) {
            return setfeil();
        }
    };

    const avbruttDatoErOverEttÅrTilbake = (): boolean => {
        const årsDifferanse = Math.abs(moment(avbruttDato).diff(DAGENS_DATO, 'years'));
        return årsDifferanse >= 1;
    };

    const avbryttAvtalen = async (grunn: string) => {
        return await props
            .avbrytAvtale(avbruttDato, grunn)
            .then(() => props.lukkModal())
            .catch(e => {
                setFeil('Det oppstod en ukjent feil');
            });
    };

    const bekreftAvbrytAvtale = async () => {
        if (avbruttGrunnSatt()) {
            sjekkOgSetAvbryttGrunn(!avbruttGrunn, () => {
                setGrunnFeil({ feilmelding: 'Vennligst velg en grunn' });
            });
            sjekkOgSetAvbryttGrunn(!avbruttDato, () => {
                setDatoFeil({ feilmelding: 'Vennligst velg gyldig dato' });
            });
            sjekkOgSetAvbryttGrunn(avbruttDatoErOverEttÅrTilbake(), () => {
                setDatoFeil({ feilmelding: 'Dato kan ikke overstige ett år tilbake i tid' });
            });
            return;
        }
        if (avbruttGrunn === 'Annet' && annetGrunn) {
            return avbryttAvtalen(annetGrunn);
        }
        return avbryttAvtalen(avbruttGrunn);
    };

    const velgStartDato = (dato: string | undefined) => {
        setDatoFeil(undefined);
        if (dato) {
            setAvbruttDato(dato);
        }
    };

    useEffect(() => {
        if (avbruttGrunn) {
            setGrunnFeil(undefined);
        }
        if (avbruttGrunn === 'Annet') {
            document.querySelector<HTMLElement>('.pakrevd-textarea')!.focus();
        }
    }, [avbruttGrunn]);

    const grunner: AvbrytelseGrunn[] = [
        'Begynt i arbeid',
        'Fått tilbud om annet tiltak',
        'Syk',
        'Ikke møtt',
        'Fullført',
        'Annet',
    ];

    const modalInnhold = (
        <>
            <div>
                <Normaltekst>
                    Når du avbryter avtalen, blir innholdet låst, og den blir markert som "avbrutt" i din oversikt. Du
                    kan ikke redigere eller gjenopprette den etterpå.
                </Normaltekst>
            </div>
            <VerticalSpacer sixteenPx={true} />
            <SkjemaGruppe feil={datoFeil} title="Dato for avbrytelse">
                <Datovelger
                    input={{ placeholder: 'dd.mm.åååå', ariaLabel: 'textbox', ariaDescribedby: 'skriv inn dato felt' }}
                    valgtDato={avbruttDato}
                    onChange={dato => velgStartDato(dato)}
                />
            </SkjemaGruppe>
            <div className={cls.element('grunner-og-annet')}>
                <div role="menu">
                    <VerticalSpacer twentyPx={true} />
                    <SkjemaGruppe title="Hvorfor avbrytes avtalen?" feil={grunnFeil}>
                        {grunner.map(grunn => {
                            return (
                                <Radio
                                    key={grunn}
                                    label={grunn}
                                    name="avbrytelsegrunn"
                                    value={grunn}
                                    checked={avbruttGrunn === grunn}
                                    onChange={event => {
                                        setAvbruttGrunn(event.currentTarget.value);
                                    }}
                                    role="menuitemradio"
                                />
                            );
                        })}
                    </SkjemaGruppe>
                </div>
                <div>
                    {avbruttGrunn === 'Annet' && (
                        <PakrevdTextarea
                            label="tekstboks"
                            labelledby="tekst felt for avbrytt grunn"
                            verdi={annetGrunn}
                            placeholder="Begrunnelse"
                            settVerdi={verdi => setAnnetGrunn(verdi)}
                            maxLengde={500}
                            feilmelding="Begrunnelse er påkrevd"
                            className={cls.element('pakrevd-text-area')}
                        />
                    )}
                </div>
            </div>
            {feil && <AlertStripeAdvarsel>{feil}</AlertStripeAdvarsel>}
        </>
    );

    return (
        <BekreftelseModal
            bekreftOnClick={bekreftAvbrytAvtale}
            lukkModal={props.lukkModal}
            modalIsOpen={props.isOpen}
            oversiktTekst="Avbryt avtalen"
            varselTekst={modalInnhold}
            bekreftelseTekst="Avbryt avtale"
            avbrytelseTekst="Behold avtale"
            descripedby="dialogboks for avbrytte avtalen"
        />
    );
};

export default AvbrytAvtaleModal;
