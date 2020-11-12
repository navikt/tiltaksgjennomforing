import TilgangTabell from '@/AvtaleOversikt/IngenAvtaler/arbeidsgiver/TilgangTabell';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import EksternLenke from '@/komponenter/navigation/EksternLenke';
import { Tilganger } from '@/types/innlogget-bruker';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import * as React from 'react';
import { FunctionComponent } from 'react';
import RammeMedIkonOgOverskrift from './RammeMedIkonOgOverskrift';

interface Props {
    bedriftNr: string;
    bedriftNavnOgNummer: string;
    tilganger: Tilganger;
    overskrift: string;
    visTekst: boolean;
}

const BoksMedTekstOgTilgangstabell: FunctionComponent<Props> = props => {
    return (
        <RammeMedIkonOgOverskrift overskrift={props.overskrift}>
            {props.visTekst && (
                <>
                    <Normaltekst>
                        Du har tilgang til én eller flere tiltakstyper men det er ikke opprettet noen avtaler for denne
                        eller disse tiltakstypene.
                    </Normaltekst>
                    <VerticalSpacer rem={2} />
                </>
            )}
            <Element>
                Her ser du en oversikt over hvilke tiltakstyper du har tilgang til i {props.bedriftNavnOgNummer}
            </Element>
            <VerticalSpacer rem={0.5} />
            <Normaltekst>
                Hvis du mangler tilgang kan du be om tilgang i Altinn.{' '}
                <EksternLenke href="https://www.altinn.no/hjelp/profil/roller-og-rettigheter/">
                    Les mer om roller og rettigheter i Altinn her
                </EksternLenke>
            </Normaltekst>
            <VerticalSpacer rem={3} />
            <TilgangTabell tilganger={props.tilganger} bedriftNr={props.bedriftNr} />
        </RammeMedIkonOgOverskrift>
    );
};

export default BoksMedTekstOgTilgangstabell;
