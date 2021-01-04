import React, { FunctionComponent } from 'react';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import BEMHelper from '@/utils/bem';

const RelasjonHjelpetekst: FunctionComponent = () => {
    const cls = BEMHelper('relasjoner');

    return (
        <div className={cls.element('relasjon-hjelpetekst')}>
            Du kan ikke få tilskudd til arbeidsmarkedstiltak for egne familiemedlemmer eller andre du har et nært
            forhold til, med mindre særlige grunner foreligger.
            <VerticalSpacer eightPx={true} />
            Er det en nær relasjon mellom deg eller noen i virksomheten og arbeidstakeren skal du huke av for dette i
            boksen under.
            <VerticalSpacer eightPx={true} />
            Du kan søke om oppstart av lønnstilskudd selv om du har en nær relasjon til arbeidstakeren, men du må oppgi
            at det er en nær relasjon og utdype tilknytningen. NAV vil deretter vurdere om det foreligger særlige
            grunner for likevel å innvilge tiltaket.
            {
                <ul>
                    <li>Den som fyller ut skjemaet og den meldingen gjelder er</li>
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
