import React, { FunctionComponent } from 'react';
import IkonTekstRad from '@/komponenter/EkspanderbartPanelRad/IkonTekstRad';
import { Bandage } from '@navikt/ds-icons';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { TiltaksType } from '@/types/avtale';

interface Props {
    tiltakstype: TiltaksType;
}

const GiBeskjedHvisDuErBorteFraJobb: FunctionComponent<Props> = ({ tiltakstype }) => {
    if (['MENTOR', 'INKLUDERINGSTILSKUDD'].includes(tiltakstype)) return null;

    return (
        <>
            {tiltakstype === 'VTAO' ? (
                <IkonTekstRad
                    svgIkon={<Bandage width="2.25rem" height="2.25rem" />}
                    headerTekst={{
                        tekst: 'Fravær',
                    }}
                >
                    <VerticalSpacer rem={0.5} />
                    Som ansatt må du melde fra til arbeidsgiver ved fravær.
                </IkonTekstRad>
            ) : (
                <IkonTekstRad
                    svgIkon={<Bandage width="2.25rem" height="2.25rem" />}
                    headerTekst={{
                        tekst: 'Gi beskjed hvis du er borte fra jobb',
                    }}
                >
                    <VerticalSpacer rem={0.5} />
                    Du må melde fra til arbeidsgiver ved fravær. Ved egen eller barns sykdom gjelder ordinære regler for
                    bruk av egenmelding også for deg som er på {tiltakstype === 'ARBEIDSTRENING' && 'arbeidstrening'}
                    {(tiltakstype === 'MIDLERTIDIG_LONNSTILSKUDD' || tiltakstype === 'VARIG_LONNSTILSKUDD') &&
                        'tiltak med lønnstilskudd'}
                    {tiltakstype === 'SOMMERJOBB' && 'tiltak med tilskudd til sommerjobb'}.
                </IkonTekstRad>
            )}
        </>
    );
};
export default GiBeskjedHvisDuErBorteFraJobb;
