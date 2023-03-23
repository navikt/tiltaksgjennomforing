import { AvtaleContext } from '@/AvtaleProvider';
import { Feature, FeatureToggleContext } from '@/FeatureToggleProvider';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import KontonummerInput from '@/komponenter/form/KontonummerInput';
import ProsentInput from '@/komponenter/form/ProsentInput';
import RadioPanelGruppeHorisontal from '@/komponenter/radiopanel/RadioPanelGruppeHorisontal';
import SelectInput from '@/komponenter/form/SelectInput';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import ValutaInput from '@/komponenter/form/ValutaInput';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import LesMerPanel from '@/komponenter/LesMerPanel/LesMerPanel';
import EksternLenke from '@/komponenter/navigation/EksternLenke';
import { hentKontonummerForArbeidsgiver } from '@/services/rest-service';
import BEMHelper from '@/utils/bem';
import { parseFloatIfFloatable } from '@/utils/lonnstilskuddUtregningUtils';
import { Money } from '@navikt/ds-icons/cjs';
import { Column, Row } from '@/komponenter/NavGrid/Grid';
import { BodyShort, Heading } from '@navikt/ds-react';
import React, { FunctionComponent, useContext } from 'react';
import './BeregningTilskuddSteg.less';
import KvalifiseringsgruppeSats from './KvalifiseringsgruppeSats/KvalifiseringsgruppeSats';
import OppgiLonnstilskuddprosent from './OppgiLonnstilskuddprosent';
import UtregningPanel from './UtregningPanel';
import VisningTilskuddsperioder from '@/AvtaleSide/steg/BeregningTilskudd/visningTilskuddsperioder/VisningTilskuddsperioder';

const cls = BEMHelper('beregningTilskuddSteg');

const feriepengeAlternativer = [0.12, 0.143, 0.102, 0.125].map((sats: number) => ({
    label: (sats * 100).toFixed(1) + ' %',
    value: sats.toString(),
}));

const arbeidsgiveravgiftAlternativer = (() => {
    const satser = [0.141, 0.106, 0.064, 0.051, 0.079, 0];
    const satserVerdier = [{ label: 'Velg', value: '' }];
    satser.forEach((sats: number) =>
        satserVerdier.push({
            label: (sats * 100).toFixed(1) + ' %',
            value: sats.toString(),
        })
    );
    return satserVerdier;
})();

