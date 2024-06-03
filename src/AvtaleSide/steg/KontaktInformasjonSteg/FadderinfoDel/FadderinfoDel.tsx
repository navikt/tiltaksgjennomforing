import { AvtaleContext } from '@/AvtaleProvider';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import PakrevdInput from '@/komponenter/PakrevdInput/PakrevdInput';
import TelefonnummerInput from '@/komponenter/TelefonnummerInput/TelefonnummerInput';
import BEMHelper from '@/utils/bem';
import React, { useContext } from 'react';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import { Alert } from '@navikt/ds-react';

const FadderinfoDel = () => {
    const cls = BEMHelper('kontaktinfo');
    const { avtale, settAvtaleInnholdVerdi } = useContext(AvtaleContext);

    const vtao = avtale.gjeldendeInnhold.vtao;
    return (
        <>
            <div className={cls.element('container')}>
                <SkjemaTittel>Informasjon om fadderen</SkjemaTittel>
                <div className={cls.element('rad')}>
                    <PakrevdInput
                        label="Fornavn"
                        verdi={avtale.gjeldendeInnhold.vtao?.fadderFornavn}
                        settVerdi={(verdi) => settAvtaleInnholdVerdi('vtao', { ...vtao, fadderFornavn: verdi })}
                    />
                    <PakrevdInput
                        label="Etternavn"
                        verdi={avtale.gjeldendeInnhold.vtao?.fadderEtternavn}
                        settVerdi={(verdi) => settAvtaleInnholdVerdi('vtao', { ...vtao, fadderEtternavn: verdi })}
                    />
                </div>
                <VerticalSpacer rem={1} />
                <div className={cls.element('rad')}>
                    <TelefonnummerInput
                        label="Mobilnummer"
                        verdi={avtale.gjeldendeInnhold.vtao?.fadderTlf}
                        settVerdi={(verdi) => settAvtaleInnholdVerdi('vtao', { ...vtao, fadderTlf: verdi })}
                    />
                </div>
            </div>
        </>
    );
};

export default FadderinfoDel;
