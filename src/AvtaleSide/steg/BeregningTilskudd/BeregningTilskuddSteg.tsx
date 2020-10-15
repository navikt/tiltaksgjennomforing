import { AvtaleContext } from '@/AvtaleProvider';
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
import { Beregningsgrunnlag } from '@/types/avtale';
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
import LesMerPanel from '@/komponenter/LesMerPanel/LesMerPanel';

const cls = BEMHelper('beregningTilskuddSteg');
const lonnPerManedInkludertFastTillegHjelpetekst = (
    <div>
        Brutto lønn omregnes til fast gjennomsnittlig månedslønn. I refusjonsgrunnlaget inngår lønn for arbeid utført i
        normalarbeidstiden inkludert faste tillegg. Overtidsbetaling og andre variable tillegg skal ikke tas med. Faste
        tillegg er knyttet til personlige egenskaper, evner eller ansvar og utbetales regelmessig ved hver
        lønnsutbetaling. Beløpet er en fast størrelse og gjelder blant annet:
        <VerticalSpacer eightPx={true} />
        <ul>
            <li>b-tillegg</li>
            <li>stabiliseringstillegg</li>
            <li>selektivt tillegg for sykepleiere</li>
            <li>tillegg for ansvarsvakter, fagansvar og lederansvar</li>
            <li>kvalifikasjons-/kompetansetillegg</li>
        </ul>
        <VerticalSpacer eightPx={true} />
        Dette gjelder ikke:
        <ul>
            <li>skift-, turnus- og vakttillegg</li>
            <li>offshoretillegg</li>
        </ul>
    </div>
);

const feriepengeAlternativer = () => {
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

const BeregningTilskuddSteg: FunctionComponent = () => {
    const innloggetBruker = useContext(InnloggetBrukerContext);
    const { avtale, settAvtaleVerdi, lagreAvtale } = useContext(AvtaleContext);
    const {
        manedslonn,
        feriepengesats,
        feriepengerBelop,
        arbeidsgiveravgift,
        otpBelop,
        sumLonnsutgifter,
        arbeidsgiveravgiftBelop,
        lonnstilskuddProsent,
    } = avtale;

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
                        tiltakstype={avtale.tiltakstype}
                        lonnstilskuddProsent={avtale.lonnstilskuddProsent}
                        settLonnstilskuddProsent={verdi => settAvtaleVerdi('lonnstilskuddProsent', verdi)}
                    />
                    <VerticalSpacer sixteenPx={true} />
                </>
            )}

            <Undertittel className={cls.element('lonn-tittel')}>Lønn per måned inkludert faste tillegg</Undertittel>
            <LesMerPanel åpneLabel="Hva menes med dette?" lukkLabel="Lukk">
                {lonnPerManedInkludertFastTillegHjelpetekst}
            </LesMerPanel>
            <VerticalSpacer sixteenPx={true} />
            <Row className="">
                <Column md="6">
                    <ValutaInput
                        name="manedslonn"
                        bredde="S"
                        label="Månedslønn før skatt"
                        value={avtale.manedslonn}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            settAvtaleVerdi('manedslonn', parseFloat(event.target.value));
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
                        radios={feriepengeAlternativer()}
                        name="feriepengesats"
                        checked={avtale.feriepengesats + ''}
                        legend=""
                        onChange={(event: React.SyntheticEvent<EventTarget>, verdi: string) =>
                            settAvtaleVerdi('feriepengesats', parseFloat(verdi))
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
                        value={avtale.arbeidsgiveravgift}
                        onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                            settAvtaleVerdi('arbeidsgiveravgift', parseFloatIfFloatable(event.target.value));
                        }}
                    />
                    <KontonummerInput
                        bredde={'L'}
                        label={'Kontonummer til arbeidsgiver'}
                        value={avtale.arbeidsgiverKontonummer}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            settAvtaleVerdi('arbeidsgiverKontonummer', event.target.value);
                        }}
                    />
                    <VisUtregningenPanel {...avtale} />
                    <VerticalSpacer twentyPx={true} />
                    {innloggetBruker.erNavAnsatt &&
                        avtale.stillingprosent !== undefined &&
                        avtale.stillingprosent > 0 &&
                        avtale.stillingprosent < 100 && (
                            <ValutaInput
                                disabled={true}
                                name="manedslonn100%"
                                bredde="S"
                                label="Lønn ved 100% stilling"
                                value={lonnHundreProsent(sumLonnsutgifter, avtale.stillingprosent)}
                            />
                        )}
                    <VerticalSpacer thirtyTwoPx={true} />
                    <LagreKnapp lagre={lagreAvtale} label={'Lagre'} suksessmelding={'Avtale lagret'} />
                </Column>
            </Row>
        </Innholdsboks>
    );
};

export default BeregningTilskuddSteg;
