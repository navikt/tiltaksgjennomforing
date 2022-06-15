import { AvtaleContext } from '@/AvtaleProvider';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import BEMHelper from '@/utils/bem';
import { formatterDato, NORSK_DATO_FORMAT } from '@/utils/datoUtils';
import { formatterPenger } from '@/utils/PengeUtils';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Element, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import React, { FunctionComponent, useContext } from 'react';
import './visningTilskuddsperioder.less';

const VisningTilskuddsperioder: FunctionComponent = () => {
    const innloggetBruker = useContext(InnloggetBrukerContext);
    const { avtale } = useContext(AvtaleContext);
    const cls = BEMHelper('visning-tilskuddsperioder');

    if (avtale.tilskuddPeriode.length === 0) {
        return null;
    }

    return (
        <div className={cls.className}>
            <Ekspanderbartpanel tittel="Oversikt over tilskudd i perioder" apen={true}>
                <div className={cls.element('container')}>
                    <div className={cls.element('header')}>
                        <Element>Utregning</Element>
                        <Normaltekst>
                            Utregningen baserer seg på lønn for en måned. Dagsatsen får du ved å dele "sum tilskudd for
                            en måned" på snitt antall dager i en måned (365,25 / 12 = 30,4375) og ganger med antall
                            dager i perioden.
                        </Normaltekst>
                        {avtale.gjeldendeInnhold.datoForRedusertProsent && (
                            <>
                                <VerticalSpacer rem={1} />
                                <Element>Reduksjon av tilskuddsprosent</Element>
                                <Normaltekst>
                                    Tilskuddsprosenten reduseres med 10% etter{' '}
                                    {avtale.gjeldendeInnhold.lonnstilskuddProsent === 60 ? '1 år' : '6 måneder'}. Datoen
                                    for ny redusert sats er{' '}
                                    <b>
                                        {formatterDato(
                                            avtale.gjeldendeInnhold.datoForRedusertProsent,
                                            NORSK_DATO_FORMAT
                                        )}
                                    </b>
                                    .
                                </Normaltekst>
                            </>
                        )}
                    </div>
                    <div className={cls.element('tabell')}>
                        <div className={cls.element('tabell-ingress')}>
                            <Element>Tilskudd for periode</Element>
                            <Element>Tilskuddsprosent</Element>
                            <Element>Inntil</Element>
                        </div>
                        {avtale.tilskuddPeriode
                            .filter((p) => p.aktiv)
                            .map((periode, index) => {
                                const nyProsent =
                                    index > 0
                                        ? avtale.tilskuddPeriode[index - 1].lonnstilskuddProsent !==
                                          periode.lonnstilskuddProsent
                                        : false;
                                if (index < 12 || index === avtale.tilskuddPeriode.length -1) {
                                    return (
                                        <>
                                            { avtale.tilskuddPeriode.length > 12 && index === avtale.tilskuddPeriode.length -1 &&
                                                <div
                                                    key={index}
                                                    className={cls.element('tabell-innslag')}
                                                    >...</div>
                                                }
                                            <div
                                                key={index}
                                                className={cls.element('tabell-innslag')}
                                                style={{ borderTop: nyProsent ? '2px solid gray' : 'undefined' }}
                                            >
                                                <Normaltekst>
                                                    {formatterDato(periode.startDato, NORSK_DATO_FORMAT)} -{' '}
                                                    {formatterDato(periode.sluttDato, NORSK_DATO_FORMAT)}
                                                </Normaltekst>
                                                <Normaltekst>{periode.lonnstilskuddProsent}%</Normaltekst>
                                                <Normaltekst style={{ minWidth: '4rem' }}>
                                                    {formatterPenger(periode.beløp)}
                                                </Normaltekst>
                                            </div>
                                        </>
                                    );
                                }
                            })}
                        {avtale.gjeldendeInnhold.startDato && avtale.gjeldendeInnhold.sluttDato &&
                            <div className={cls.element('tabell-innslag')} >
                                Avtalen varer fra {formatterDato(avtale.gjeldendeInnhold.startDato, NORSK_DATO_FORMAT)} til {formatterDato(avtale.gjeldendeInnhold.sluttDato, NORSK_DATO_FORMAT)}. Det tilsvarer {avtale.tilskuddPeriode.length} tilskuddsperioder.
                            </div>
                        }
                    </div>
                    <VerticalSpacer rem={1} />
                    {innloggetBruker.rolle === 'ARBEIDSGIVER' && (
                        <>
                            <Undertittel>Refusjon</Undertittel>
                            <VerticalSpacer rem={1} />
                            <Normaltekst>
                                Som arbeidsgiver må du søke om refusjon. Du kan først søke etter at perioden er over.
                                Når tiltaket er over, vil NAV sende dere et ferdig utregnet forslag til refusjon.
                                Refusjonen regnes ut på bakgrunn av innhold i avtalen og innrapporterte inntekter i
                                A-meldingen.
                            </Normaltekst>
                            <VerticalSpacer rem={1} />
                            <Element>
                                Du kan søke om refusjon fra{' '}
                                {formatterDato(avtale.tilskuddPeriode[0].sluttDato, NORSK_DATO_FORMAT)}
                            </Element>
                        </>
                    )}
                    <VerticalSpacer rem={1} />
                </div>
            </Ekspanderbartpanel>
        </div>
    );
};
export default VisningTilskuddsperioder;
