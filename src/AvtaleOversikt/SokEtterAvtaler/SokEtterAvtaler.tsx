import useValidering from '@/komponenter/useValidering';
import { Søk, Søketyper } from '@/types/SokeTyper';
import BEMHelper from '@/utils/bem';
import { validerFnr } from '@/utils/fnrUtils';
import { validerOrgnr } from '@/utils/orgnrUtils';
import classNames from 'classnames';
import { Søkeknapp } from 'nav-frontend-ikonknapper';
import { Fieldset, Input, Radio } from 'nav-frontend-skjema';
import { Undertittel } from 'nav-frontend-typografi';
import React, { ChangeEvent, FunctionComponent, useEffect, useState } from 'react';
import './SokEtterAvtaler.less';

type Props = {
    sokEtterAvtaler: (sok: Søk) => void;
};

const cls = BEMHelper('soketteravtaler');

const SokEtterAvtaler: FunctionComponent<Props> = props => {
    const [valgtSokeType, setValgtSokeType] = useState('deltakerFnr');
    const [sokeTerm, settSokeTerm] = useState();

    const hvaErfeil = () => {
        if (!sokeTerm) return '';
        if (valgtSokeType === 'deltakerFnr' && !validerFnr(sokeTerm)) {
            return `Ugyldig fødselsnummer`;
        } else if (valgtSokeType === 'bedriftNr' && !validerOrgnr(sokeTerm)) {
            return `Ugyldig bedriftsnummer`;
        }
    };

    const sokEtterAvtaler = () => {
        const hvaSomErFeilTekst = hvaErfeil();
        if (!hvaSomErFeilTekst) {
            let sok: Søk = { søketype: Søketyper.TomtSøk };
            if (!sokeTerm) {
                sok = { søketype: Søketyper.TomtSøk };
            } else if (valgtSokeType === 'deltakerFnr') {
                sok = { søketype: Søketyper.DeltakerSøk, deltakerFnr: sokeTerm };
            } else if (valgtSokeType === 'bedriftNr') {
                sok = { søketype: Søketyper.BedriftSøk, bedriftNr: sokeTerm };
            }
            props.sokEtterAvtaler(sok);
        } else {
            setDeltakerFnrFeil({ feilmelding: hvaSomErFeilTekst });
        }
    };

    const [deltakerFnrFeil, setDeltakerFnrFeil, validerDeltakerFnr] = useValidering(sokeTerm, [
        verdi => {
            if (verdi) {
                if (valgtSokeType === 'deltakerFnr') {
                    if (!validerFnr(verdi)) {
                        return { feilmelding: 'Ugyldig fødselsnummer' };
                    }
                } else if (valgtSokeType === 'bedriftNr') {
                    if (!validerOrgnr(verdi)) {
                        return {
                            feilmelding: 'Ugyldig bedriftsnummer',
                        };
                    }
                }
            } else {
                return undefined;
            }
        },
    ]);

    useEffect(() => {
        if (sokeTerm === '') {
            props.sokEtterAvtaler({ søketype: Søketyper.TomtSøk });
            setDeltakerFnrFeil(undefined);
        }
    }, [sokeTerm]);

    const enterKlikk = (event: any) => {
        if (event.key === 'Enter') {
            settSokeTerm(event.currentTarget.value);
            sokEtterAvtaler();
        }
    };

    const inputOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        const inputValNumeric = event.currentTarget.value.replace(/\D/g, '');
        settSokeTerm(inputValNumeric);
    };

    return (
        <div className={classNames(cls.element('sokeboks'), 'innholdsboks')}>
            <Undertittel>Søk etter</Undertittel>
            <Fieldset legend="">
                <Radio
                    checked={valgtSokeType === 'deltakerFnr'}
                    onChange={() => setValgtSokeType('deltakerFnr')}
                    label={'Deltaker'}
                    name="deltakerFnr"
                />
                <Radio
                    checked={valgtSokeType === 'bedriftNr'}
                    onChange={() => setValgtSokeType('bedriftNr')}
                    label={'Bedrift'}
                    name="bedriftNr"
                />
            </Fieldset>

            <div className={cls.element('sokelinje')}>
                <Input
                    label=""
                    onBlur={validerDeltakerFnr}
                    onKeyPress={enterKlikk}
                    onChange={inputOnChange}
                    value={sokeTerm}
                    className={cls.element('sokefelt')}
                    feil={deltakerFnrFeil}
                    placeholder={valgtSokeType === 'deltakerFnr' ? 'Fødselsnummer' : 'Bedriftsnummer'}
                />
                <div className={cls.element('sokeknapp')}>
                    <Søkeknapp onClick={sokEtterAvtaler} />
                </div>
            </div>
        </div>
    );
};

export default SokEtterAvtaler;
