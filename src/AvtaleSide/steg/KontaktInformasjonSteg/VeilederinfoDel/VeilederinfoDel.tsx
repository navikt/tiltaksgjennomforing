import { AvtaleContext } from '@/AvtaleProvider';
import PakrevdInput from '@/komponenter/form/PakrevdInput';
import MobilnummerInput from '@/komponenter/MobilnummerInput/MobilnummerInput';
import { useContext } from 'react';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import { Alert, Fieldset, Heading, HGrid } from '@navikt/ds-react';
import styles from '../kontaktinfo.module.less';

const VeilederinfoDel = () => {
    const { avtale, settAvtaleInnholdVerdi } = useContext(AvtaleContext);
    const { rolle, identifikator } = useContext(InnloggetBrukerContext);
    const innloggetBrukerErEierAvAvtalen = avtale.veilederNavIdent === identifikator;

    return (
        <Fieldset
            className={styles.container}
            legend={
                <Heading level="2" size="medium">
                    Kontaktperson i Nav
                </Heading>
            }
        >
            {rolle === 'VEILEDER' && (
                <>
                    {avtale.veilederNavIdent && (
                        <p>
                            Eier av avtalen er{' '}
                            <b>
                                <u>{avtale.veilederNavIdent}</u>
                            </b>
                            .
                        </p>
                    )}
                    {!avtale.veilederNavIdent && <Alert variant={'warning'}>Det er ingen eier av avtalen.</Alert>}
                    {!innloggetBrukerErEierAvAvtalen && (
                        <p>
                            For å overta avtalen må du eller en ny veileder gå til menyen og velge "Overta avtale" i
                            tillegg til å skrive inn navn og telefonnummer her.
                        </p>
                    )}
                </>
            )}
            <HGrid gap="space-16" columns={{ xs: 1, md: 2 }}>
                <PakrevdInput
                    name="veilederFornavn"
                    label="Fornavn"
                    verdi={avtale.gjeldendeInnhold.veilederFornavn}
                    settVerdi={(verdi) => settAvtaleInnholdVerdi('veilederFornavn', verdi)}
                />
                <PakrevdInput
                    name="veilederEtternavn"
                    label="Etternavn"
                    verdi={avtale.gjeldendeInnhold.veilederEtternavn}
                    settVerdi={(verdi) => settAvtaleInnholdVerdi('veilederEtternavn', verdi)}
                />
                <MobilnummerInput
                    label="Mobilnummer"
                    name="veilederTlf"
                    verdi={avtale.gjeldendeInnhold.veilederTlf}
                    settVerdi={(verdi) => settAvtaleInnholdVerdi('veilederTlf', verdi)}
                />
            </HGrid>
        </Fieldset>
    );
};

export default VeilederinfoDel;
