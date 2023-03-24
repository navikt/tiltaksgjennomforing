import { AvtaleContext } from '@/AvtaleProvider';
import { Feature, FeatureToggleContext } from '@/FeatureToggleProvider';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import ProsentInput from '@/komponenter/form/ProsentInput';
import RadioPanelGruppeHorisontal from '@/komponenter/radiopanel/RadioPanelGruppeHorisontal';
import SelectInput from '@/komponenter/form/SelectInput';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import ValutaInput from '@/komponenter/form/ValutaInput';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import LesMerPanel from '@/komponenter/LesMerPanel/LesMerPanel';
import BEMHelper from '@/utils/bem';
import { parseFloatIfFloatable } from '@/utils/lonnstilskuddUtregningUtils';
import { Column, Row } from '@/komponenter/NavGrid/Grid';
import { BodyShort, Heading, Label } from '@navikt/ds-react';
import React, { FunctionComponent, useContext } from 'react';
import KvalifiseringsgruppeSats from './KvalifiseringsgruppeSats/KvalifiseringsgruppeSats';
import OppgiLonnstilskuddprosent from './OppgiLonnstilskuddprosent';
import UtregningPanel from './UtregningPanel';
import VisningTilskuddsperioder from '@/AvtaleSide/steg/BeregningTilskudd/visningTilskuddsperioder/VisningTilskuddsperioder';
import './BeregningTilskuddSteg.less';
import HenteKontonummer from '@/komponenter/form/henteKontornummer/HenteKontonummer';

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
            <LesMerPanel className={cls.element('lonn-per-mnd')} åpneLabel="Hva menes med dette?" lukkLabel="Lukk">
                <div className={cls.element('lonn-per-mnd-seksjon')}>
                    Brutto lønn omregnes til fast gjennomsnittlig månedslønn. I refusjonsgrunnlaget inngår lønn for
                    arbeid utført i normalarbeidstiden inkludert faste tillegg. Overtidsbetaling og andre variable
                    tillegg skal ikke tas med. For deltidsstillinger skal lønn i den faktiske stillingsprosenten legges
                    inn. For eksempel hvis deltaker er ansatt i en 50 % stilling, skal det legges inn månedslønn i 50 %
                    stilling før skatt.
                </div>

                <div className={cls.element('lonn-per-mnd-seksjon')}>
                    Faste tillegg er knyttet til personlige egenskaper, evner eller ansvar og utbetales regelmessig ved
                    hver lønnsutbetaling. Beløpet er en fast størrelse og gjelder blant annet:
                </div>
                <div className={cls.element('lonn-per-mnd-seksjon')}>
                    <ul>
                        <li>b-tillegg</li>
                        <li>stabiliseringstillegg</li>
                        <li>selektivt tillegg for sykepleiere</li>
                        <li>tillegg for ansvarsvakter, fagansvar og lederansvar</li>
                        <li>kvalifikasjons-/kompetansetillegg</li>
                    </ul>
                    Dette gjelder ikke:
                    <ul>
                        <li>skift-, turnus- og vakttillegg</li>
                        <li>offshoretillegg</li>
                    </ul>
                </div>
            </LesMerPanel>
            <Row className="">
                <Column md="6" className={cls.element('valuta-input')}>
                    <ValutaInput
                        className="input"
                        name="manedslonn"
                        size="medium"
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
                <Column md="12" className={cls.element('feriepenger')}>
                    <Label size="small">Feriepenger</Label>
                    <BodyShort size="small">Velg sats for feriepenger som arbeidstaker skal ha</BodyShort>
                    <RadioPanelGruppeHorisontal
                        radios={feriepengeAlternativer}
                        name="feriepengesats"
                        checked={avtale.gjeldendeInnhold.feriepengesats + ''}
                        legend=""
                        onChange={(event: React.SyntheticEvent<EventTarget>, verdi: string) => {
                            settOgKalkulerBeregningsverdier({ feriepengesats: parseFloat(verdi) });
                        }}
                    />
                </Column>
            </Row>
            <Row>
                <Column md="8" className={cls.element('tjenestepensjon')}>
                    <ProsentInput
                        name="tjenestepensjon"
                        label={'Obligatorisk tjenestepensjon fra 0 - 30 %'}
                        min={0}
                        max={30}
                        maxLength={4}
                        autoComplete={'off'}
                        value={
                            avtale.gjeldendeInnhold.otpSats !== undefined && avtale.gjeldendeInnhold.otpSats !== null
                                ? (avtale.gjeldendeInnhold.otpSats * 100).toFixed(2)
                                : ''
                        }
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            settOgKalkulerBeregningsverdier({
                                otpSats: event.target.value === '' ? undefined : parseFloat(event.target.value) / 100,
                            });
                        }}
                    />
                </Column>
            </Row>
            <Row className={cls.element('rad-arbeidsgiveravgift')}>
                <Column md="8" className={cls.element('arbeidsgiveravgift')}>
                    <SelectInput
                        name="arbeidsgiveravgift"
                        options={arbeidsgiveravgiftAlternativer}
                        label="Sats for arbeidsgiveravgift"
                        size="medium"
                        children=""
                        value={avtale.gjeldendeInnhold.arbeidsgiveravgift}
                        onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                            settOgKalkulerBeregningsverdier({
                                arbeidsgiveravgift: parseFloatIfFloatable(event.target.value),
                            })
                        }
                    />
                </Column>
            </Row>
            <Row className={cls.element('rad-kontonummer')}>
                <Column md="12" className={cls.element('kontonummer')}>
                    <HenteKontonummer
                        visningAvKnappHentKontonummerForArbeidsgiver={visningAvKnappHentKontonummerForArbeidsgiver}
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
        </Innholdsboks>
    );
};

export default BeregningTilskuddSteg;
