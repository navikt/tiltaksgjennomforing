import IkonTekstRad from '@/komponenter/EkspanderbartPanelRad/IkonTekstRad';
import EksternLenke from '@/komponenter/navigation/EksternLenke';
import { TiltaksType } from '@/types/avtale';
import { Calender } from '@navikt/ds-icons';
import React, { FunctionComponent } from 'react';

interface Props {
    tiltakstype: TiltaksType;
    eksternLenke: string;
}

const OppfølgingOgVarighet: FunctionComponent<Props> = ({ tiltakstype, eksternLenke }) => {
    if (!['MIDLERTIDIG_LONNSTILSKUDD', 'SOMMERJOBB', 'MENTOR', 'INKLUDERINGSTILSKUDD'].includes(tiltakstype)) {
        return null;
    }
    return (
        <IkonTekstRad
            svgIkon={<Calender width="2.25rem" height="2.25rem" />}
            headerTekst={{ tekst: 'Oppfølging og varighet', typografiType: 'undertittel' }}
        >
            <p>
                Du som arbeidsgiver og NAV skal følge opp deltaker. Din oppgave er å følge opp i det daglige arbeidet og
                se at arbeidet er i tråd med avtalen som er inngått. Varigheten på tilskuddet skal vurderes ut fra
                deltakers behov. Tilskuddet reguleres av{' '}
                <EksternLenke href={eksternLenke}>forskrift for arbeidsmarkedstiltak</EksternLenke>
            </p>
        </IkonTekstRad>
    );
};
export default OppfølgingOgVarighet;
