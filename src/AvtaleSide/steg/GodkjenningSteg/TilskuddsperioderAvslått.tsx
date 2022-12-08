import React, { FunctionComponent, useContext } from 'react';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import { AvtaleContext } from '@/AvtaleProvider';
import { BodyShort, Heading } from '@navikt/ds-react';
import { ReactComponent as ProblemIkon } from '@/assets/ikoner/varsel.svg';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { formatterDato, NORSK_DATO_FORMAT } from '@/utils/datoUtils';
import { tilskuddsperiodeAvslagTekst } from '@/messages';
import LesMerPanel from '@/komponenter/LesMerPanel/LesMerPanel';
import { Avslagsårsaker } from '@/types/avtale';

const TilskuddsperioderAvslått: FunctionComponent = (props) => {
    const { avtale } = useContext(AvtaleContext);
    const gjeldendeTilskuddsperiodeAvslått = avtale.gjeldendeTilskuddsperiode?.status === 'AVSLÅTT';
    const avslåttTilskuddsperiode = avtale.tilskuddPeriode.find(
        (t) => t.status === 'AVSLÅTT' && avtale.gjeldendeTilskuddsperiode?.løpenummer
    );
    if (!avslåttTilskuddsperiode) {
        return null;
    }

    const avslåttBegrunnelse = (
        <>
            Tilskuddsperioden ble avslått av {avslåttTilskuddsperiode.avslåttAvNavIdent} den{' '}
            {formatterDato(avslåttTilskuddsperiode.avslåttTidspunkt!, NORSK_DATO_FORMAT)} med følgende årsak(er):
            <ul>
                {Array.from(avslåttTilskuddsperiode.avslagsårsaker).map((årsak: Avslagsårsaker, index: number) => (
                    <li key={index}>{tilskuddsperiodeAvslagTekst[årsak]}</li>
                ))}
            </ul>
            med forklaringen: {avslåttTilskuddsperiode.avslagsforklaring}
        </>
    );

    return (
        <Innholdsboks>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <div>
                    <ProblemIkon style={{ width: '40px', height: '40px' }} />
                </div>
                <VerticalSpacer rem={1} />
                <div>
                    <Heading size="large">
                        {gjeldendeTilskuddsperiodeAvslått
                            ? 'Tilskuddsperiode avslått av beslutter'
                            : 'Venter på godkjenning fra beslutter'}
                    </Heading>
                </div>
            </div>
            <VerticalSpacer rem={2} />
            {gjeldendeTilskuddsperiodeAvslått ? (
                <>
                    {avslåttBegrunnelse}
                    <VerticalSpacer rem={1} />
                    <BodyShort size="small">
                        Gjør du endringer på avtalen vil beslutter kunne godkjenne tilskuddsperioden på nytt. Hvis
                        avtalen allikevel er riktig utfylt kan den sendes tilbake til beslutter uendret.
                    </BodyShort>
                    <VerticalSpacer rem={1} />
                </>
            ) : (
                <>
                    <BodyShort size="small">
                        Beslutter har nå muligheten til å godkjenne tilskuddsperioden. Du kan gjøre flere endringer om
                        det er nødvendig før beslutter godkjenner.
                    </BodyShort>
                    <VerticalSpacer rem={1} />
                    <LesMerPanel
                        åpneLabel="Vis begrunnelse på tidligere avslått tilskuddsperiode"
                        lukkLabel="Skjul begrunnelse på tidligere avslått tilskuddsperiode"
                    >
                        {avslåttBegrunnelse}
                    </LesMerPanel>
                </>
            )}
        </Innholdsboks>
    );
};

export default TilskuddsperioderAvslått;
