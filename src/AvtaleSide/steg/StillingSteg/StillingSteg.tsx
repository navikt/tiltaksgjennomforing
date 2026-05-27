import { useAvtale } from '@/AvtaleProvider';
import useStillingFraContext from '@/AvtaleSide/steg/StillingSteg/useStillingFraContext';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import PakrevdTextarea from '@/komponenter/PakrevdTextarea/PakrevdTextarea';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import { Label } from '@navikt/ds-react';
import React, { FunctionComponent } from 'react';
import StillingsTittelVelger from './StillingsTittelVelger';
import AvtaleStatus from '@/AvtaleSide/AvtaleStatus/AvtaleStatus';
import type { TiltaksType } from '@/types';

import styles from './StillingsSteg.module.less';
import Stillingstype from './Stillingstype';
import LonnstilskuddFormaal from './LonnstilskuddFormaal';

const LTS_UTEN_SOMMERJOBB = [
    'MIDLERTIDIG_LONNSTILSKUDD',
    'VARIG_LONNSTILSKUDD',
    'FIREARIG_LONNSTILSKUDD',
] as Partial<TiltaksType>[];

const StillingSteg: FunctionComponent = () => {
    const { avtale, settAvtaleInnholdVerdi, lagreAvtale } = useAvtale();
    const { valgtStilling, setValgtStilling } = useStillingFraContext();

    const erLtsUtenSommerjobb = LTS_UTEN_SOMMERJOBB.includes(avtale.tiltakstype);
    const erVtao = 'VTAO' === avtale.tiltakstype;

    return (
        <>
            <AvtaleStatus />
            <Innholdsboks>
                <SkjemaTittel>Stilling</SkjemaTittel>
                <Label className={styles.label} htmlFor="stillinginput">
                    Stilling/yrke (kun ett yrke kan legges inn)
                </Label>
                <StillingsTittelVelger
                    id="stillinginput"
                    valgtStilling={valgtStilling}
                    setValgtStilling={setValgtStilling}
                />
                <PakrevdTextarea
                    className={styles.stillingBeskrivelse}
                    label="Beskriv arbeidsoppgavene som inngår i stillingen"
                    verdi={avtale.gjeldendeInnhold.arbeidsoppgaver || ''}
                    settVerdi={(verdi) => settAvtaleInnholdVerdi('arbeidsoppgaver', verdi)}
                    maxLengde={1000}
                    feilmelding="Beskrivelse av arbeidsoppgavene er påkrevd"
                />
                {(erLtsUtenSommerjobb || erVtao) && (
                    <Stillingstype
                        avtaleInnhold={avtale.gjeldendeInnhold}
                        tiltakstype={avtale.tiltakstype}
                        className={styles.stillingstypeRadio}
                        settVerdi={(verdi) => settAvtaleInnholdVerdi('stillingstype', verdi)}
                    />
                )}
                {erLtsUtenSommerjobb && (
                    <LonnstilskuddFormaal
                        tiltakstype={avtale.tiltakstype}
                        className={styles.lonnstilskuddFormaalRadio}
                        verdi={avtale.gjeldendeInnhold.lonnstilskuddFormaal}
                        settVerdi={(verdi) => settAvtaleInnholdVerdi('lonnstilskuddFormaal', verdi)}
                    />
                )}
                <LagreKnapp lagre={lagreAvtale} suksessmelding={'Avtale lagret'} className={styles.lagreKnapp}>
                    Lagre
                </LagreKnapp>
            </Innholdsboks>
        </>
    );
};

export default StillingSteg;
