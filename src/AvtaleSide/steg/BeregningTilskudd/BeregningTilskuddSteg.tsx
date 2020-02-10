import { Context, medContext } from '@/AvtaleContext';
import VisUtregningenPanel from '@/AvtaleSide/steg/BeregningTilskudd/VisUtregningenPanel';
import KontonummerInput from '@/komponenter/form/KontonummerInput';
import RadioPanelGruppeHorisontal from '@/komponenter/form/RadioPanelGruppeHorisontal';
import SelectInput from '@/komponenter/form/SelectInput';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import ValutaInput from '@/komponenter/form/ValutaInput';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import BEMHelper from '@/utils/bem';
import { Column, Row } from 'nav-frontend-grid';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import './BeregningTilskuddSteg.less';
import LonnstilskuddProsent from './LonnstilskuddProsent';

const cls = BEMHelper('beregningTilskuddSteg');

const feriepengeAlternativer = (erOver60: boolean) => {
    // const satser = erOver60 ? [0.12, 0.143] : [0.102, 0.125];
    const satser = [0.12, 0.143, 0.102, 0.125];
    return satser.map((sats: number) => ({
        label: (sats * 100).toFixed(1) + ' %',
        value: sats.toString(),
    }));
};

const lonnstilskuddProsentAlternativer = () => {
    const prosenter = [40, 60];
    return prosenter.map((prosent: number) => ({
        label: prosent.toFixed(0) + '%',
        value: prosent.toString(),
    }));
};
const arbeidsgiveravgiftAlternativer = () => {
    const satser = [0.141, 0.106, 0.064, 0.051, 0.079];
    const satserVerdier = [{ label: 'Velg', value: '0' }];
    satser.forEach((sats: number) =>
        satserVerdier.push({
            label: (sats * 100).toFixed(1) + ' %',
            value: sats.toString(),
        })
    );
    return satserVerdier;
};

const BeregningTilskuddSteg: FunctionComponent<Context> = props => {
    return (
        <Innholdsboks utfyller="veileder_og_arbeidsgiver">
            <SkjemaTittel>Beregning av lønnstilskudd</SkjemaTittel>
            <Undertittel>Lønnstilskudd prosent</Undertittel>
            <Normaltekst className={cls.element('luft')}>
                Velg sats for refusjon som arbeidsgiver skal få tilbake
            </Normaltekst>
            <LonnstilskuddProsent
                lonnstilskuddProsent={props.avtale.lonnstilskuddProsent}
                tiltakstype={props.avtale.tiltakstype}
                radioButtons={lonnstilskuddProsentAlternativer}
                settAvtaleVerdi={props.settAvtaleVerdi}
            />
            <Undertittel className={cls.element('lonnogstillingprosent')}>Lønn</Undertittel>

            <Row className="">
                <Column md="6">
                    <ValutaInput
                        name="manedslonn"
                        bredde="S"
                        label="Månedslønn før skatt"
                        value={props.avtale.manedslonn}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            props.settAvtaleVerdi('manedslonn', parseFloat(event.target.value));
                        }}
                        min={10000}
                        max={65000}
                    />
                </Column>
            </Row>
            <Row className="">
                <Column md="12">
                    <Undertittel className={cls.element('luft')}>Feriepenger</Undertittel>
                    <Normaltekst className={cls.element('luft')}>
                        Velg sats for feriepenger som arbeidstaker skal ha
                    </Normaltekst>
                    <RadioPanelGruppeHorisontal
                        radios={feriepengeAlternativer(true)}
                        name="feriepengesats"
                        checked={props.avtale.feriepengesats + ''}
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
                        value={props.avtale.arbeidsgiveravgift}
                        onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                            props.settAvtaleVerdi('arbeidsgiveravgift', parseFloat(event.target.value));
                        }}
                    />
                    <KontonummerInput
                        bredde={'L'}
                        label={'Kontonummer'}
                        value={props.avtale.arbeidsgiverKontonummer}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            props.settAvtaleVerdi('arbeidsgiverKontonummer', event.target.value);
                        }}
                    />
                    <VisUtregningenPanel {...props} />
                    <VerticalSpacer twentyPx={true} />
                    <LagreKnapp lagre={props.lagreAvtale} label={'Lagre'} suksessmelding={'Avtale lagret'} />
                </Column>
            </Row>
        </Innholdsboks>
    );
};

export default medContext(BeregningTilskuddSteg);
