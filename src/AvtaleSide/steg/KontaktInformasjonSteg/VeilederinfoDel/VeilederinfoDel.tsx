import { AvtaleContext } from '@/AvtaleProvider';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import PakrevdInput from '@/komponenter/PakrevdInput/PakrevdInput';
import TelefonnummerInput from '@/komponenter/TelefonnummerInput/TelefonnummerInput';
import BEMHelper from '@/utils/bem';
import React, { useContext } from 'react';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import { Alert } from '@navikt/ds-react';

const VeilederinfoDel = () => {
    const cls = BEMHelper('kontaktinfo');
    const { avtale, settAvtaleInnholdVerdi } = useContext(AvtaleContext);
    const { rolle, identifikator } = useContext(InnloggetBrukerContext);

    return (
        <>
            <div className={cls.element('container')}>
                <SkjemaTittel>Kontaktperson i NAV</SkjemaTittel>
                {rolle === 'VEILEDER' && (
                    <>
                        {avtale.veilederNavIdent && avtale.veilederNavIdent === identifikator && (
                            <p>
                                Eier av avtalen er{' '}
                                <b>
                                    <u>{identifikator}</u>
                                </b>
                                .
                            </p>
                        )}
                        {avtale.veilederNavIdent?.trim().length > 0 && avtale.veilederNavIdent !== identifikator && (
                            <p>
                                Eier av avtalen er{' '}
                                <b>
                                    <u>{avtale.veilederNavIdent}</u>
                                </b>
                                .
                            </p>
                        )}
                        {!avtale.veilederNavIdent && <Alert variant={'warning'}>Det er ingen eier av avtalen.</Alert>}
                        <p>
                            For å overta avtalen må du eller en ny veileder gå til menyen og velge "Overta avtale" i
                            tillegg til å skrive inn navn og telefonnummer her.
                        </p>
                    </>
                )}
                <div className={cls.element('rad')}>
                    <PakrevdInput
                        label="Fornavn"
                        verdi={avtale.gjeldendeInnhold.veilederFornavn}
                        settVerdi={(verdi) => settAvtaleInnholdVerdi('veilederFornavn', verdi)}
                    />
                    <PakrevdInput
                        label="Etternavn"
                        verdi={avtale.gjeldendeInnhold.veilederEtternavn}
                        settVerdi={(verdi) => settAvtaleInnholdVerdi('veilederEtternavn', verdi)}
                    />
                </div>
                <VerticalSpacer rem={1} />
                <div className={cls.element('rad')}>
                    <TelefonnummerInput
                        label="Mobilnummer"
                        verdi={avtale.gjeldendeInnhold.veilederTlf}
                        settVerdi={(verdi) => settAvtaleInnholdVerdi('veilederTlf', verdi)}
                    />
                </div>
            </div>
        </>
    );
};

export default VeilederinfoDel;
