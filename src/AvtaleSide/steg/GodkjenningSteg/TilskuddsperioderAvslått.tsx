import React, { FunctionComponent, useContext } from 'react';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import { AvtaleContext } from '@/AvtaleProvider';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import { ReactComponent as ProblemIkon } from '@/assets/ikoner/varsel.svg';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { formatterDato, NORSK_DATO_OG_TID_FORMAT } from '@/utils/datoUtils';
import { tilskuddsperiodeAvslagTekst } from '@/messages';

const TilskuddsperioderAvslått: FunctionComponent = () => {
    const avtaleContext = useContext(AvtaleContext);
    const gjeldendeTilskuddsperiode = avtaleContext.avtale.gjeldendeTilskuddsperiode;
    if (!gjeldendeTilskuddsperiode) {
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
                    <Innholdstittel>Tilskuddsperiode avslått av beslutter</Innholdstittel>
                </div>
            </div>
            <VerticalSpacer rem={2} />
            <Normaltekst>
                Tilskuddsperioden ble avslått av <b>{gjeldendeTilskuddsperiode.avslåttAvNavIdent}</b> den{' '}
                {formatterDato(gjeldendeTilskuddsperiode.avslåttTidspunkt!, NORSK_DATO_OG_TID_FORMAT)} med følgende
                årsak(er):
                <ul>
                    {Array.from(gjeldendeTilskuddsperiode.avslagsårsaker).map(årsak => (
                        <li>{tilskuddsperiodeAvslagTekst[årsak]}</li>
                    ))}
                </ul>
                med forklaringen: {gjeldendeTilskuddsperiode.avslagsforklaring}
            </Normaltekst>
            <VerticalSpacer rem={1} />
            <Normaltekst>Gjør de nødvendige endringene på avtalen og send tilbake til beslutter.</Normaltekst>
            <VerticalSpacer rem={1} />
            <hr />
            <VerticalSpacer rem={1} />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <LagreKnapp lagre={avtaleContext.sendTilbakeTilBeslutter} label={'Send tilbake til beslutter'} />
            </div>
        </Innholdsboks>
    );
};

export default TilskuddsperioderAvslått;
