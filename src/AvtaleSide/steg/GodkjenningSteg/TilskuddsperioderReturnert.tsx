import React, { FunctionComponent, useContext } from 'react';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import { AvtaleContext } from '@/AvtaleProvider';
import { Accordion, Alert, BodyShort, Heading } from '@navikt/ds-react';
import ProblemIkon from '@/assets/ikoner/varsel.svg?react';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { formatterDato, NORSK_DATO_OG_TID_FORMAT } from '@/utils/datoUtils';
import { tilskuddsperiodeReturÅrsakTekst } from '@/messages';
import { Returårsaker, TilskuddsPeriode } from '@/types/avtale';
import { interleave } from '@/utils/arrayUtils';

const avslåttBegrunnelse = (avslåttTilskuddsperiode: TilskuddsPeriode) => {
    const avslagsårsaker = Array.from(avslåttTilskuddsperiode.avslagsårsaker);

    return (
        <div key={avslåttTilskuddsperiode.id}>
            <b>{formatterDato(avslåttTilskuddsperiode.avslåttTidspunkt!, NORSK_DATO_OG_TID_FORMAT)}:</b> Returnert av{' '}
            {avslåttTilskuddsperiode.avslåttAvNavIdent} med følgende årsak{avslagsårsaker.length > 1 ? 'er' : ''}:
            <ul>
                {avslagsårsaker.map((årsak: Returårsaker, index: number) => (
                    <li key={index}>{tilskuddsperiodeReturÅrsakTekst[årsak]}</li>
                ))}
            </ul>
            med forklaringen: {avslåttTilskuddsperiode.avslagsforklaring}
        </div>
    );
};

const TilskuddsperioderReturnert: FunctionComponent = (_props) => {
    const { avtale } = useContext(AvtaleContext);
    const gjeldendeReturnerteTilskuddsperiode =
        avtale.gjeldendeTilskuddsperiode?.status === 'AVSLÅTT' ? avtale.gjeldendeTilskuddsperiode : undefined;

    const returnerteTilskuddsperioder = avtale.tilskuddPeriode
        // Filtrer vekk gjendelde periode fra listen; denne skal vises på toppen av dialogvinduet hvis den er relevant.
        .filter((p) => p.status === 'AVSLÅTT' && p.id !== gjeldendeReturnerteTilskuddsperiode?.id)
        .sort((a: TilskuddsPeriode, b: TilskuddsPeriode) => {
            if (a.avslåttTidspunkt && b.avslåttTidspunkt) {
                const aTime = new Date(a.avslåttTidspunkt).getMilliseconds();
                const bTime = new Date(b.avslåttTidspunkt).getMilliseconds();
                return bTime - aTime;
            }
            return 0;
        });

    if (!gjeldendeReturnerteTilskuddsperiode && returnerteTilskuddsperioder.length === 0) {
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
                        {gjeldendeReturnerteTilskuddsperiode
                            ? 'Tilskuddsperiode returnert av beslutter'
                            : 'Venter på godkjenning fra beslutter'}
                    </Heading>
                </div>
            </div>
            <VerticalSpacer rem={2} />
            {gjeldendeReturnerteTilskuddsperiode ? (
                <>
                    <BodyShort size="small">
                        Gjør du endringer på avtalen vil beslutter kunne godkjenne tilskuddsperioden på nytt. Hvis
                        avtalen allikevel er riktig utfylt kan den sendes tilbake til beslutter uendret.
                    </BodyShort>
                    <VerticalSpacer rem={1} />
                    <Alert variant="info">{avslåttBegrunnelse(gjeldendeReturnerteTilskuddsperiode)}</Alert>
                </>
            ) : (
                <BodyShort size="small">
                    Beslutter har nå muligheten til å godkjenne tilskuddsperioden. Du kan gjøre flere endringer om det
                    er nødvendig før beslutter godkjenner.
                </BodyShort>
            )}
            {returnerteTilskuddsperioder.length > 0 ? (
                <>
                    <VerticalSpacer rem={1} />
                    <Accordion>
                        <Accordion.Item>
                            <Accordion.Header>Vis tidligere returnerte tilskuddsperioder</Accordion.Header>
                            <Accordion.Content>
                                {interleave(
                                    returnerteTilskuddsperioder.map(avslåttBegrunnelse),
                                    returnerteTilskuddsperioder.map((_x, idx) => <VerticalSpacer key={idx} rem={1} />),
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

export default TilskuddsperioderReturnert;
