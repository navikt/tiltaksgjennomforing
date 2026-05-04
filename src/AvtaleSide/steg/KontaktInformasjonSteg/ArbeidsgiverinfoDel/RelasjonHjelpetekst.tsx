import React, { FunctionComponent } from 'react';
import EksternLenke from '@/komponenter/navigation/EksternLenke';
import HorizontalSpacer from '@/komponenter/layout/HorizontalSpacer';
import { avtaleTittel } from '@/messages';
import { TiltaksType } from '@/types/avtale';
import { litenForbokstav } from '@/utils/stringUtils';
import { BodyLong, List, ReadMore } from '@navikt/ds-react';

interface Props {
    tiltakstype: TiltaksType;
}

const RelasjonHjelpetekst: FunctionComponent<Props> = (props) => {
    return (
        <ReadMore header="Hva menes med dette?">
            <BodyLong size="small" spacing>
                Du kan ikke få tilskudd til arbeidsmarkedstiltak for egne familiemedlemmer eller andre du har et nært
                forhold til, med mindre særlige grunner foreligger.
            </BodyLong>
            <BodyLong size="small" spacing>
                Er det en nær relasjon mellom deg eller noen i virksomheten og deltakeren skal du huke av for dette i
                boksen under.
            </BodyLong>
            <BodyLong size="small" spacing>
                Du kan søke om oppstart av {litenForbokstav(avtaleTittel[props.tiltakstype])} selv om du har en nær
                relasjon til deltakeren, men du må oppgi at det er en nær relasjon og utdype tilknytningen. NAV vil
                deretter vurdere om det foreligger særlige grunner for likevel å innvilge tiltaket.
            </BodyLong>
            <BodyLong size="small" spacing>
                For at noen skal bli definert som tiltaksdeltakerens «egne familiemedlemmer eller andre nærstående»
                forutsettes det at denne personen har bestemmende innflytelse over virksomheten, jf aksjeloven
                <HorizontalSpacer rem={0.3} />
                <EksternLenke href="https://lovdata.no/nav/lov/1997-06-13-44/kapII/%C2%A71-5">§ 1-5</EksternLenke>.
            </BodyLong>
            <BodyLong size="small">Den som fyller ut skjemaet og den meldingen gjelder er:</BodyLong>
            <List size="small">
                <List.Item>Samme person</List.Item>
                <List.Item>Ektefelle/partner/samboer/forlovet</List.Item>
                <List.Item>Tidligere ektefelle/partner/samboer</List.Item>
                <List.Item>Søsken/halvsøsken</List.Item>
                <List.Item>Barn/barnebarn</List.Item>
                <List.Item>Foreldre</List.Item>
                <List.Item>Besteforeldre</List.Item>
                <List.Item>Svogerskap</List.Item>
                <List.Item>Annen nær personlig tilknytning</List.Item>
            </List>
        </ReadMore>
    );
};

export default RelasjonHjelpetekst;
