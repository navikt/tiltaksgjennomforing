import React, { FunctionComponent, useContext } from 'react';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { BodyShort, Heading, Label } from '@navikt/ds-react';
import { formatterDato, formatterPeriode, NORSK_DATO_FORMAT } from '@/utils/datoUtils';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import { AvtaleContext } from '@/AvtaleProvider';
import { formatterPenger } from '@/utils/PengeUtils';

import { Accordion } from '@navikt/ds-react';

const TilskuddperiodeBokser: FunctionComponent = () => {
    const innloggetBruker = useContext(InnloggetBrukerContext);
    const { avtale } = useContext(AvtaleContext);

    if (avtale.tilskuddPeriode.length === 0) {
        return null;
    }

    return (
        <>
            {avtale.tilskuddPeriode
                .filter((tp) => tp.aktiv)
                .map((periode, index) => (
                    <React.Fragment key={index}>
                        <Accordion className="accordion">
                            <Accordion.Item open={periode.løpenummer === 1}>
                                <Accordion.Header>
                                    <Label>
                                        Tilskudd for periode {formatterPeriode(periode.startDato, periode.sluttDato)}
                                    </Label>
                                </Accordion.Header>
                                <Accordion.Content>
                                    {avtale.tiltakstype === 'VTAO' ? (
                                        <BodyShort size="small">
                                            Dagsatsen får du ved å dele "sum tilskudd for en måned" på snitt antall
                                            dager i en måned (365,25 / 12 = 30,4375) og ganger med antall dager i
                                            perioden.
                                        </BodyShort>
                                    ) : (
                                        <BodyShort size="small">
                                            Utregningen baserer seg på lønn for en måned. Dagsatsen får du ved å dele
                                            "sum tilskudd for en måned" på snitt antall dager i en måned (365,25 / 12 =
                                            30,4375) og ganger med antall dager i perioden.
                                        </BodyShort>
                                    )}
                                    <VerticalSpacer rem={2} />
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <BodyShort size="small">
                                            {formatterPeriode(periode.startDato, periode.sluttDato)}
                                        </BodyShort>
                                        <Label>Inntil {formatterPenger(periode.beløp)}</Label>
                                    </div>
                                </Accordion.Content>
                            </Accordion.Item>
                        </Accordion>
                        <VerticalSpacer rem={1} />
                    </React.Fragment>
                ))}
            <VerticalSpacer rem={2} />
            {innloggetBruker.rolle === 'ARBEIDSGIVER' && (
                <>
                    <Heading size="small">Refusjon</Heading>
                    <VerticalSpacer rem={1} />
                    <BodyShort size="small">
                        Som arbeidsgiver må du søke om refusjon. Du kan først søke etter at perioden er over. Når
                        tiltaket er over, vil NAV sende dere et ferdig utregnet forslag til refusjon. Refusjonen regnes
                        ut på bakgrunn av innhold i avtalen og innrapporterte inntekter i A-meldingen.
                    </BodyShort>
                    <VerticalSpacer rem={1} />
                    <Label>
                        Du kan søke om refusjon fra{' '}
                        {formatterDato(avtale.tilskuddPeriode[0].sluttDato, NORSK_DATO_FORMAT)}
                    </Label>
                </>
            )}
        </>
    );
};

export default TilskuddperiodeBokser;
