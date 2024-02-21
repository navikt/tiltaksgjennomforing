import React, { FunctionComponent, useContext } from 'react';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import { AvtaleContext } from '@/AvtaleProvider';
import { Accordion, Alert, BodyShort, Heading } from '@navikt/ds-react';
import ProblemIkon from '@/assets/ikoner/varsel.svg?react';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { formatterDato, NORSK_DATO_OG_TID_FORMAT } from '@/utils/datoUtils';
import { tilskuddsperiodeAvslagTekst } from '@/messages';
import { Avslagsårsaker, TilskuddsPeriode } from '@/types/avtale';
import { interleave } from '@/utils/arrayUtils';

const avslåttBegrunnelse = (avslåttTilskuddsperiode: TilskuddsPeriode) => {
    const avslagsårsaker = Array.from(avslåttTilskuddsperiode.avslagsårsaker);

    return (
        <div key={avslåttTilskuddsperiode.id}>
            <b>{formatterDato(avslåttTilskuddsperiode.avslåttTidspunkt!, NORSK_DATO_OG_TID_FORMAT)}:</b> Avslått av{' '}
            {avslåttTilskuddsperiode.avslåttAvNavIdent} med følgende årsak{avslagsårsaker.length > 1 ? 'er' : ''}:
            <ul>
                {avslagsårsaker.map((årsak: Avslagsårsaker, index: number) => (
                    <li key={index}>{tilskuddsperiodeAvslagTekst[årsak]}</li>
                ))}
            </ul>
            med forklaringen: {avslåttTilskuddsperiode.avslagsforklaring}
        </div>
    );
};

const TilskuddsperioderAvslått: FunctionComponent = (_props) => {
    const { avtale } = useContext(AvtaleContext);
    const gjeldendeAvslåtteTilskuddsperiode =
        avtale.gjeldendeTilskuddsperiode?.status === 'AVSLÅTT' ? avtale.gjeldendeTilskuddsperiode : undefined;

    const avslåtteTilskuddsperioder = avtale.tilskuddPeriode
        // Filtrer vekk gjendelde periode fra listen; denne skal vises på toppen av dialogvinduet hvis den er relevant.
        .filter((p) => p.status === 'AVSLÅTT' && p.id !== gjeldendeAvslåtteTilskuddsperiode?.id)
        .sort((a: TilskuddsPeriode, b: TilskuddsPeriode) => {
            if (a.avslåttTidspunkt && b.avslåttTidspunkt) {
                const aTime = new Date(a.avslåttTidspunkt).getMilliseconds();
                const bTime = new Date(b.avslåttTidspunkt).getMilliseconds();
                return bTime - aTime;
            }
            return 0;
        });

    if (!gjeldendeAvslåtteTilskuddsperiode && avslåtteTilskuddsperioder.length === 0) {
        return null;
    }

    return (
        <Innholdsboks>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <div>
                    <ProblemIkon style={{ width: '40px', height: '40px' }} />
                </div>
                <VerticalSpacer rem={1} />
                <div>
                    <Heading size="large">
                        {gjeldendeAvslåtteTilskuddsperiode
                            ? 'Tilskuddsperiode avslått av beslutter'
                            : 'Venter på godkjenning fra beslutter'}
                    </Heading>
                </div>
            </div>
            <VerticalSpacer rem={2} />
            {gjeldendeAvslåtteTilskuddsperiode ? (
                <>
                    <BodyShort size="small">
                        Gjør du endringer på avtalen vil beslutter kunne godkjenne tilskuddsperioden på nytt. Hvis
                        avtalen allikevel er riktig utfylt kan den sendes tilbake til beslutter uendret.
                    </BodyShort>
                    <VerticalSpacer rem={1} />
                    <Alert variant="info">{avslåttBegrunnelse(gjeldendeAvslåtteTilskuddsperiode)}</Alert>
                </>
            ) : (
                <BodyShort size="small">
                    Beslutter har nå muligheten til å godkjenne tilskuddsperioden. Du kan gjøre flere endringer om det
                    er nødvendig før beslutter godkjenner.
                </BodyShort>
            )}
            {avslåtteTilskuddsperioder.length > 0 ? (
                <>
                    <VerticalSpacer rem={1} />
                    <Accordion>
                        <Accordion.Item>
                            <Accordion.Header>Vis tidligere avslåtte tilskuddsperioder</Accordion.Header>
                            <Accordion.Content>
                                {interleave(
                                    avslåtteTilskuddsperioder.map(avslåttBegrunnelse),
                                    avslåtteTilskuddsperioder.map((_x, idx) => <VerticalSpacer key={idx} rem={1} />),
                                )
                                    // Fjerner siste spacingen
                                    .slice(0, -1)}
                            </Accordion.Content>
                        </Accordion.Item>
                    </Accordion>
                </>
            ) : undefined}
        </Innholdsboks>
    );
};

export default TilskuddsperioderAvslått;
