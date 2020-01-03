import React from 'react';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { Context, medContext } from '@/AvtaleContext';
import RadioPanelGruppeHorisontal from '@/komponenter/form/RadioPanelGruppeHorisontal';
import { Column, Container, Row } from 'nav-frontend-grid';
import ValutaInput from '@/komponenter/form/ValutaInput';
import ProsentInput from '@/komponenter/form/ProsentInput';
import SelectInput from '@/komponenter/form/SelectInput';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import KontonummerInput from '@/komponenter/form/KontonummerInput';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import VisUtregningenPanel from '@/AvtaleSide/steg/BeregningTilskudd/VisUtregningenPanel';

const feriepengeAlternativer = (erOver60: boolean) => {
    const satser = erOver60 ? [0.12, 0.143] : [0.102, 0.125];
    return satser.map((sats: number) => ({
        label: (sats * 100).toFixed(1) + ' %',
        value: sats.toString(),
    }));
};
const arbeidsgiveravgiftAlternativer = () => {
    const satser = [0.141, 0.106, 0.064, 0.051, 0.079];
    return satser.map((sats: number) => ({
        label: (sats * 100).toFixed(1) + ' %',
        value: sats.toString(),
    }));
};
const BeregningTilskuddSteg = (props: Context) => {
    const { settAvtaleVerdi, avtale } = props;
    return (
        <Innholdsboks utfyller="veileder_og_arbeidsgiver">
            <SkjemaTittel>Beregning av lønnstilskudd</SkjemaTittel>
            <Undertittel>Lønn og stillingsprosent</Undertittel>
            <Container fluid={true}>
                <Row className="">
                    <Column md="6">
                        <ValutaInput
                            name="manedslonn"
                            bredde="S"
                            label="Månedslønn før skatt"
                            className="BeregningTilskudd"
                            value={avtale.manedslonn}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                settAvtaleVerdi('manedslonn', parseFloat(event.target.value));
                            }}
                            min={10000}
                            max={65000}
                        />
                    </Column>
                    <Column md="6">
                        <ProsentInput
                            name="stillingprosent"
                            type="number"
                            bredde="S"
                            label="Stillingsprosent"
                            maxLength={3}
                            max={100}
                            min={50}
                            className="BeregningTilskudd"
                            value={avtale.stillingprosent}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                settAvtaleVerdi('stillingprosent', parseFloat(event.target.value));
                            }}
                        />
                    </Column>
                </Row>
                <Row className="">
                    <Column md="12">
                        <Undertittel>Feriepenger</Undertittel>
                        <Normaltekst>Velg sats for feriepenger som arbeidstaker skal ha</Normaltekst>
                        <RadioPanelGruppeHorisontal
                            radios={feriepengeAlternativer(true)}
                            name="feriepengesats"
                            checked={avtale.feriepengesats + ''}
                            legend=""
                            onChange={(event: React.SyntheticEvent<EventTarget>, verdi: string) =>
                                props.settAvtaleVerdi('feriepengesats', parseFloat(verdi))
                            }
                        />
                        <VerticalSpacer twentyPx={true} />
                        <Undertittel>Obligatorisk tjenestepensjon</Undertittel>
                        2 %
                        <VerticalSpacer twentyPx={true} />
                        <Undertittel>Arbeidsgiveravgift</Undertittel>
                        <SelectInput
                            name="arbeidsgiveravgift"
                            bredde="s"
                            options={arbeidsgiveravgiftAlternativer()}
                            label="Sats for arbeidsgiveravgift"
                            children=""
                            className="BeregningTilskudd"
                            value={avtale.arbeidsgiveravgift}
                            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                                settAvtaleVerdi('arbeidsgiveravgift', parseFloat(event.target.value));
                            }}
                        />
                        <KontonummerInput
                            label={'Kontonummer'}
                            value={avtale.arbeidsgiverKontonummer}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                settAvtaleVerdi('arbeidsgiverKontonummer', event.target.value);
                            }}
                        />
                        <VisUtregningenPanel {...props} />
                        <VerticalSpacer twentyPx={true} />
                        <LagreKnapp
                            className="kontaktinfo-steg__lagre-knapp"
                            lagre={props.lagreAvtale}
                            label={'Lagre'}
                            suksessmelding={'Avtale lagret'}
                        />
                    </Column>
                </Row>
            </Container>
        </Innholdsboks>
    );
};

export default medContext(BeregningTilskuddSteg);
