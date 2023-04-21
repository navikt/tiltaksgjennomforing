import { useContext } from 'react';
import * as process from 'process';
import { AvtaleContext } from '@/AvtaleProvider';

const useBrukerDialog = () => {
    const { avtale } = useContext(AvtaleContext);
    const urlProperties = new URLSearchParams(window.location.search);
    const brukerdialogUrl =
        process.env.ARBEIDSGIVER_DIALOG_URL ?? 'https://navdialog--sit2.sandbox.my.site.com/ArbeidsgiverDialog';

    return `${brukerdialogUrl}/?organisasjonsnummer=${urlProperties.get('bedrift') ?? ''}&avtalenummer=${
        avtale.avtaleNr
    }`;
};
export default useBrukerDialog;
