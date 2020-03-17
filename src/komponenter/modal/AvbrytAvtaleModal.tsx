import { medContext } from '@/AvtaleContext';
import { InputStegProps } from '@/AvtaleSide/input-steg-props';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import PakrevdTextarea from '@/komponenter/PakrevdTextarea/PakrevdTextarea';
import { Avbrytelse } from '@/types/avtale';
import BEMHelper from '@/utils/bem';
import moment, { Moment } from 'moment';
import KnappBase from 'nav-frontend-knapper';
import Modal from 'nav-frontend-modal';
import { Radio, SkjemaGruppe } from 'nav-frontend-skjema';
import { SkjemaelementFeil } from 'nav-frontend-skjema/lib/skjemaelement-feilmelding';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import React, { FunctionComponent, useEffect, useState } from 'react';
import Datovelger from '../../AvtaleSide/steg/VarighetSteg/Datovelger/Datovelger';
import VarselTegnForModal from './VarselTegnForModal';

type Props = {
    isOpen: boolean;
    lukkModal: () => void;
    avbrytAvtale: () => Promise<any>;
};

const cls = BEMHelper('bekreftelseModal');

const AvbrytAvtaleModal: FunctionComponent<Props & InputStegProps<Avbrytelse>> = props => {
    const [annetGrunn, setAnnetGrunn] = useState('');
    const [startDatoRiktigFormatert, setStartDatoRiktigFormatert] = useState<boolean>(true);
    const [grunnFeil, setGrunnFeil] = useState<undefined | SkjemaelementFeil>(undefined);
    const [datoFeil, setDatoFeil] = useState<undefined | SkjemaelementFeil>(undefined);

    const bekreftAvbrytAvtale = () => {
        if (!props.avtale.avbruttGrunn || !props.avtale.avbruttDato) {
            if (!props.avtale.avbruttGrunn) {
                setGrunnFeil({ feilmelding: 'Vennligst velg en grunn' });
            }
            if (!props.avtale.avbruttDato) {
                setDatoFeil({ feilmelding: 'Vennligst velg en dato' });
            }
        } else {
            if (props.avtale.avbruttGrunn === 'Annet') {
                props.settAvtaleVerdi('avbruttGrunn', annetGrunn);
            }
            return props.avbrytAvtale();
        }
    };

    const velgStartDato = (dato: Moment) => {
        setStartDatoRiktigFormatert(true);
        props.settAvtaleVerdi('avbruttDato', dato.toISOString(true).split('+')[0]);
    };

    useEffect(() => {
        const dagensDato = moment(moment.now());
        velgStartDato(dagensDato);
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (props.avtale.avbruttGrunn) {
            setGrunnFeil(undefined);
        }
    }, [props.avtale.avbruttGrunn]);

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
                    velgDato={velgStartDato}
                    dato={moment(props.avtale.avbruttDato)}
                    settRiktigFormatert={() => setStartDatoRiktigFormatert(true)}
                    inputRiktigFormatert={startDatoRiktigFormatert}
                />
            </SkjemaGruppe>
            <div>
                <VerticalSpacer twentyPx={true} />
                <SkjemaGruppe title="Hvorfor avbrytes avtalen?" feil={grunnFeil}>
                    <Radio
                        label="Begynt i arbeid"
                        name="avbrytelsegrunn"
                        value="Begynt i arbeid"
                        checked={props.avtale.avbruttGrunn === 'Begynt i arbeid'}
                        onChange={event => props.settAvtaleVerdi('avbruttGrunn', event.currentTarget.value)}
                    />
                    <Radio
                        label="Fått tilbud om annet tiltak"
                        name="avbrytelsegrunn"
                        value="Fått tilbud om annet tiltak"
                        checked={props.avtale.avbruttGrunn === 'Fått tilbud om annet tiltak'}
                        onChange={event => props.settAvtaleVerdi('avbruttGrunn', event.currentTarget.value)}
                    />
                    <Radio
                        label="Syk"
                        name="avbrytelsegrunn"
                        value="Syk"
                        checked={props.avtale.avbruttGrunn === 'Syk'}
                        onChange={event => props.settAvtaleVerdi('avbruttGrunn', event.currentTarget.value)}
                    />
                    <Radio
                        label="Ikke møtt"
                        name="avbrytelsegrunn"
                        value="Ikke møtt"
                        checked={props.avtale.avbruttGrunn === 'Ikke møtt'}
                        onChange={event => props.settAvtaleVerdi('avbruttGrunn', event.currentTarget.value)}
                    />
                    <Radio
                        label="Fullført"
                        name="avbrytelsegrunn"
                        value="Fullført"
                        checked={props.avtale.avbruttGrunn === 'Fullført'}
                        onChange={event => props.settAvtaleVerdi('avbruttGrunn', event.currentTarget.value)}
                    />
                    <Radio
                        label="Korona"
                        name="avbrytelsegrunn"
                        value="Korona"
                        checked={props.avtale.avbruttGrunn === 'Korona'}
                        onChange={event => props.settAvtaleVerdi('avbruttGrunn', event.currentTarget.value)}
                    />
                    <Radio
                        label="Annet"
                        name="avbrytelsegrunn"
                        value="Annet"
                        checked={props.avtale.avbruttGrunn === 'Annet'}
                        onChange={event => props.settAvtaleVerdi('avbruttGrunn', event.currentTarget.value)}
                    />
                </SkjemaGruppe>
            </div>

            {props.avtale.avbruttGrunn === 'Annet' && (
                <PakrevdTextarea
                    label=""
                    verdi={annetGrunn}
                    placeholder="Begrunnelse"
                    settVerdi={verdi => setAnnetGrunn(verdi)}
                    maxLengde={500}
                    feilmelding="Vennligst beskriv"
                />
            )}
        </>
    );

    return (
        <div className={cls.className}>
            <Modal
                isOpen={props.isOpen}
                className="modal--overflow-visible"
                contentLabel={'test'}
                onRequestClose={props.lukkModal}
                closeButton={false}
            >
                <div className={cls.element('topIconContainer')}>
                    <VarselTegnForModal width={'80px'} height={'80px'} />
                </div>
                <div className={cls.element('body')}>
                    <div className={cls.element('knappRad')} />
                    <div className={cls.element('innhold')}>
                        <div className={cls.element('tittel')}>
                            <Systemtittel>Avbryt avtale</Systemtittel>
                        </div>
                        <Normaltekst className={cls.element('varselTekst')}>{modalInnhold}</Normaltekst>
                    </div>
                    <div className={cls.element('knapper')}>
                        <KnappBase
                            type={'hoved'}
                            className={cls.element('knapp lenkeknapp')}
                            onClick={bekreftAvbrytAvtale}
                        >
                            avbryt avtale
                        </KnappBase>
                        <KnappBase type={'flat'} className={cls.element('knapp lenkeknapp')} onClick={props.lukkModal}>
                            behold avtale
                        </KnappBase>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default medContext(AvbrytAvtaleModal);
