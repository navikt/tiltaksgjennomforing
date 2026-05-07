import { useAvtale } from '@/AvtaleProvider';
import useStillingFraContext from '@/AvtaleSide/steg/StillingSteg/useStillingFraContext';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import PakrevdTextarea from '@/komponenter/PakrevdTextarea/PakrevdTextarea';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import RadioPanel from '@/komponenter/radiopanel/RadioPanel';
import { RadioGroup, Label } from '@navikt/ds-react';
import { FunctionComponent } from 'react';
import StillingsTittelVelger from './StillingsTittelVelger';
import AvtaleStatus from '@/AvtaleSide/AvtaleStatus/AvtaleStatus';
import { LonnstilskuddFormaal, Stillingstype, TiltaksType } from '@/types';
import { lonnstilskuddFormaal as lonnstilskuddFormaalMsg, stillingstype } from '@/messages';

import styles from './StillingsSteg.module.less';

const LTS_UTEN_SOMMERJOBB = [
    'MIDLERTIDIG_LONNSTILSKUDD',
    'VARIG_LONNSTILSKUDD',
    'FIREARIG_LONNSTILSKUDD',
] as Partial<TiltaksType>[];

const StillingSteg: FunctionComponent = () => {
    const { avtale, settAvtaleInnholdVerdi, settAvtaleInnholdVerdier, lagreAvtale } = useAvtale();
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
                    <>
                        <div>
                            <RadioGroup
                                legend="Er stillingen fast eller midlertidig?"
                                className={styles.stillingstypeRadio}
                                value={avtale.gjeldendeInnhold.stillingstype ?? ''}
                            >
                                {['FAST', 'MIDLERTIDIG'].map((str) => {
                                    const type = str as Stillingstype;
                                    return (
                                        <RadioPanel
                                            key={type}
                                            onChange={() => settAvtaleInnholdVerdier({ stillingstype: type })}
                                            checked={avtale.gjeldendeInnhold.stillingstype === type}
                                            name="ansettelsestype"
                                            value={type}
                                        >
                                            {stillingstype[type]}
                                        </RadioPanel>
                                    );
                                })}
                            </RadioGroup>
                        </div>
                    </>
                )}
                {erLtsUtenSommerjobb && (
                    <>
                        <div>
                            <RadioGroup
                                legend="Hva er formålet med avtalen?"
                                className={styles.lonnstilskuddFormaalRadio}
                                value={avtale.gjeldendeInnhold.lonnstilskuddFormaal ?? ''}
                            >
                                {(['SKAFFE_ARBEID', 'BEHOLDE_ARBEID'] as LonnstilskuddFormaal[]).map(
                                    (lonnstilskuddFormaal) => {
                                        return (
                                            <RadioPanel
                                                key={lonnstilskuddFormaal}
                                                onChange={() => settAvtaleInnholdVerdier({ lonnstilskuddFormaal })}
                                                checked={
                                                    avtale.gjeldendeInnhold.lonnstilskuddFormaal ===
                                                    lonnstilskuddFormaal
                                                }
                                                name="lonnstilskuddFormaal"
                                                value={lonnstilskuddFormaal}
                                            >
                                                {lonnstilskuddFormaalMsg[lonnstilskuddFormaal]}
                                            </RadioPanel>
                                        );
                                    },
                                )}
                            </RadioGroup>
                        </div>
                    </>
                )}
                <LagreKnapp lagre={lagreAvtale} suksessmelding={'Avtale lagret'} className={styles.lagreKnapp}>
                    Lagre
                </LagreKnapp>
            </Innholdsboks>
        </>
    );
};

export default StillingSteg;
