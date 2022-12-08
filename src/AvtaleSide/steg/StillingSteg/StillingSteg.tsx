import { AvtaleContext } from '@/AvtaleProvider';
import useStillingFraContext from '@/AvtaleSide/steg/StillingSteg/useStillingFraContext';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import PakrevdTextarea from '@/komponenter/PakrevdTextarea/PakrevdTextarea';
import BEMHelper from '@/utils/bem';
import { RadioPanel } from 'nav-frontend-skjema';
import { BodyShort } from '@navikt/ds-react';
import React, { FunctionComponent, useContext } from 'react';
import './StillingsSteg.less';
import StillingsTittelVelger from './StillingsTittelVelger';

const cls = BEMHelper('StillingsSteg');

const StillingSteg: FunctionComponent = () => {
    const avtaleContext = useContext(AvtaleContext);

    const { valgtStilling, setValgtStilling } = useStillingFraContext();

    return (
        <Innholdsboks utfyller="veileder_og_arbeidsgiver">
            <SkjemaTittel>Stilling</SkjemaTittel>
            <label htmlFor="stillinginput">Stilling/yrke (kun ett yrke kan legges inn)</label>
            <VerticalSpacer rem={0.5} />
            <StillingsTittelVelger
                id="stillinginput"
                valgtStilling={valgtStilling}
                setValgtStilling={setValgtStilling}
            />
            <VerticalSpacer rem={2} />
            <PakrevdTextarea
                label="Beskriv arbeidsoppgavene som inngår i stillingen"
                verdi={avtaleContext.avtale.gjeldendeInnhold.arbeidsoppgaver || ''}
                settVerdi={(verdi) => avtaleContext.settAvtaleInnholdVerdi('arbeidsoppgaver', verdi)}
                maxLengde={1000}
                feilmelding="Beskrivelse av arbeidsoppgavene er påkrevd"
            />
            {(avtaleContext.avtale.tiltakstype === 'MIDLERTIDIG_LONNSTILSKUDD' ||
                avtaleContext.avtale.tiltakstype === 'VARIG_LONNSTILSKUDD') && (
                <>
                    <VerticalSpacer rem={1} />
                    <BodyShort size="small">Er stillingen fast eller midlertidig</BodyShort>
                    <VerticalSpacer rem={0.5} />
                    <div className={cls.element('stillingstype_radio')}>
                        <RadioPanel
                            onChange={() => avtaleContext.settAvtaleInnholdVerdier({ stillingstype: 'FAST' })}
                            checked={avtaleContext.avtale.gjeldendeInnhold.stillingstype === 'FAST'}
                            label="Fast"
                            name="stillingstype"
                            value="fast"
                        />
                        <RadioPanel
                            onChange={() => avtaleContext.settAvtaleInnholdVerdier({ stillingstype: 'MIDLERTIDIG' })}
                            checked={avtaleContext.avtale.gjeldendeInnhold.stillingstype === 'MIDLERTIDIG'}
                            label="Midlertidig"
                            name="stillingstype"
                            value="midlertidig"
                        />
                    </div>
                </>
            )}
            <VerticalSpacer rem={2} />
            <LagreKnapp lagre={avtaleContext.lagreAvtale} label={'Lagre'} suksessmelding={'Avtale lagret'} />
        </Innholdsboks>
    );
};

export default StillingSteg;
