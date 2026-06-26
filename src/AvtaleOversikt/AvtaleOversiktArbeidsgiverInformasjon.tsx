import React from 'react';
import { BodyShort, ExpansionCard, Label } from '@navikt/ds-react';
import { Rolle } from '@/types/innlogget-bruker';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';

interface Props {
    rolle: Rolle;
}

const AvtaleOversiktArbeidsgiverInformasjon: React.FC<Props> = ({ rolle }: Props) => {
    if (rolle !== 'ARBEIDSGIVER') {
        return null;
    }

    return (
        <ExpansionCard aria-label="Finner du ikke avtalen du leter etter?" size="small">
            <ExpansionCard.Header>
                <ExpansionCard.Title size="small">Finner du ikke avtalen du leter etter?</ExpansionCard.Title>
                <ExpansionCard.Description>
                    Det kan være flere årsaker til dette. Les hva du kan gjøre.
                </ExpansionCard.Description>
            </ExpansionCard.Header>
            <ExpansionCard.Content>
                <BodyShort size="small" weight="semibold">
                    Avtalen du leter etter er opprettet på en annen virksomhet
                </BodyShort>
                <BodyShort size="small">
                    Det kan være at avtalen du leter etter er opprettet på en annen virskomhet. Du kan prøve å bytte
                    virksomhet i virksomhetsvelgeren oppe til høyre på skjermen.
                </BodyShort>
                <VerticalSpacer rem={1} />
                <BodyShort size="small" weight="semibold">
                    Du mangler tilgang til rett avtaletype for den virksomheten du har valgt.
                </BodyShort>
                <BodyShort size="small">Da kan du be om tilgang i Altinn.</BodyShort>
            </ExpansionCard.Content>
        </ExpansionCard>
    );
};
export default AvtaleOversiktArbeidsgiverInformasjon;
