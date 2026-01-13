import React, { FunctionComponent } from 'react';
import IkonTekstRad from '@/komponenter/EkspanderbartPanelRad/IkonTekstRad';
import { GavelSoundBlockIcon } from '@navikt/aksel-icons';
import EksternLenke from '@/komponenter/navigation/EksternLenke';
import { TiltaksType } from '@/types/avtale';

interface Props {
    tiltakstype: TiltaksType;
}

const visArbeidsmiljoLov = (tiltakstype: TiltaksType) => {
    const tiltakstyper: TiltaksType[] = [
        'MIDLERTIDIG_LONNSTILSKUDD',
        'VARIG_LONNSTILSKUDD',
        'ARBEIDSTRENING',
        'SOMMERJOBB',
        'VTAO',
        'MENTOR',
    ];
    return tiltakstyper.includes(tiltakstype);
};

const deltakerenErAnsatt = (tiltakstype: TiltaksType) => {
    const tiltakstyper: TiltaksType[] = ['VARIG_LONNSTILSKUDD', 'MIDLERTIDIG_LONNSTILSKUDD', 'SOMMERJOBB', 'VTAO'];
    return tiltakstyper.includes(tiltakstype);
};

const Arbeidsmiljøloven: FunctionComponent<Props> = ({ tiltakstype }) => {
    if (!visArbeidsmiljoLov(tiltakstype)) {
        return null;
    }

    return (
        <IkonTekstRad
            svgIkon={<GavelSoundBlockIcon title="Arbeidsmiljøloven" />}
            headerTekst={{ tekst: 'Arbeidsmiljøloven', headingType: 'small' }}
        >
            {tiltakstype === 'ARBEIDSTRENING' && (
                <p>
                    Selv om deltakeren ikke er ansatt, skal dere følge arbeidsmiljølovens bestemmelser om arbeidsgivers
                    og arbeidstakers plikter, krav til arbeidsmiljø og krav til kontrolltiltak. Det inkluderer også
                    arbeidstid, vern mot diskriminering og straff ved overtredelse av lovens bestemmelser.
                </p>
            )}
            {tiltakstype === 'MENTOR' && (
                <p>
                    Mentoren er ansatt hos dere, og arbeidsmiljølovens bestemmelser gjelder. Det skal inngås
                    arbeidskontrakt i henhold til loven.
                </p>
            )}
            {deltakerenErAnsatt(tiltakstype) && (
                <p>
                    Deltakeren er ansatt hos dere, og arbeidsmiljølovens bestemmelser gjelder. Det skal inngås
                    arbeidskontrakt i henhold til loven.
                </p>
            )}
            <p>
                <EksternLenke href="https://lovdata.no/dokument/NL/lov/2005-06-17-62">
                    Les mer om arbeidsmiljøloven her
                </EksternLenke>
            </p>
            {tiltakstype === 'MENTOR' && (
                <p>
                    For å få utbetalt mentortilskudd, stilles det krav om at mentor skal heve lønn i tilskuddsperioden.
                </p>
            )}
        </IkonTekstRad>
    );
};
export default Arbeidsmiljøloven;
