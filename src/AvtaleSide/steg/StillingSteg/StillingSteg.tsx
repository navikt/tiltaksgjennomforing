import { AvtaleContext } from '@/AvtaleProvider';
import { InputStegProps } from '@/AvtaleSide/input-steg-props';
import SkjemaTittel from '@/komponenter/form/SkjemaTittel';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import PakrevdTextarea from '@/komponenter/PakrevdTextarea/PakrevdTextarea';
import { AvtaleMetadata, Stilling } from '@/types/avtale';
import BEMHelper from '@/utils/bem';
import debounce from 'lodash.debounce';
import { RadioPanel } from 'nav-frontend-skjema';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent, useContext, useState } from 'react';
import Select, { OptionProps, ValueType } from 'react-select';
import './StillingsSteg.less';

const cls = BEMHelper('StillingsSteg');

const StillingSteg: FunctionComponent = () => {
    const avtaleContext: InputStegProps<Stilling & AvtaleMetadata> = useContext(AvtaleContext);

    type Styrk = {
        konseptId: number;
        label: string;
        styrk08: number;
    };
    type Options = {
        label: string;
        value: string;
        konseptId: number;
        styrk08: number;
    };

    const hentStillingerr = async (sok: string): Promise<Styrk[]> => {
        const response = await fetch(`https://arbeidsgiver.nav.no/stillingstitler/search?q=${sok}`);
        return await response.json();
    };

    const fetchStilling = (sok: string) => {
        hentStillingerr(sok).then(data => {
            const options: Options[] = data.map(opt => ({
                label: opt.label,
                value: opt.label,
                konseptId: opt.konseptId,
                styrk08: opt.styrk08,
            }));
            setStillinger(options);
        });
    };

    const hentStillinger = debounce(fetchStilling, 200);

    const [stillinger, setStillinger] = useState<any>();

    const onChange = (val: ValueType<Options>) => {
        const values = val as Options;
        console.log('values som blir satt på context:');
        console.log(values);
        avtaleContext.settAvtaleVerdier({
            stillingstittel: values?.label,
            stillingStyrk08: values?.styrk08,
            stillingKonseptId: values?.konseptId,
        });
    };

    const valgtStilling: Options | null = avtaleContext.avtale.stillingstittel
        ? {
              label: avtaleContext.avtale.stillingstittel || '',
              konseptId: avtaleContext.avtale.stillingKonseptId || 0,
              styrk08: avtaleContext.avtale.stillingStyrk08 || 0,
              value: avtaleContext.avtale.stillingstittel || '',
          }
        : null;

    const visSokeMelding = (obj: { inputValue: string }) => {
        if (obj.inputValue.length > 0) {
            return 'Finner ingen stillinger';
        } else {
            return null;
        }
    };

    const MinOption = (props: OptionProps<Options>) => <Element>{props.label}</Element>;

    return (
        <Innholdsboks utfyller="veileder_og_arbeidsgiver">
            <SkjemaTittel>Stilling</SkjemaTittel>

            <Normaltekst>Stillingstittel</Normaltekst>
            <VerticalSpacer rem={0.5} />

            <Select
                //components={{ Option: MinOption }}
                placeholder="Velg stilling"
                noOptionsMessage={visSokeMelding}
                isClearable={true}
                value={valgtStilling}
                onChange={value => onChange(value)}
                onInputChange={value => hentStillinger(value)}
                options={stillinger}
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
