import KidOgKontonummer from './KidOgKontonummer';
import { useAvtale } from '@/AvtaleProvider';

const KidOgKontonummerAvtaleWrapper = () => {
    const { avtale, settAvtaleInnholdVerdier } = useAvtale();

    return (
        <KidOgKontonummer
            avtaleId={avtale.id}
            kid={avtale.gjeldendeInnhold.arbeidsgiverKid}
            kontonummer={avtale.gjeldendeInnhold.arbeidsgiverKontonummer}
            onChange={(value) => {
                const { kontonummer: arbeidsgiverKontonummer, kid: arbeidsgiverKid } = value;
                settAvtaleInnholdVerdier({ arbeidsgiverKontonummer, arbeidsgiverKid });
            }}
            visOverskrift
        />
    );
};
export default KidOgKontonummerAvtaleWrapper;
