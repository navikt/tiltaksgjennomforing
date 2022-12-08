import TilgangTabell from '@/AvtaleOversikt/IngenAvtaler/arbeidsgiver/TilgangTabell';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import EksternLenke from '@/komponenter/navigation/EksternLenke';
import { Tilganger } from '@/types/innlogget-bruker';
import { Label, BodyShort } from '@navikt/ds-react';
import React, { FunctionComponent } from 'react';
import RammeMedIkonOgOverskrift from './RammeMedIkonOgOverskrift';

interface Props {
    bedriftNr: string;
    bedriftNavnOgNummer: string;
    tilganger: Tilganger;
    overskrift: string;
    visTekst: boolean;
}

const BoksMedTekstOgTilgangstabell: FunctionComponent<Props> = (props) => {
    return (
        <RammeMedIkonOgOverskrift overskrift={props.overskrift}>
            {props.visTekst && (
                <>
                    <BodyShort size="small">
                        Du har tilgang til én eller flere tiltakstyper men det er ikke opprettet noen avtaler for denne
                        eller disse tiltakstypene.
                    </BodyShort>
                    <VerticalSpacer rem={2} />
                </>
            )}
            <Label>
                Her ser du en oversikt over hvilke tiltakstyper du har tilgang til i {props.bedriftNavnOgNummer}
            </Label>
            <VerticalSpacer rem={0.5} />
            <BodyShort size="small">
                Hvis du mangler tilgang kan du be om tilgang i Altinn.{' '}
                <EksternLenke href="https://www.altinn.no/hjelp/profil/roller-og-rettigheter/">
                    Les mer om roller og rettigheter i Altinn her
                </EksternLenke>
            </BodyShort>
            <VerticalSpacer rem={3} />
            <TilgangTabell tilganger={props.tilganger} bedriftNr={props.bedriftNr} />
        </RammeMedIkonOgOverskrift>
    );
};

export default BoksMedTekstOgTilgangstabell;
