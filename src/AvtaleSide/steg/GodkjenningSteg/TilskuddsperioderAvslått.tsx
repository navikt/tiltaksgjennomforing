import React, { FunctionComponent, useContext } from 'react';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import { AvtaleContext } from '@/AvtaleProvider';
import { BodyShort, Heading } from '@navikt/ds-react';
import { ReactComponent as ProblemIkon } from '@/assets/ikoner/varsel.svg';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { formatterDato, NORSK_DATO_OG_TID_FORMAT } from '@/utils/datoUtils';
import { tilskuddsperiodeAvslagTekst } from '@/messages';
import LesMerPanel from '@/komponenter/LesMerPanel/LesMerPanel';
import { Avslagsårsaker, TilskuddsPeriode } from '@/types/avtale';

const avslåttBegrunnelse = (avslåttTilskuddsperiode: TilskuddsPeriode) => (
    <div key={avslåttTilskuddsperiode.id}>
        Tilskuddsperioden ble avslått av {avslåttTilskuddsperiode.avslåttAvNavIdent} den{' '}
        {formatterDato(avslåttTilskuddsperiode.avslåttTidspunkt!, NORSK_DATO_OG_TID_FORMAT)} med følgende årsak(er):
        <ul>
            {Array.from(avslåttTilskuddsperiode.avslagsårsaker).map((årsak: Avslagsårsaker, index: number) => (
                <li key={index}>{tilskuddsperiodeAvslagTekst[årsak]}</li>
            ))}
        </ul>
        med forklaringen: {avslåttTilskuddsperiode.avslagsforklaring}
    </div>
);

const TilskuddsperioderAvslått: FunctionComponent = (_props) => {
    const { avtale } = useContext(AvtaleContext);
    const gjeldendeAvslåtteTilskuddsperiode = avtale.gjeldendeTilskuddsperiode?.status === 'AVSLÅTT' ?
        avtale.gjeldendeTilskuddsperiode : undefined;

    const avslåtteTilskuddsperioder = avtale.tilskuddPeriode
        // Filtrer vekk gjendelde periode fra listen; denne skal vises på toppen av dialogvinduet hvis den er relevant.
        .filter(p => p.status === 'AVSLÅTT' && p.id !== gjeldendeAvslåtteTilskuddsperiode?.id)
        .sort((a: TilskuddsPeriode, b: TilskuddsPeriode) => {
            if (a.avslåttTidspunkt && b.avslåttTidspunkt) {
                const aTime = new Date(a.avslåttTidspunkt).getMilliseconds()
                const bTime = new Date(b.avslåttTidspunkt).getMilliseconds()
                return (bTime - aTime);
            }
            return 0
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
                    {avslåttBegrunnelse(gjeldendeAvslåtteTilskuddsperiode)}
                    <VerticalSpacer rem={1} />
                    <BodyShort size="small">
                        Gjør du endringer på avtalen vil beslutter kunne godkjenne tilskuddsperioden på nytt. Hvis
                        avtalen allikevel er riktig utfylt kan den sendes tilbake til beslutter uendret.
                    </BodyShort>

                </>
            ) : (
                <BodyShort size="small">
                    Beslutter har nå muligheten til å godkjenne tilskuddsperioden. Du kan gjøre flere endringer om
                    det er nødvendig før beslutter godkjenner.
                </BodyShort>
            )}
            {avslåtteTilskuddsperioder.length > 0 ?
                <>
                    <VerticalSpacer rem={1} />
                    <LesMerPanel
                        åpneLabel="Vis begrunnelse på tidligere avslåtte tilskuddsperioder"
                        lukkLabel="Skjul begrunnelse på tidligere avslåtte tilskuddsperioder"
                    >
                        {avslåtteTilskuddsperioder.map(avslåttBegrunnelse)}
                    </LesMerPanel>
                </>
                : undefined
            }

        </Innholdsboks>
    );
};

export default TilskuddsperioderAvslått;
