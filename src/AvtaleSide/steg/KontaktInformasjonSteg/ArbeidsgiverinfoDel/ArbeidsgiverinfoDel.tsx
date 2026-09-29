import { useContext } from 'react';
import { AvtaleContext } from '@/AvtaleProvider';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import PakrevdInput from '@/komponenter/form/PakrevdInput';
import MobilnummerInput from '@/komponenter/MobilnummerInput/MobilnummerInput';
import VisueltDisabledInputFelt from '@/komponenter/VisueltDisabledInputFelt/VisueltDisabledInputFelt';
import BEMHelper from '@/utils/bem';
import { Fieldset, HGrid } from '@navikt/ds-react';

const ArbeidsgiverinfoDel = () => {
    const cls = BEMHelper('kontaktinfo');
    const { avtale, settAvtaleInnholdVerdi: settAvtaleVerdi } = useContext(AvtaleContext);

    return (
        <div className={cls.element('container')}>
            <SkjemaTittel>Informasjon om arbeidsgiveren</SkjemaTittel>
            <HGrid gap="space-16" columns={{ xs: 1, md: 2 }}>
                <VisueltDisabledInputFelt label="Bedriftens navn" tekst={avtale.gjeldendeInnhold.bedriftNavn} />
                <VisueltDisabledInputFelt label="Virksomhetsnummer" tekst={avtale.bedriftNr} />
                <PakrevdInput
                    name="arbeidsgiverFornavn"
                    label="Fornavn"
                    verdi={avtale.gjeldendeInnhold.arbeidsgiverFornavn}
                    settVerdi={(verdi) => settAvtaleVerdi('arbeidsgiverFornavn', verdi)}
                />
                <PakrevdInput
                    name="arbeidsgiverEtternavn"
                    label="Etternavn"
                    verdi={avtale.gjeldendeInnhold.arbeidsgiverEtternavn}
                    settVerdi={(verdi) => settAvtaleVerdi('arbeidsgiverEtternavn', verdi)}
                />
                <MobilnummerInput
                    label="Mobilnummer"
                    name="arbeidsgiverTlf"
                    verdi={avtale.gjeldendeInnhold.arbeidsgiverTlf}
                    settVerdi={(verdi) => settAvtaleVerdi('arbeidsgiverTlf', verdi)}
                />
            </HGrid>
        </div>
    );
};

export default ArbeidsgiverinfoDel;
