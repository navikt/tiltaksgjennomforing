import { AvtaleContext } from '@/AvtaleProvider';
import { InputStegProps } from '@/AvtaleSide/input-steg-props';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import PakrevdInput from '@/komponenter/PakrevdInput/PakrevdInput';
import PakrevdTextarea from '@/komponenter/PakrevdTextarea/PakrevdTextarea';
import { Stilling } from '@/types/avtale';
import React, { FunctionComponent, useContext } from 'react';
import { RadioPanel } from 'nav-frontend-skjema';
import './StillingsSteg.less';
import BEMHelper from '@/utils/bem';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { Normaltekst } from 'nav-frontend-typografi';
import { AvtaleMetadata } from '@/types/avtale';

const cls = BEMHelper('StillingsSteg');

const StillingSteg: FunctionComponent = () => {
    const avtaleContext: InputStegProps<Stilling & AvtaleMetadata> = useContext(AvtaleContext);

    return (
        <Innholdsboks utfyller="veileder_og_arbeidsgiver">
            <SkjemaTittel>Stilling</SkjemaTittel>
            <PakrevdInput
                label="Stillingstittel"
                verdi={avtaleContext.avtale.stillingstittel || ''}
                settVerdi={verdi => avtaleContext.settAvtaleVerdi('stillingstittel', verdi)}
            />
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
            <LagreKnapp lagre={avtaleContext.lagreAvtale} label={'Lagre'} suksessmelding={'Avtale lagret'} />
        </Innholdsboks>
    );
};

export default StillingSteg;
