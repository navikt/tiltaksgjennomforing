import React, { FunctionComponent } from 'react';
import EksternLenke from '@/komponenter/navigation/EksternLenke';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import HorizontalSpacer from '@/komponenter/layout/HorizontalSpacer';
import BEMHelper from '@/utils/bem';

const RelasjonHjelpetekst: FunctionComponent = () => {
    const cls = BEMHelper('relasjoner');

    return (
        <div className={cls.element('relasjon-hjelpetekst')}>
            Du kan ikke få tilskudd til arbeidsmarkedstiltak for egne familiemedlemmer eller andre du har et nært
            forhold til, med mindre særlige grunner foreligger.
            <VerticalSpacer rem={0.5} />
            Er det en nær relasjon mellom deg eller noen i virksomheten og deltakeren skal du huke av for dette i boksen under.
            <VerticalSpacer rem={0.5} />
            Du kan søke om oppstart av lønnstilskudd selv om du har en nær relasjon til deltakeren, men du må oppgi
            at det er en nær relasjon og utdype tilknytningen. NAV vil deretter vurdere om det foreligger særlige grunner for likevel å innvilge tiltaket.
            <VerticalSpacer rem={0.5} />
            For at noen skal bli definert som tiltaksdeltakerens «egne familiemedlemmer eller andre nærstående»
            forutsettes det at denne personen har bestemmende innflytelse over virksomheten, jf aksjeloven
            <HorizontalSpacer rem={0.3} />
            <EksternLenke href="https://lovdata.no/nav/lov/1997-06-13-44/kapII/%C2%A71-5">
                § 1-5
            </EksternLenke>.
            <VerticalSpacer rem={0.5} />
            Den som fyller ut skjemaet og den meldingen gjelder er:
            {
                <ul>
                    <li>Samme person</li>
                    <li>Ektefelle/partner/samboer/forlovet</li>
                    <li>Tidligere ektefelle/partner/samboer</li>
                    <li>Søsken/halvsøsken</li>
                    <li>Barn/barnebarn</li>
                    <li>Foreldre</li>
                    <li>Besteforeldre</li>
                    <li>Svogerskap</li>
                    <li>Annen nær personlig tilknytning</li>
                </ul>
            }
        </div>
    );
};

export default RelasjonHjelpetekst;
