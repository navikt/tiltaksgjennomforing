import IkonTekstRad from '@/komponenter/EkspanderbartPanelRad/IkonTekstRad';
import React, { FunctionComponent } from 'react';
import { ChatExclamationmarkIcon } from '@navikt/aksel-icons';
import EksternLenke from '@/komponenter/navigation/EksternLenke';

const Taushetsplikt: FunctionComponent = () => {
    return (
        <IkonTekstRad
            svgIkon={<ChatExclamationmarkIcon title="Taushetsplikt" />}
            headerTekst={{ tekst: 'Taushetsplikt', headingType: 'small' }}
        >
            <p>
                Alle som utfører arbeid for NAV er bundet av NAV sin taushetsplikt, og må sette seg inn i disse reglene.
            </p>
            <p>
                Taushetsplikten gjelder alle opplysninger du får om noens personlige forhold gjennom jobben du gjør for
                NAV. Den omfatter også opplysninger om fødested, fødselsdato, personnummer, statsborgerforhold,
                sivilstand, yrke, bosted og arbeidssted. I tillegg vil taushetsplikten kunne omfatte opplysninger om
                drifts- eller forretningsforhold som det vil være av konkurransemessig betydning å hemmeligholde av
                hensyn til den opplysningen gjelder.
            </p>
            <p>
                Taushetsplikten betyr at du ikke skal dele opplysningene med andre, og at du må passe på at ingen
                uvedkommende får tilgang til opplysningene. Dette gjelder også overfor andre som utfører arbeid for NAV,
                som ikke trenger informasjonen for å utføre arbeidet sitt.
            </p>
            <p>
                Taushetsplikten gjelder både i arbeidet og i fritiden, og etter at oppdraget ditt opphører. Brudd på
                taushetsplikten kan medføre straffeansvar og/eller reaksjoner fra din arbeidsgiver.
            </p>
            <p>
                Følgende lovbestemmelser regulerer taushetsplikten for NAV:
                <EksternLenke href="https://lovdata.no/lov/2006-06-16-20/§7">NAV-loven § 7</EksternLenke>
                <br />
                <EksternLenke href="https://lovdata.no/lov/1967-02-10/§13">
                    Forvaltningsloven § 13– 13e og 13g
                </EksternLenke>
            </p>
        </IkonTekstRad>
    );
};
export default Taushetsplikt;
