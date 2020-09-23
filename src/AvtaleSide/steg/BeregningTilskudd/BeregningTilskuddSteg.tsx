import { medContext, Rolle } from '@/AvtaleContext';
import { InputStegProps } from '@/AvtaleSide/input-steg-props';
import VisUtregningenPanel from '@/AvtaleSide/steg/BeregningTilskudd/VisUtregningenPanel';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import KontonummerInput from '@/komponenter/form/KontonummerInput';
import RadioPanelGruppeHorisontal from '@/komponenter/form/RadioPanelGruppeHorisontal';
import SelectInput from '@/komponenter/form/SelectInput';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import ValutaInput from '@/komponenter/form/ValutaInput';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { AvtaleMetadata, Beregningsgrunnlag, Kontonummer } from '@/types/avtale';
import BEMHelper from '@/utils/bem';
import {
    arbeidsgiverAvgift,
    feriepenger,
    lonnHundreProsent,
    obligTjenestepensjon,
    sumLonnFeriePensjon,
    sumLonnstilskuddPerManed,
    sumUtgifter,
} from '@/utils/lonnstilskuddUtregningUtils';
import { Column, Row } from 'nav-frontend-grid';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import React, { FunctionComponent, useContext, useEffect } from 'react';
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

const arbeidsgiveravgiftAlternativer = () => {
    const satser = [0.141, 0.106, 0.064, 0.051, 0.079, 0];
    const satserVerdier = [{ label: 'Velg', value: '' }];
    satser.forEach((sats: number) =>
        satserVerdier.push({
            label: (sats * 100).toFixed(1) + ' %',
            value: sats.toString(),
        })
    );
    return satserVerdier;
};

const BeregningTilskuddSteg: FunctionComponent<InputStegProps<Beregningsgrunnlag & Kontonummer> & {
    avtale: AvtaleMetadata;
    rolle: Rolle;
}> = props => {
    const innloggetBruker = useContext(InnloggetBrukerContext);
    const { settAvtaleVerdi, avtale } = props;
    const {
        manedslonn,
        feriepengesats,
        feriepengerBelop,
        arbeidsgiveravgift,
        otpBelop,
        sumLonnsutgifter,
        arbeidsgiveravgiftBelop,
        lonnstilskuddProsent,
    } = props.avtale;

    useEffect(() => {
        const sjekkOmAvtaleVerdiSkalSettes = (key: keyof Beregningsgrunnlag, nyttBelop: number) => {
            if (avtale[key] !== nyttBelop) {
                settAvtaleVerdi(key, nyttBelop);
            }
        };

        sjekkOmAvtaleVerdiSkalSettes('feriepengerBelop', feriepenger(manedslonn, feriepengesats));
        sjekkOmAvtaleVerdiSkalSettes('otpBelop', obligTjenestepensjon(manedslonn, feriepengerBelop));
        sjekkOmAvtaleVerdiSkalSettes(
            'arbeidsgiveravgiftBelop',
            arbeidsgiverAvgift(sumLonnFeriePensjon(manedslonn, feriepengerBelop, otpBelop), arbeidsgiveravgift)
        );
        sjekkOmAvtaleVerdiSkalSettes(
            'sumLonnsutgifter',
            sumUtgifter(manedslonn, feriepengerBelop, otpBelop, arbeidsgiveravgiftBelop)
        );
        sjekkOmAvtaleVerdiSkalSettes(
            'sumLonnstilskudd',
            sumLonnstilskuddPerManed(sumLonnsutgifter, lonnstilskuddProsent)
        );
    }, [
        avtale,
        manedslonn,
        feriepengesats,
        feriepengerBelop,
        settAvtaleVerdi,
        arbeidsgiveravgift,
        otpBelop,
        sumLonnsutgifter,
        arbeidsgiveravgiftBelop,
        lonnstilskuddProsent,
    ]);

    const parseFloatIfFloatable = (verdi: string) => {
        const floatedValue = parseFloat(verdi);
        if (!isNaN(floatedValue)) {
            return parseFloat(verdi);
        } else {
            return '';
        }
    };

    return (
        <Innholdsboks utfyller="veileder_og_arbeidsgiver">
            <SkjemaTittel>Beregning av lønnstilskudd</SkjemaTittel>
            <VerticalSpacer sixteenPx={true} />

            {innloggetBruker.erNavAnsatt && (
                <>
                    <Undertittel>Lønnstilskudd prosent</Undertittel>
                    <Normaltekst className={cls.element('luft')}>
                        Velg sats for refusjon som arbeidsgiver skal få tilbake
                    </Normaltekst>
                    <LonnstilskuddProsent
                        tiltakstype={props.avtale.tiltakstype}
                        lonnstilskuddProsent={props.avtale.lonnstilskuddProsent}
                        settLonnstilskuddProsent={verdi => props.settAvtaleVerdi('lonnstilskuddProsent', verdi)}
                    />
                    <VerticalSpacer sixteenPx={true} />
                </>
            )}

            <Undertittel className={cls.element('lonn-tittel')}>Lønn</Undertittel>

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
                        value={props.avtale.arbeidsgiveravgift || 0}
                        onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                            props.settAvtaleVerdi('arbeidsgiveravgift', parseFloatIfFloatable(event.target.value));
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
                    <VisUtregningenPanel {...props.avtale} />
                    <VerticalSpacer twentyPx={true} />
                    {innloggetBruker.erNavAnsatt &&
                        props.avtale.stillingprosent > 0 &&
                        props.avtale.stillingprosent < 100 && (
                            <ValutaInput
                                disabled={true}
                                name="manedslonn100%"
                                bredde="S"
                                label="Lønn ved 100% stilling"
                                value={lonnHundreProsent(sumLonnsutgifter, props.avtale.stillingprosent)}
                            />
                        )}
                    <VerticalSpacer thirtyTwoPx={true} />
                    <LagreKnapp lagre={props.lagreAvtale} label={'Lagre'} suksessmelding={'Avtale lagret'} />
                </Column>
            </Row>
        </Innholdsboks>
    );
};

export default medContext(BeregningTilskuddSteg);
