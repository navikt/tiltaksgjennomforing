import React, { FunctionComponent } from 'react';
import IkonTekstRad from '@/komponenter/EkspanderbartPanelRad/IkonTekstRad';
import { CalendarIcon } from '@navikt/aksel-icons';
import EksternLenke from '@/komponenter/navigation/EksternLenke';
import { TiltaksType } from '@/types/avtale';

interface Props {
    tiltakstype: TiltaksType;
    eksternLenke: string;
}

const OppfolgingOgVarighet: FunctionComponent<Props> = ({ tiltakstype, eksternLenke }) => {
    if (!['MIDLERTIDIG_LONNSTILSKUDD', 'SOMMERJOBB', 'MENTOR', 'INKLUDERINGSTILSKUDD', 'VTAO'].includes(tiltakstype)) {
        return null;
    }
    return (
        <IkonTekstRad
            svgIkon={<CalendarIcon title="Oppfølging og varighet" />}
            headerTekst={{ tekst: 'Oppfølging og varighet', headingType: 'small' }}
        >
            <p>
                Tilskuddet reguleres av forskrift for arbeidsmarkedstiltak. Som arbeidsgiver skal dere følge opp
                arbeidstaker i det daglige arbeidet og påse at arbeidet er i tråd med avtalen som er inngått. Varigheten
                på tiltaket skal vurderes ut fra arbeidstakerens behov.
            </p>
        </IkonTekstRad>
    );
};
export default OppfolgingOgVarighet;
