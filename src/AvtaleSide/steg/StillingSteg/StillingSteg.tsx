import { AvtaleContext } from '@/AvtaleProvider';
import { InputStegProps } from '@/AvtaleSide/input-steg-props';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import PakrevdTextarea from '@/komponenter/PakrevdTextarea/PakrevdTextarea';
import { hentStillinger } from '@/services/rest-service';
import { AvtaleMetadata, Stilling } from '@/types/avtale';
import BEMHelper from '@/utils/bem';
import debounce from 'lodash.debounce';
import { RadioPanel } from 'nav-frontend-skjema';
import { Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent, useContext, useState } from 'react';
import Select, { FormatOptionLabelMeta, ValueType } from 'react-select';
import './StillingsSteg.less';

const cls = BEMHelper('StillingsSteg');

type StillingOptions = {
    label: string;
    value: string;
    konseptId: number;
    styrk08: number;
};

const StillingSteg: FunctionComponent = () => {
    const [stillinger, setStillinger] = useState<StillingOptions[]>();

    const avtaleContext: InputStegProps<Stilling & AvtaleMetadata> = useContext(AvtaleContext);

    const hentOgSettStillinger = (sok: string) => {
        hentStillinger(sok).then(data => {
            const options: StillingOptions[] = data.map(opt => ({
                label: opt.label,
                value: opt.label,
                konseptId: opt.konseptId,
                styrk08: opt.styrk08,
            }));
            setStillinger(options);
        });
    };

    const delayHentStilling = debounce(hentOgSettStillinger, 200);

    const setValgtStilling = (val: ValueType<StillingOptions>) => {
        const values = val as StillingOptions;
        avtaleContext.settAvtaleVerdier({
            stillingstittel: values?.label,
            stillingStyrk08: values?.styrk08,
            stillingKonseptId: values?.konseptId,
        });
    };

    const valgtStilling: StillingOptions | null = avtaleContext.avtale.stillingstittel
        ? {
              label: avtaleContext.avtale.stillingstittel || '',
              konseptId: avtaleContext.avtale.stillingKonseptId || 0,
              styrk08: avtaleContext.avtale.stillingStyrk08 || 0,
              value: avtaleContext.avtale.stillingstittel || '',
          }
        : null;

    const visSokeMelding = (inputValue: string) => {
        if (inputValue.length > 0) {
            return 'Finner ingen stillinger';
        }
        return null;
    };

    const highlightPattern = (text: string, pattern: string) => {
        const txtfragments = text.split(new RegExp(pattern, 'gi'));
        if (txtfragments.length <= 1) {
            return text;
        }

        const matches = text.match(new RegExp(pattern, 'gi'));

        return txtfragments.reduce(
            (arr: any, element: any, index: number) =>
                matches && matches[index] ? [...arr, element, <b key={index}>{matches[index]}</b>] : [...arr, element],
            []
        );
    };

    const formatOptionLabel = (option: StillingOptions, labelMeta: FormatOptionLabelMeta<StillingOptions>) => {
        return highlightPattern(option.label, labelMeta.inputValue);
    };

    return (
        <Innholdsboks utfyller="veileder_og_arbeidsgiver">
            <SkjemaTittel>Stilling</SkjemaTittel>

            <Normaltekst>Stillingstittel</Normaltekst>
            <VerticalSpacer rem={0.5} />

            <Select
                placeholder="Velg stilling"
                noOptionsMessage={({ inputValue }) => visSokeMelding(inputValue)}
                isClearable={true}
                value={valgtStilling}
                onChange={value => setValgtStilling(value)}
                onInputChange={value => delayHentStilling(value)}
                options={stillinger}
                formatOptionLabel={formatOptionLabel}
                theme={theme => ({
                    ...theme,
                    colors: {
                        ...theme.colors,
                        neutral20: '#78706A',
                        primary: '#254b6d',
                    },
                })}
            />
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
            <LagreKnapp lagre={avtaleContext.lagreAvtale} label={'Lagre'} suksessmelding={'Avtale lagret'} />
        </Innholdsboks>
    );
};

export default StillingSteg;
