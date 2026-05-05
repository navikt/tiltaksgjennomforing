import { List } from '@navikt/ds-react';

const SommerjobbVeilederTekst = () => (
    <List size="small">
        <List.Item>
            Etter at du har godkjent avtalen, må beslutter godkjenne tilskuddsperioden. Når beslutter har godkjent, er
            avtalen endelig godkjent og tiltaket kan starte opp.
        </List.Item>
        <List.Item>
            Hvis beslutter ikke godkjenner vil du få en melding i tjenesten med en begrunnelse og hva som eventuelt må
            rettes opp i avtalen.
        </List.Item>
        <List.Item>Avtalen blir automatisk journalført i Gosys.</List.Item>
    </List>
);

export default SommerjobbVeilederTekst;
