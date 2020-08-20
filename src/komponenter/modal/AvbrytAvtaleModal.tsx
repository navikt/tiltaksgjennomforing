import { medContext } from '@/AvtaleContext';
import { InputStegProps } from '@/AvtaleSide/input-steg-props';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import PakrevdTextarea from '@/komponenter/PakrevdTextarea/PakrevdTextarea';
import { Avbrytelse, AvbrytelseGrunn } from '@/types/avtale';
import BEMHelper from '@/utils/bem';
import moment from 'moment';
import { Datovelger } from 'nav-datovelger';
import { Radio, SkjemaGruppe } from 'nav-frontend-skjema';
import { SkjemaelementFeil } from 'nav-frontend-skjema/lib/skjemaelement-feilmelding';
import { Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent, useEffect, useState } from 'react';
import './AvbrytAvtaleModal.less';
import BekreftelseModal from './BekreftelseModal';

type Props = {
    isOpen: boolean;
    lukkModal: () => void;
    avbrytAvtale: () => Promise<any>;
};

const DAGENS_DATO = moment().format(moment.HTML5_FMT.DATE);
const cls = BEMHelper('avbryt-avtale-modal');

const AvbrytAvtaleModal: FunctionComponent<Props & InputStegProps<Avbrytelse>> = props => {
    const [annetGrunn, setAnnetGrunn] = useState('');
    const [grunnFeil, setGrunnFeil] = useState<undefined | SkjemaelementFeil>(undefined);
    const [datoFeil, setDatoFeil] = useState<undefined | SkjemaelementFeil>(undefined);

    const bekreftAvbrytAvtale = async () => {
        if (!props.avtale.avbruttGrunn || !props.avtale.avbruttDato) {
            if (!props.avtale.avbruttGrunn) {
                setGrunnFeil({ feilmelding: 'Vennligst velg en grunn' });
            }
            if (!props.avtale.avbruttDato) {
                setDatoFeil({ feilmelding: 'Vennligst velg en dato' });
            }
        } else {
            if (props.avtale.avbruttGrunn === 'Annet') {
                if (annetGrunn) {
                    props.settAvtaleVerdi('avbruttGrunn', annetGrunn);
                } else {
                    return;
                }
            }
            return await props.avbrytAvtale();
        }
    };

    const velgStartDato = (dato: string | undefined) => {
        props.settAvtaleVerdi('avbruttDato', dato);
    };

    useEffect(() => {
        velgStartDato(DAGENS_DATO);
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (props.avtale.avbruttGrunn) {
            setGrunnFeil(undefined);
        }
        if (props.avtale.avbruttGrunn === 'Annet') {
            document.querySelector<HTMLElement>('.pakrevd-textarea')!.focus();
        }
    }, [props.avtale.avbruttGrunn]);

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
                    Når du avbryter avtalen, blir innholdet låst og den blir markert som "avbrutt" i din oversikt. Du
                    kan ikke redigere eller gjenopprette den etterpå.
                </Normaltekst>
            </div>
            <VerticalSpacer sixteenPx={true} />
            <SkjemaGruppe feil={datoFeil} title="Dato for avbrytelse">
                <Datovelger
                    avgrensninger={{ minDato: DAGENS_DATO }}
                    input={{ placeholder: 'dd.mm.åååå' }}
                    valgtDato={props.avtale.avbruttDato}
                    onChange={dato => velgStartDato(dato)}
                />
            </SkjemaGruppe>
            <div className={cls.element('grunner-og-annet')}>
                <div>
                    <VerticalSpacer twentyPx={true} />
                    <SkjemaGruppe title="Hvorfor avbrytes avtalen?" feil={grunnFeil}>
                        {grunner.map(grunn => {
                            return (
                                <Radio
                                    key={grunn}
                                    label={grunn}
                                    name="avbrytelsegrunn"
                                    value={grunn}
                                    checked={props.avtale.avbruttGrunn === grunn}
                                    onChange={event => props.settAvtaleVerdi('avbruttGrunn', event.currentTarget.value)}
                                />
                            );
                        })}
                    </SkjemaGruppe>
                </div>
                <div>
                    {props.avtale.avbruttGrunn === 'Annet' && (
                        <PakrevdTextarea
                            label=""
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
        </>
    );

    return (
        <BekreftelseModal
            bekreftOnClick={bekreftAvbrytAvtale}
            lukkModal={props.lukkModal}
            modalIsOpen={props.isOpen}
            oversiktTekst="Avbryt avtale"
            varselTekst={modalInnhold}
            bekreftelseTekst="Avbryt avtale"
            avbrytelseTekst="Behold avtale"
        />
    );
};

export default medContext(AvbrytAvtaleModal);
