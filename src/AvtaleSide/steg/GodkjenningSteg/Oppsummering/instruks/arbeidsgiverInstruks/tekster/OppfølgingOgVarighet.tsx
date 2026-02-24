import { FunctionComponent } from 'react';
import IkonTekstRad from '@/komponenter/EkspanderbartPanelRad/IkonTekstRad';
import { CalendarIcon } from '@navikt/aksel-icons';
import { TiltaksType } from '@/types/avtale';
import { deltakerenErAnsatt } from '@/utils/tiltakUtils';

interface Props {
    tiltakstype: TiltaksType;
}

const OppfolgingOgVarighet: FunctionComponent<Props> = ({ tiltakstype }) => {
    return (
        <IkonTekstRad
            svgIkon={<CalendarIcon title="Oppfølging og varighet" />}
            headerTekst={{ tekst: 'Oppfølging og varighet', headingType: 'small' }}
        >
            {deltakerenErAnsatt(tiltakstype) ? (
                <p>
                    Som arbeidsgiver skal dere følge opp arbeidstaker i det daglige arbeidet og påse at arbeidet er i
                    tråd med avtalen som er inngått. Varigheten på tiltaket skal vurderes ut fra arbeidstakerens behov.
                </p>
            ) : (
                <p>
                    Som arbeidsgiver skal dere følge opp deltaker i det daglige arbeidet og påse at arbeidet er i tråd
                    med avtalen som er inngått. Varigheten på tiltaket skal vurderes ut fra deltakerens behov.
                </p>
            )}
        </IkonTekstRad>
    );
};
export default OppfolgingOgVarighet;
