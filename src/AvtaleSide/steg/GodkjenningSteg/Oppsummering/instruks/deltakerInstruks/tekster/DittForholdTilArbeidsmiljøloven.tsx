import React, { FunctionComponent } from 'react';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import IkonTekstRad from '@/komponenter/EkspanderbartPanelRad/IkonTekstRad';
import RettighetsHammerIkon from '@/assets/ikoner/lov.svg?react';
import { TiltaksType } from '@/types/avtale';

interface Props {
    tiltakstype: TiltaksType;
}

const DittForholdTilArbeidsmiljLoven: FunctionComponent<Props> = ({ tiltakstype }) => {
    if (['MENTOR', 'INKLUDERINGSTILSKUDD'].includes(tiltakstype)) {
        return null;
    }

    return (
        <>
            <VerticalSpacer rem={2} />
            <IkonTekstRad
                svgIkon={<RettighetsHammerIkon />}
                headerTekst={{
                    tekst: 'Ditt forhold til arbeidsmiljøloven',
                }}
            >
                <VerticalSpacer rem={0.5} />
                {tiltakstype === 'ARBEIDSTRENING' && (
                    <>
                        Når du deltar på arbeidstrening regnes du som en vanlig ansatt, som vil si at din arbeidsgiver
                        må følge de fleste av arbeidsmiljølovens regler. Arbeidsgiver må også forsikre deg og
                        arbeidsgiver har et ansvar for deg hvis du blir skadet på jobb.
                    </>
                )}
                {(tiltakstype === 'SOMMERJOBB' ||
                    tiltakstype === 'MIDLERTIDIG_LONNSTILSKUDD' ||
                    tiltakstype === 'VARIG_LONNSTILSKUDD') && (
                    <>
                        Når du deltar på tiltak med lønnstilskudd er du en vanlig ansatt, som vil si at din arbeidsgiver
                        må følge arbeidsmiljølovens regler. Arbeidsgiver må også forsikre deg og arbeidsgiver har et
                        ansvar for deg hvis du blir skadet på jobb.
                    </>
                )}
            </IkonTekstRad>
        </>
    );
};
export default DittForholdTilArbeidsmiljLoven;
