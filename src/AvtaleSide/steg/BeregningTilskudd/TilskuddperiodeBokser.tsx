import React, { FunctionComponent, useContext } from 'react';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { Element, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { formatterDato, formatterPeriode, NORSK_DATO_FORMAT } from '@/utils/datoUtils';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import { AvtaleContext } from '@/AvtaleProvider';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { formatterPenger } from '@/utils/PengeUtils';

const TilskuddperiodeBokser: FunctionComponent = () => {
    const innloggetBruker = useContext(InnloggetBrukerContext);
    const { avtale } = useContext(AvtaleContext);

    if (avtale.tilskuddPeriode.length === 0) {
        return null;
    }

    return (
        <>
            {avtale.tilskuddPeriode
                .filter(tp => tp.aktiv)
                .map(periode => (
                    <>
                        <Ekspanderbartpanel
                            tittel={
                                <Element>
                                    Tilskudd for periode {formatterPeriode(periode.startDato, periode.sluttDato)}
                                </Element>
                            }
                            apen={periode.løpenummer === 1}
                        >
                            <Normaltekst>
                                Utregningen baserer seg på lønn for en måned. Dagsatsen får du ved å dele "sum tilskudd
                                for en måned" på snitt antall dager i en måned (30,43) og ganger med antall dager i
                                perioden.
                            </Normaltekst>
                            <VerticalSpacer rem={2} />
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Normaltekst>{formatterPeriode(periode.startDato, periode.sluttDato)}</Normaltekst>
                                <Element>Inntil {formatterPenger(periode.beløp)}</Element>
                            </div>
                        </Ekspanderbartpanel>
                        <VerticalSpacer rem={1} />
                    </>
                ))}
            <VerticalSpacer rem={2} />
            {innloggetBruker.rolle === 'ARBEIDSGIVER' && (
                <>
                    <Undertittel>Refusjon</Undertittel>
                    <VerticalSpacer rem={1} />
                    <Normaltekst>
                        Som arbeidsgiver må du søke om refusjon. Du kan først søke etter at perioden er over. Når
                        tiltaket er over, vil NAV sende dere et ferdig utregnet forslag til refusjon. Refusjonen regnes
                        ut på bakgrunn av innhold i avtalen og innrapporterte inntekter i A-meldingen.
                    </Normaltekst>
                    <VerticalSpacer rem={1} />
                    <Element>
                        Du kan søke om refusjon fra{' '}
                        {formatterDato(avtale.tilskuddPeriode[0].sluttDato, NORSK_DATO_FORMAT)}
                    </Element>
                </>
            )}
        </>
    );
};

export default TilskuddperiodeBokser;
