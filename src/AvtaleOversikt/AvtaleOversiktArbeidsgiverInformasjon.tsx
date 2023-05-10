import React from 'react';
import { Accordion, BodyShort, Label } from '@navikt/ds-react';
import { Rolle } from '@/types/innlogget-bruker';
import { BEMWrapper } from '@/utils/bem';

interface Props {
    rolle: Rolle;
    cls: BEMWrapper;
}

const AvtaleOversiktArbeidsgiverInformasjon: React.FC<Props> = ({ rolle, cls }: Props) => {
    if (rolle !== 'ARBEIDSGIVER') {
        return null;
    }

    return (
        <Accordion className={cls.element('arbeidsgiver-informasjon')}>
            <Accordion.Item>
                <Accordion.Header>
                    <div>
                        <Label size="small">Finner du ikke avtalen du leter etter?</Label>
                        <BodyShort size="small">Det kan være flere årsaker til dette. Les hva du kan gjøre.</BodyShort>
                    </div>
                </Accordion.Header>
                <Accordion.Content>
                    <Label size="small">Avtalen du leter etter er opprettet på en annen virksomhet</Label>
                    <BodyShort size="small">
                        Det kan være at avtalen du leter etter er opprettet på en annen virskomhet. Du kan prøve å bytte
                        virksomhet i virksomhetsvelgeren oppe til høyre på skjermen.
                    </BodyShort>
                    <Label className={cls.element('arbeidsgiver-informasjon-nytt-avsnitt')} size="small">
                        Du mangler tilgang til rett avtaletype for den virksomheten du har valgt.
                    </Label>
                    <BodyShort size="small">Da kan du be om tilgang i Altinn.</BodyShort>
                </Accordion.Content>
            </Accordion.Item>
        </Accordion>
    );
};
export default AvtaleOversiktArbeidsgiverInformasjon;
