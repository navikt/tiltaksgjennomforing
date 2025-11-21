import EksternLenke from '@/komponenter/navigation/EksternLenke';
import { BodyLong, Heading, List } from '@navikt/ds-react';

const TaushetserklæringTekst = () => {
    return (
        <>
            <Heading level="2" size="xsmall" spacing>
                Taushetsplikt for avtale
            </Heading>
            <BodyLong size="small" spacing>
                Alle som utfører arbeid for NAV er bundet av NAV sin taushetsplikt, og må sette seg inn i disse reglene.
            </BodyLong>

            <BodyLong size="small" spacing>
                Taushetsplikten gjelder alle opplysninger du får om noens personlige forhold gjennom jobben du gjør for
                NAV. Den omfatter også opplysninger om fødested, fødselsdato, personnummer, statsborgerforhold,
                sivilstand, yrke, bosted og arbeidssted. I tillegg vil taushetsplikten kunne omfatte opplysninger om
                drifts- eller forretningsforhold som det vil være av konkurransemessig betydning å hemmeligholde av
                hensyn til den opplysningen gjelder.
            </BodyLong>

            <BodyLong size="small" spacing>
                Taushetsplikten betyr at du ikke skal dele opplysningene med andre, og at du må passe på at ingen
                uvedkommende får tilgang til opplysningene. Dette gjelder også overfor andre som utfører arbeid for NAV,
                som ikke trenger informasjonen for å utføre arbeidet sitt.
            </BodyLong>

            <BodyLong size="small" spacing>
                Taushetsplikten gjelder både i arbeidet og i fritiden, og etter at oppdraget ditt opphører.
            </BodyLong>

            <BodyLong size="small" spacing>
                Brudd på taushetsplikten kan medføre straffeansvar og/eller reaksjoner fra din arbeidsgiver.
            </BodyLong>

            <Heading level="2" size="xsmall">
                Følgende lovbestemmelser regulerer taushetsplikten for NAV:
            </Heading>
            <List as="ul" size="small">
                <List.Item>
                    <EksternLenke href="https://lovdata.no/lov/1967-02-10/§13">
                        Forvaltningsloven §§ 13– 13e og 13g
                    </EksternLenke>
                </List.Item>
                <List.Item>
                    <EksternLenke href="https://lovdata.no/lov/2006-06-16-20/§7">NAV-loven § 7</EksternLenke>
                </List.Item>
            </List>
        </>
    );
};
export default TaushetserklæringTekst;
