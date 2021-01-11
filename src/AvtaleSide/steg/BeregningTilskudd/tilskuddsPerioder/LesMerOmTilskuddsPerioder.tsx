import React, { FunctionComponent, useContext, useState } from 'react';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import LesMerPanel from '@/komponenter/LesMerPanel/LesMerPanel';
import BEMHelper from '@/utils/bem';
import { AvtaleContext } from '@/AvtaleProvider';
import { Feature, FeatureToggleContext } from '@/FeatureToggleProvider';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';

const cls = BEMHelper('tilskuddsPerioder');

const LesMerOmTilskuddsPerioder: FunctionComponent = () => {
    const featureToggleContext = useContext(FeatureToggleContext);
    const visningAvtilskuddsPeriodeToggle = featureToggleContext[Feature.VisningAvTilskuddsPerioder];
    const [åpnet, setÅpnet] = useState<boolean>(false);
    const avtaleinnhold = useContext(AvtaleContext);

    const detErOpprettetTilskuddsPerioder = () => avtaleinnhold.avtale.tilskuddPeriode.length > 0;

    return visningAvtilskuddsPeriodeToggle && detErOpprettetTilskuddsPerioder() ? (
        <>
            <Undertittel className={cls.element('tittel')}>Perioder</Undertittel>
            <VerticalSpacer rem={1} />
            <LesMerPanel lukkLabel="Lukk" åpneLabel="Viktig informasjon om perioder" onÅpne={() => setÅpnet(!åpnet)}>
                <Normaltekst>
                    Lønnstilskudd blir godkjent av NAV for én og én periode av gangen. Hver periode kan maksimalt vare i
                    tre måneder.
                </Normaltekst>
                <Normaltekst>
                    Som arbeidsgiver må du søke refusjon for hver enkelt periode for å få pengene som er satt av. Du kan
                    først be om refusjon etter at perioden er over. I listen under kan du se datoer for når du kan søke
                    refusjon.
                </Normaltekst>
            </LesMerPanel>
        </>
    ) : null;
};

export default LesMerOmTilskuddsPerioder;
