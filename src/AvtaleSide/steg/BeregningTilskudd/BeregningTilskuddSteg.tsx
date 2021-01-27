import { ReactComponent as PenFillIkon } from '@/assets/ikoner/pencil-fill.svg';
import { AvtaleContext } from '@/AvtaleProvider';
import LesMerOmTilskuddsPerioder from '@/AvtaleSide/steg/BeregningTilskudd/tilskuddsPerioder/LesMerOmTilskuddsPerioder';
import TilskuddsPerioder from '@/AvtaleSide/steg/BeregningTilskudd/tilskuddsPerioder/TilskuddsPerioder';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import KontonummerInput from '@/komponenter/form/KontonummerInput';
import RadioPanelGruppeHorisontal from '@/komponenter/form/RadioPanelGruppeHorisontal';
import SelectInput from '@/komponenter/form/SelectInput';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import ValutaInput from '@/komponenter/form/ValutaInput';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import LesMerPanel from '@/komponenter/LesMerPanel/LesMerPanel';
import BEMHelper from '@/utils/bem';
import { Column, Row } from 'nav-frontend-grid';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import React, { FunctionComponent, useContext } from 'react';
import './BeregningTilskuddSteg.less';
import LonnstilskuddProsent from './LonnstilskuddProsent';
import OtpProsentInput from './OtpProsentInput';
import UtregningPanel from './UtregningPanel';

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
    const { avtale, settOgLagreBeregningsverdier, lagreAvtale, settAvtaleVerdier } = useContext(AvtaleContext);

    const parseFloatIfFloatable = (verdi: string) => {
        const floatedValue = parseFloat(verdi);
        if (!isNaN(floatedValue)) {
            return parseFloat(verdi);
        } else {
            return undefined;
        }
    };

    return (
        <Innholdsboks utfyller="veileder_og_arbeidsgiver">
            <SkjemaTittel>Beregning av lønnstilskudd</SkjemaTittel>
            <Undertittel>Lønnstilskudd prosent</Undertittel>

            {!avtale.lonnstilskuddProsent && (
                <>
                    <VerticalSpacer fourPx={true} />
                    <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                        <PenFillIkon />
                        <Normaltekst style={{ marginLeft: '1rem' }}>Fylles ut av NAV</Normaltekst>
                    </div>
                </>
            )}

            {innloggetBruker.erNavAnsatt && (
                <>
                    <Normaltekst className={cls.element('luft')}>
                        Velg sats for refusjon som arbeidsgiver skal få tilbake
                    </Normaltekst>
                    <LonnstilskuddProsent
                        tiltakstype={avtale.tiltakstype}
                        lonnstilskuddProsent={avtale.lonnstilskuddProsent}
                        settLonnstilskuddProsent={verdi =>
                            settOgLagreBeregningsverdier({ lonnstilskuddProsent: verdi })
                        }
                    />
                </>
            )}
            {!innloggetBruker.erNavAnsatt && (
                <Normaltekst className={cls.element('luft')}>
                    {!avtale.lonnstilskuddProsent
                        ? avtale.tiltakstype === 'VARIG_LONNSTILSKUDD'
                            ? 'Her kan NAV sette en sats.'
                            : 'Her kan NAV sette en sats på 40% eller 60%'
                        : avtale.lonnstilskuddProsent + ' %'}
                </Normaltekst>
            )}

            <VerticalSpacer sixteenPx={true} />
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
                            settAvtaleVerdier({ manedslonn: parseFloat(event.target.value) });
                        }}
                        onBlur={() => lagreAvtale()}
                        min={0}
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
                            settOgLagreBeregningsverdier({ feriepengesats: parseFloat(verdi) })
                        }
                    />
                    <VerticalSpacer twentyPx={true} />
                    <Undertittel>Obligatorisk tjenestepensjon</Undertittel>
                    <OtpProsentInput
                        name="tjenestepensjon"
                        bredde="S"
                        max={30}
                        min={0}
                        label="Obligatorisk tjenestepensjon fra 0 - 30%"
                        value={avtale.otpSats}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            settAvtaleVerdier({ otpSats: parseFloat(event.target.value) / 100 });
                        }}
                        onBlur={() => lagreAvtale()}
                    />
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
                            settOgLagreBeregningsverdier({
                                arbeidsgiveravgift: parseFloatIfFloatable(event.target.value),
                            });
                        }}
                    />
                    <KontonummerInput
                        bredde={'L'}
                        label={'Kontonummer til arbeidsgiver'}
                        value={avtale.arbeidsgiverKontonummer}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            settAvtaleVerdier({ arbeidsgiverKontonummer: event.target.value });
                        }}
                        onBlur={() => lagreAvtale()}
                    />
                    <UtregningPanel {...avtale} />
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
                                value={avtale.manedslonn100pst}
                            />
                        )}
                    <VerticalSpacer thirtyTwoPx={true} />
                    <LesMerOmTilskuddsPerioder />
                    <TilskuddsPerioder />
                    <LagreKnapp lagre={lagreAvtale} label={'Lagre'} suksessmelding={'Avtale lagret'} />
                </Column>
            </Row>
        </Innholdsboks>
    );
};

export default BeregningTilskuddSteg;
