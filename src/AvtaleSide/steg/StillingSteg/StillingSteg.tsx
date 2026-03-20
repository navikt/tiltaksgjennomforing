import { AvtaleContext, useAvtale } from '@/AvtaleProvider';
import useStillingFraContext from '@/AvtaleSide/steg/StillingSteg/useStillingFraContext';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import PakrevdTextarea from '@/komponenter/PakrevdTextarea/PakrevdTextarea';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import RadioPanel from '@/komponenter/radiopanel/RadioPanel';
import BEMHelper from '@/utils/bem';
import { BodyShort, RadioGroup } from '@navikt/ds-react';
import { FunctionComponent } from 'react';
import './StillingsSteg.less';
import StillingsTittelVelger from './StillingsTittelVelger';
import AvtaleStatus from '@/AvtaleSide/AvtaleStatus/AvtaleStatus';

const cls = BEMHelper('StillingsSteg');

const StillingSteg: FunctionComponent = () => {
    const { avtale, settAvtaleInnholdVerdi, settAvtaleInnholdVerdier, lagreAvtale } = useAvtale();
    const { valgtStilling, setValgtStilling } = useStillingFraContext();

    return (
        <>
            <AvtaleStatus />
            <Innholdsboks className={cls.className}>
                <SkjemaTittel>Stilling</SkjemaTittel>
                <div className={cls.element('label')}>
                    <label htmlFor="stillinginput">Stilling/yrke (kun ett yrke kan legges inn)</label>
                </div>
                <StillingsTittelVelger
                    id="stillinginput"
                    valgtStilling={valgtStilling}
                    setValgtStilling={setValgtStilling}
                />
                <PakrevdTextarea
                    className={cls.element('stilling-beskrivelse')}
                    label="Beskriv arbeidsoppgavene som inngår i stillingen"
                    verdi={avtale.gjeldendeInnhold.arbeidsoppgaver || ''}
                    settVerdi={(verdi) => settAvtaleInnholdVerdi('arbeidsoppgaver', verdi)}
                    maxLengde={1000}
                    feilmelding="Beskrivelse av arbeidsoppgavene er påkrevd"
                />
                {['MIDLERTIDIG_LONNSTILSKUDD', 'VARIG_LONNSTILSKUDD', 'FIREARIG_LONNSTILSKUDD', 'VTAO'].includes(
                    avtale.tiltakstype,
                ) && (
                    <>
                        <BodyShort size="small">Er stillingen fast eller midlertidig</BodyShort>
                        <div>
                            <RadioGroup
                                legend=""
                                value={avtale.gjeldendeInnhold.stillingstype}
                                className={cls.element('stillingstype_radio')}
                            >
                                <RadioPanel
                                    onChange={() => settAvtaleInnholdVerdier({ stillingstype: 'FAST' })}
                                    checked={avtale.gjeldendeInnhold.stillingstype === 'FAST'}
                                    name="stillingstype"
                                    value="FAST"
                                >
                                    Fast
                                </RadioPanel>
                                <RadioPanel
                                    onChange={() => settAvtaleInnholdVerdier({ stillingstype: 'MIDLERTIDIG' })}
                                    checked={avtale.gjeldendeInnhold.stillingstype === 'MIDLERTIDIG'}
                                    name="stillingstype"
                                    value="MIDLERTIDIG"
                                >
                                    Midlertidig
                                </RadioPanel>
                            </RadioGroup>
                        </div>
                    </>
                )}
                <LagreKnapp lagre={lagreAvtale} suksessmelding={'Avtale lagret'} className={cls.element('lagre-knapp')}>
                    Lagre
                </LagreKnapp>
            </Innholdsboks>
        </>
    );
};

export default StillingSteg;
