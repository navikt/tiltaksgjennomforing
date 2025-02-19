import React, { FunctionComponent } from 'react';
import IkonTekstRad from '@/komponenter/EkspanderbartPanelRad/IkonTekstRad';
import { Calender } from '@navikt/ds-icons';
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
            svgIkon={<Calender width="2.25rem" height="2.25rem" />}
            headerTekst={{ tekst: 'Oppfølging og varighet', headingType: 'small' }}
        >
            {tiltakstype !== 'VTAO' && (
                <p>
                    Du som arbeidsgiver og NAV skal følge opp deltaker. Din oppgave er å følge opp i det daglige
                    arbeidet og se at arbeidet er i tråd med avtalen som er inngått. Varigheten på tilskuddet skal
                    vurderes ut fra deltakers behov. Tilskuddet reguleres av{' '}
                    <EksternLenke href={eksternLenke}>forskrift for arbeidsmarkedstiltak</EksternLenke>
                </p>
            )}
            {tiltakstype === 'VTAO' && (
                <>
                    <p>
                        Tilskuddet reguleres av forskrift for arbeidsmarkedstiltak. Dere som arbeidsgiver og NAV skal
                        følge opp deltaker. Deres oppgave er å følge opp i det daglige arbeidet og se at arbeidet er i
                        tråd med avtalen som er inngått. Varigheten på tilskuddet skal vurderes ut fra deltakers behov.
                    </p>
                    <p>
                        Arbeidsgiver er forpliktet til å rapportere etter nærmere avtale (minst en gang i året).
                        Rapporten skal inneholde dokumentasjon om deltakerens utvikling i arbeidsforholdet og hvilke
                        tilpasninger som er gjort for å øke deltakerens mestringsnivå.
                    </p>
                </>
            )}
        </IkonTekstRad>
    );
};
export default OppfolgingOgVarighet;
