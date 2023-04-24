import { useContext } from 'react';
import { AvtaleContext } from '@/AvtaleProvider';
import { basename } from '@/paths';

const useBrukerDialog = () => {
    const { avtale } = useContext(AvtaleContext);
    const urlProperties = new URLSearchParams(window.location.search);

    return `${basename}/chat?organisasjonsnummer=${urlProperties.get('bedrift') ?? ''}&avtalenummer=${avtale.avtaleNr}`;
};
export default useBrukerDialog;
