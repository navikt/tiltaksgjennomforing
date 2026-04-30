import { List } from '@navikt/ds-react';
import { TiltaksType } from '@/types/avtale';

interface Props {
    tiltakstype: TiltaksType;
}

const GenerelVeilederTekst = (props: Props) => (
    <List size="small">
        <List.Item>
            Etter at avtalen er godkjent, ligger oppgaven «Forbered tiltaksgjennomføring {props.tiltakstype}» på
            kontorets arbeidsbenk i Arena som du må fullføre.
        </List.Item>
        <List.Item>
            Avtalen blir automatisk journalført i Gosys, og du trenger derfor ikke å sende inn avtalen til scanning.
        </List.Item>
    </List>
);

export default GenerelVeilederTekst;
