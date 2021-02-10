import { AvtaleContext } from '@/AvtaleProvider';
import { InputStegProps } from '@/AvtaleSide/input-steg-props';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import PakrevdTextarea from '@/komponenter/PakrevdTextarea/PakrevdTextarea';
import { AvtaleMetadata, Stilling } from '@/types/avtale';
import BEMHelper from '@/utils/bem';
import { RadioPanel } from 'nav-frontend-skjema';
import { Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent, useContext } from 'react';
import './StillingsSteg.less';
import StillingsTittelVelger from './StillingsTittelVelger';

const cls = BEMHelper('StillingsSteg');

const StillingSteg: FunctionComponent = () => {
    const avtaleContext: InputStegProps<Stilling & AvtaleMetadata> = useContext(AvtaleContext);

    return (
        <Innholdsboks utfyller="veileder_og_arbeidsgiver">
            <SkjemaTittel>Stilling</SkjemaTittel>
            <label htmlFor="stillinginput">Stilling/yrke (kun ett yrke kan legges inn)</label>
            <VerticalSpacer rem={0.5} />
            <StillingsTittelVelger id="stillinginput" />
            <VerticalSpacer rem={2} />
            <PakrevdTextarea
                label="Beskriv arbeidsoppgavene som inngår i stillingen"
                verdi={avtaleContext.avtale.arbeidsoppgaver || ''}
                settVerdi={verdi => avtaleContext.settAvtaleVerdi('arbeidsoppgaver', verdi)}
                maxLengde={1000}
                feilmelding="Beskrivelse av arbeidsoppgavene er påkrevd"
            />
            {(avtaleContext.avtale.tiltakstype === 'MIDLERTIDIG_LONNSTILSKUDD' ||
                avtaleContext.avtale.tiltakstype === 'VARIG_LONNSTILSKUDD') && (
                <>
                    <Normaltekst>Er stillingen fast eller midlertidig</Normaltekst>
                    <VerticalSpacer rem={0.5} />
                    <div className={cls.element('stillingstype_radio')}>
                        <RadioPanel
                            onChange={() => avtaleContext.settAvtaleVerdier({ stillingstype: 'FAST' })}
                            checked={avtaleContext.avtale.stillingstype === 'FAST'}
                            label="Fast"
                            name="stillingstype"
                            value="fast"
                        />
                        <RadioPanel
                            onChange={() => avtaleContext.settAvtaleVerdier({ stillingstype: 'MIDLERTIDIG' })}
                            checked={avtaleContext.avtale.stillingstype === 'MIDLERTIDIG'}
                            label="Midlertidig"
                            name="stillingstype"
                            value="midlertidig"
                        />
                    </div>
                    <VerticalSpacer rem={2} />
                </>
            )}
            <LagreKnapp lagre={avtaleContext.sjekkOgLagreAvtale} label={'Lagre'} suksessmelding={'Avtale lagret'} />
        </Innholdsboks>
    );
};

export default StillingSteg;
