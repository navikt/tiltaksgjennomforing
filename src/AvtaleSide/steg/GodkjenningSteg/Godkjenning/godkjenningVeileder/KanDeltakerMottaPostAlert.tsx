import { LocalAlert } from '@navikt/ds-react';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { useKanDeltakerMottaPost } from '@/services/use-rest';

type Props = {
    avtaleId: string;
};

const KanDeltakerMottaPostAlert = ({ avtaleId }: Props) => {
    const { data: kanDeltakerMottaPost } = useKanDeltakerMottaPost(avtaleId);

    if (kanDeltakerMottaPost !== false) {
        return null;
    }

    return (
        <>
            <LocalAlert status="warning">
                <LocalAlert.Header>
                    <LocalAlert.Title>Brukeren varsles ikke automatisk</LocalAlert.Title>
                </LocalAlert.Header>
                <LocalAlert.Content>
                    Brukeren har ingen registrert kontaktadresse og er reservert mot digital kommunikasjon. De vil
                    derfor ikke motta et varsel, og vedtaket som journalføres i Gosys må skrives ut og leveres på en
                    annen måte.
                </LocalAlert.Content>
            </LocalAlert>
            <VerticalSpacer rem={1} />
        </>
    );
};
export default KanDeltakerMottaPostAlert;
