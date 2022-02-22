import React, { FunctionComponent, useContext } from 'react';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import { AvtaleContext } from '@/AvtaleProvider';
import { Normaltekst, Element, Undertittel } from 'nav-frontend-typografi';
import BEMHelper from '@/utils/bem';
import './visningTilskuddsperioder.less';
import { formatterDato, NORSK_DATO_FORMAT } from '@/utils/datoUtils';
import { formatterPenger } from '@/utils/PengeUtils';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';

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
                        <Normaltekst>
                            Utregningen baserer seg på lønn for en måned. Dagsatsen får du ved å dele "sum tilskudd for
                            en måned" på snitt antall dager i en måned (365,25 / 12 = 30,4375) og ganger med antall
                            dager i perioden.
                        </Normaltekst>
                    </div>
                    <div className={cls.element('tabell')}>
                        <div className={cls.element('tabell-ingress')}>
                            <Element>Tilskudd for periode</Element>
                            <Element>Inntil</Element>
                        </div>
                        {avtale.tilskuddPeriode
                            .filter((p) => p.aktiv)
                            .map((periode, index) => (
                                <div key={index} className={cls.element('tabell-innslag')}>
                                    <Normaltekst>
                                        {formatterDato(periode.startDato, NORSK_DATO_FORMAT)} -{' '}
                                        {formatterDato(periode.sluttDato, NORSK_DATO_FORMAT)}
                                    </Normaltekst>
                                    <Normaltekst>{formatterPenger(periode.beløp)}</Normaltekst>
                                </div>
                            ))}
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
