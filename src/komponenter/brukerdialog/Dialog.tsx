import React, { useContext, useEffect, useState } from 'react';
import BrukerDialog from '@/komponenter/brukerdialog/BrukerDialog';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import { hentAvtaleVisSalesforceDialog } from '@/services/rest-service';

interface Props {
    id: string;
}

const Dialog: React.FC<Props> = (props) => {
    const { rolle } = useContext(InnloggetBrukerContext);
    const [visningAvSalesforceDialog, setVisningAvSalesforceDialog] = useState<boolean>(false);
    useEffect(() => {
        hentAvtaleVisSalesforceDialog(props.id).then((response) => {
            setVisningAvSalesforceDialog(response);
        });
    }, [props.id]);

    if (rolle !== 'ARBEIDSGIVER') {
        return null;
    }
    if (!visningAvSalesforceDialog) {
        return null;
    }

    return <BrukerDialog />;
};
export default Dialog;