const BeregningTilskuddSteg: FunctionComponent = () => {
    const innloggetBruker = useContext(InnloggetBrukerContext);
    const featureToggleContext = useContext(FeatureToggleContext);
    const visningAvKnappHentKontonummerForArbeidsgiver =
        featureToggleContext[Feature.VisningAvKnappHentKontonummerForArbeidsgiver];

    const {
        avtale,
        settOgKalkulerBeregningsverdier,
        lagreAvtale,
        settAvtaleInnholdVerdier: settAvtaleVerdier,
    } = useContext(AvtaleContext);

    return (
        <Innholdsboks utfyller="veileder_og_arbeidsgiver">
            <SkjemaTittel>Beregning av tilskudd</SkjemaTittel>
            {avtale.tiltakstype !== 'SOMMERJOBB' && <KvalifiseringsgruppeSats />}
            {avtale.tiltakstype === 'SOMMERJOBB' && <OppgiLonnstilskuddprosent />}
            <Heading size="small" className={cls.element('lonn-tittel')}>
                Lønn per måned i faktisk stillingsprosent inkludert faste tillegg
            </Heading>
            <LesMerPanel åpneLabel="Hva menes med dette?" lukkLabel="Lukk">
                <div>
                    Brutto lønn omregnes til fast gjennomsnittlig månedslønn. I refusjonsgrunnlaget inngår lønn for
                    arbeid utført i normalarbeidstiden inkludert faste tillegg. Overtidsbetaling og andre variable
                    tillegg skal ikke tas med. For deltidsstillinger skal lønn i den faktiske stillingsprosenten legges
                    inn. For eksempel hvis deltaker er ansatt i en 50 % stilling, skal det legges inn månedslønn i 50 %
                    stilling før skatt.
                </div>
                <VerticalSpacer rem={0.5} />
                <div>
                    Faste tillegg er knyttet til personlige egenskaper, evner eller ansvar og utbetales regelmessig ved
                    hver lønnsutbetaling. Beløpet er en fast størrelse og gjelder blant annet:
                </div>
                <div>
                    <VerticalSpacer rem={0.5} />
                    <ul>
                        <li>b-tillegg</li>
                        <li>stabiliseringstillegg</li>
                        <li>selektivt tillegg for sykepleiere</li>
                        <li>tillegg for ansvarsvakter, fagansvar og lederansvar</li>
                        <li>kvalifikasjons-/kompetansetillegg</li>
                    </ul>
                    <VerticalSpacer rem={0.5} />
                    Dette gjelder ikke:
                    <ul>
                        <li>skift-, turnus- og vakttillegg</li>
                        <li>offshoretillegg</li>
                    </ul>
                </div>
            </LesMerPanel>
            <VerticalSpacer rem={1} />
            <Row className="">
                <Column md="6">
                    <ValutaInput
                        name="manedslonn"
                        size="small"
                        label="Månedslønn før skatt"
                        autoComplete={'off'}
                        value={avtale.gjeldendeInnhold.manedslonn}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            settAvtaleVerdier({ manedslonn: parseFloat(event.target.value) });
                        }}
                        onBlur={(event) =>
                            settOgKalkulerBeregningsverdier({ manedslonn: parseFloat(event.target.value) })
                        }
                        min={0}
                    />
                </Column>
            </Row>
            <Row className="">
                <Column md="12">
                    <Heading size="small" className={cls.element('luft')}>
                        Feriepenger
                    </Heading>
                    <BodyShort size="small" className={cls.element('luft')}>
                        Velg sats for feriepenger som arbeidstaker skal ha
                    </BodyShort>
                    <RadioPanelGruppeHorisontal
                        radios={feriepengeAlternativer}
                        name="feriepengesats"
                        checked={avtale.gjeldendeInnhold.feriepengesats + ''}
                        legend=""
                        onChange={(event: React.SyntheticEvent<EventTarget>, verdi: string) => {
                            settOgKalkulerBeregningsverdier({ feriepengesats: parseFloat(verdi) });
                        }}
                    />
                    <VerticalSpacer rem={1.25} />
                    <Heading size="small">Obligatorisk tjenestepensjon</Heading>
                    <div style={{ display: 'flex', alignItems: 'baseline' }}>
                        {
                            <ProsentInput
                                name="tjenestepensjon"
                                bredde="S"
                                label={'Obligatorisk tjenestepensjon fra 0 - 30 %'}
                                min={0}
                                max={30}
                                maxLength={4}
                                autoComplete={'off'}
                                value={
                                    avtale.gjeldendeInnhold.otpSats !== undefined &&
                                    avtale.gjeldendeInnhold.otpSats !== null
                                        ? (avtale.gjeldendeInnhold.otpSats * 100).toFixed(2)
                                        : ''
                                }
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                    settOgKalkulerBeregningsverdier({
                                        otpSats:
                                            event.target.value === ''
                                                ? undefined
                                                : parseFloat(event.target.value) / 100,
                                    })
                                }
                            />
                        }
                    </div>
                    <VerticalSpacer rem={1.25} />
                    <Heading size="small">Arbeidsgiveravgift</Heading>
                    <SelectInput
                        name="arbeidsgiveravgift"
                        bredde="s"
                        options={arbeidsgiveravgiftAlternativer}
                        label="Sats for arbeidsgiveravgift"
                        children=""
                        value={avtale.gjeldendeInnhold.arbeidsgiveravgift}
                        onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                            settOgKalkulerBeregningsverdier({
                                arbeidsgiveravgift: parseFloatIfFloatable(event.target.value),
                            })
                        }
                    />
                    <VerticalSpacer rem={2} />
                    <Row className="" hidden={visningAvKnappHentKontonummerForArbeidsgiver}>
                        <Column md="12">
                            <KontonummerInput
                                bredde={'L'}
                                label={'Kontonummer til arbeidsgiver'}
                                value={avtale.gjeldendeInnhold.arbeidsgiverKontonummer}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    settAvtaleVerdier({ arbeidsgiverKontonummer: event.target.value });
                                }}
                                onBlur={() => lagreAvtale()}
                            />
                        </Column>
                    </Row>
                    <Row className="" hidden={!visningAvKnappHentKontonummerForArbeidsgiver}>
                        <Column md="1">
                            <Money />
                        </Column>
                        <Column md="11">
                            <BodyShort size="small">
                                <strong>Kontonummer: </strong>
                                {avtale.gjeldendeInnhold.arbeidsgiverKontonummer}
                            </BodyShort>
                            <BodyShort size="small">
                                Hvis kontonummeret ikke stemmer så må det oppdateres hos{' '}
                                <EksternLenke href="https://www.altinn.no/skjemaoversikt/arbeids--og-velferdsetaten-nav/bankkontonummer-for-refusjoner-fra-nav-til-arbeidsgiver/">
                                    Altinn.
                                </EksternLenke>
                            </BodyShort>
                        </Column>
                    </Row>
                    <Row className="" hidden={!visningAvKnappHentKontonummerForArbeidsgiver}>
                        <Column md="1" />
                        <Column md="10">
                            <LagreKnapp
                                label="Hent kontonummer fra Altinn"
                                lagre={async () => {
                                    const arbeidsgiverKontonummer = await hentKontonummerForArbeidsgiver(avtale.id);
                                    settAvtaleVerdier({ arbeidsgiverKontonummer });
                                }}
                            />
                        </Column>
                    </Row>
                    <VerticalSpacer rem={2} />
                    <UtregningPanel {...avtale.gjeldendeInnhold} tiltakstype={avtale.tiltakstype} />
                    <VerticalSpacer rem={1.25} />
                    {innloggetBruker.erNavAnsatt &&
                        avtale.gjeldendeInnhold.stillingprosent !== undefined &&
                        avtale.gjeldendeInnhold.stillingprosent > 0 &&
                        avtale.gjeldendeInnhold.stillingprosent < 100 && (
                            <ValutaInput
                                disabled={true}
                                name="manedslonn100%"
                                size="small"
                                label="Lønn ved 100% stilling"
                                value={avtale.gjeldendeInnhold.manedslonn100pst}
                            />
                        )}
                    <VerticalSpacer rem={2} />
                    <VisningTilskuddsperioder />
                    <VerticalSpacer rem={2} />
                    <LagreKnapp lagre={lagreAvtale} label={'Lagre'} suksessmelding={'Avtale lagret'} />
                </Column>
            </Row>
        </Innholdsboks>
    );
};

export default BeregningTilskuddSteg;
