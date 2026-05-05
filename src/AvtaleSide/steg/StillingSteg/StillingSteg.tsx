import { useAvtale } from '@/AvtaleProvider';
import useStillingFraContext from '@/AvtaleSide/steg/StillingSteg/useStillingFraContext';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import PakrevdTextarea from '@/komponenter/PakrevdTextarea/PakrevdTextarea';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import RadioPanel from '@/komponenter/radiopanel/RadioPanel';
import BEMHelper from '@/utils/bem';
import { RadioGroup, Label } from '@navikt/ds-react';
import { FunctionComponent } from 'react';
import './StillingsSteg.less';
import StillingsTittelVelger from './StillingsTittelVelger';
import AvtaleStatus from '@/AvtaleSide/AvtaleStatus/AvtaleStatus';
import { Arbeidstilknytning, Stillingstype } from '@/types';
import { arbeidstilknytning as arbeidstilknytningMsg, stillingstype } from '@/messages';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';

const cls = BEMHelper('StillingsSteg');

const StillingSteg: FunctionComponent = () => {
    const { avtale, settAvtaleInnholdVerdi, settAvtaleInnholdVerdier, lagreAvtale } = useAvtale();
    const { valgtStilling, setValgtStilling } = useStillingFraContext();

    const erLts = ['MIDLERTIDIG_LONNSTILSKUDD', 'VARIG_LONNSTILSKUDD', 'FIREARIG_LONNSTILSKUDD'].includes(
        avtale.tiltakstype,
    );
    const erVarigLts = 'VARIG_LONNSTILSKUDD' === avtale.tiltakstype;
    const erVtao = 'VTAO' === avtale.tiltakstype;

    return (
        <>
            <AvtaleStatus />
            <Innholdsboks className={cls.className}>
                <SkjemaTittel>Stilling</SkjemaTittel>
                <Label htmlFor="stillinginput">Stilling/yrke (kun ett yrke kan legges inn)</Label>
                <VerticalSpacer rem={0.5} />
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
                {(erLts || erVtao) && (
                    <>
                        <div>
                            <RadioGroup
                                legend="Er stillingen fast eller midlertidig?"
                                className={cls.element('stillingstype_radio')}
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
                {erVarigLts && (
                    <>
                        <div>
                            <RadioGroup
                                legend="Hva er arbeidstilknytningen ved avtaleinngåelse?"
                                className={cls.element('arbeidstilknytning_radio')}
                                value={avtale.gjeldendeInnhold.arbeidstilknytning ?? ''}
                            >
                                {(['SKAFFE_ARBEID', 'BEHOLDE_ARBEID'] as Arbeidstilknytning[]).map(
                                    (arbeidstilknytning) => {
                                        return (
                                            <RadioPanel
                                                key={arbeidstilknytning}
                                                onChange={() => settAvtaleInnholdVerdier({ arbeidstilknytning })}
                                                checked={
                                                    avtale.gjeldendeInnhold.arbeidstilknytning === arbeidstilknytning
                                                }
                                                name="arbeidstilknytning"
                                                value={arbeidstilknytning}
                                            >
                                                {arbeidstilknytningMsg[arbeidstilknytning]}
                                            </RadioPanel>
                                        );
                                    },
                                )}
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
