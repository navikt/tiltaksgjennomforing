import { AvtaleContext } from '@/AvtaleProvider';
import useStillingFraContext from '@/AvtaleSide/steg/StillingSteg/useStillingFraContext';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import PakrevdTextarea from '@/komponenter/PakrevdTextarea/PakrevdTextarea';
import BEMHelper from '@/utils/bem';
import { BodyShort, RadioGroup } from '@navikt/ds-react';
import React, { FunctionComponent, useContext } from 'react';
import StillingsTittelVelger from './StillingsTittelVelger';
import RadioPanel from '@/komponenter/radiopanel/RadioPanel';
import './StillingsSteg.less';

const cls = BEMHelper('StillingsSteg');

const StillingSteg: FunctionComponent = () => {
    const avtaleContext = useContext(AvtaleContext);

    const { valgtStilling, setValgtStilling } = useStillingFraContext();

    return (
        <Innholdsboks className={cls.className} utfyller="veileder_og_arbeidsgiver">
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
                verdi={avtaleContext.avtale.gjeldendeInnhold.arbeidsoppgaver || ''}
                settVerdi={(verdi) => avtaleContext.settAvtaleInnholdVerdi('arbeidsoppgaver', verdi)}
                maxLengde={1000}
                feilmelding="Beskrivelse av arbeidsoppgavene er påkrevd"
            />
            {(avtaleContext.avtale.tiltakstype === 'MIDLERTIDIG_LONNSTILSKUDD' ||
                avtaleContext.avtale.tiltakstype === 'VARIG_LONNSTILSKUDD') && (
                <>
                    <BodyShort size="small">Er stillingen fast eller midlertidig</BodyShort>
                    <div>
                        <RadioGroup legend="" className={cls.element('stillingstype_radio')}>
                            <RadioPanel
                                onChange={() => avtaleContext.settAvtaleInnholdVerdier({ stillingstype: 'FAST' })}
                                checked={avtaleContext.avtale.gjeldendeInnhold.stillingstype === 'FAST'}
                                name="stillingstype"
                                value="fast"
                            >
                                Fast
                            </RadioPanel>
                            <RadioPanel
                                onChange={() =>
                                    avtaleContext.settAvtaleInnholdVerdier({ stillingstype: 'MIDLERTIDIG' })
                                }
                                checked={avtaleContext.avtale.gjeldendeInnhold.stillingstype === 'MIDLERTIDIG'}
                                name="stillingstype"
                                value="midlertidig"
                            >
                                Midlertidig
                            </RadioPanel>
                        </RadioGroup>
                    </div>
                </>
            )}
            <LagreKnapp
                lagre={avtaleContext.lagreAvtale}
                label={'Lagre'}
                suksessmelding={'Avtale lagret'}
                className={cls.element('lagre-knapp')}
            />
        </Innholdsboks>
    );
};

export default StillingSteg;
