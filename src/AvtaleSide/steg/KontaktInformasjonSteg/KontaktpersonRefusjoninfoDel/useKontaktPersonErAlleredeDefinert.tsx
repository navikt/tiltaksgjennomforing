import { Avtale } from '@/types/avtale';

interface Props {
    avtale: Avtale;
}

const useKontaktPersonErAlleredeDefinert = ({ avtale }: Props): boolean => {
    if (!avtale.gjeldendeInnhold.refusjonKontaktperson) {
        return false;
    }
    const { refusjonKontaktpersonFornavn, refusjonKontaktpersonEtternavn, refusjonKontaktpersonTlf } =
        avtale.gjeldendeInnhold.refusjonKontaktperson;

    return !!refusjonKontaktpersonFornavn || !!refusjonKontaktpersonEtternavn || !!refusjonKontaktpersonTlf;
};
export default useKontaktPersonErAlleredeDefinert;
