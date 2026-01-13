import React, { FunctionComponent } from 'react';
import IkonTekstRad from '@/komponenter/EkspanderbartPanelRad/IkonTekstRad';
import { CalendarIcon } from '@navikt/aksel-icons';
import EksternLenke from '@/komponenter/navigation/EksternLenke';
import { TiltaksType } from '@/types/avtale';
import { deltakerenErAnsatt } from '@/utils/tiltakUtils';
import { BodyShort } from '@navikt/ds-react';

interface Props {
    tiltakstype: TiltaksType;
    eksternLenke: string;
}

const OppfolgingOgVarighet: FunctionComponent<Props> = ({ tiltakstype, eksternLenke }) => {
    return (
        <IkonTekstRad
            svgIkon={<CalendarIcon title="Oppfølging og varighet" />}
            headerTekst={{ tekst: 'Oppfølging og varighet', headingType: 'small' }}
        >
            {deltakerenErAnsatt(tiltakstype) ? (
                <p>
                    Tilskuddet reguleres av forskrift for arbeidsmarkedstiltak. Som arbeidsgiver skal dere følge opp
                    arbeidstaker i det daglige arbeidet og påse at arbeidet er i tråd med avtalen som er inngått.
                    Varigheten på tiltaket skal vurderes ut fra arbeidstakerens behov.
                </p>
            ) : (
                <p>
                    Som arbeidsgiver skal dere følge opp deltaker i det daglige arbeidet og påse at arbeidet er i tråd
                    med avtalen som er inngått. Varigheten på tiltaket skal vurderes ut fra deltakerens behov.
                    {tiltakstype !== 'ARBEIDSTRENING' && (
                        <BodyShort size="small">
                            Tilskuddet reguleres av{' '}
                            <EksternLenke href={eksternLenke}>forskrift for arbeidsmarkedstiltak</EksternLenke>
                        </BodyShort>
                    )}
                </p>
            )}
        </IkonTekstRad>
    );
};
export default OppfolgingOgVarighet;
