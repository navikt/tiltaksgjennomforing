import { AvtaleContext } from '@/AvtaleProvider';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import { CheckboxGroup, Checkbox } from '@navikt/ds-react';
import React, { Dispatch, FunctionComponent, SetStateAction, useContext, useState } from 'react';
import { fetchdata } from '@/komponenter/alleredeOpprettetTiltak/api/alleredeUtils';
import { AlleredeOpprettetAvtaleContext } from '@/komponenter/alleredeOpprettetTiltak/api/AlleredeOpprettetAvtaleProvider';
import GodkjennPaVegneAvMedAlleredeOpprettetTiltak from '@/komponenter/alleredeOpprettetTiltak/GodkjennPaVegneAvMedAlleredeOpprettetTiltak';
import BEMHelper from '@/utils/bem';

type Props = {
    skalGodkjennesPaVegne: boolean;
    setSkalGodkjennesPaVegne: Dispatch<SetStateAction<boolean>>;
};

const GodkjennPaVegneAvArbeidsgiver: FunctionComponent<Props> = (props) => {
    const cls = BEMHelper('godkjenning');
    const { godkjennPaVegneAvArbeidsgiver, avtale } = useContext(AvtaleContext);
    const { deltakerFnr, tiltakstype, id, gjeldendeInnhold } = avtale;
    const { startDato, sluttDato } = gjeldendeInnhold;
    const { alleredeRegistrertAvtale, setAlleredeRegistrertAvtale } = useContext(AlleredeOpprettetAvtaleContext);
    const [godkjenningsModalIsOpen, setGodkjenningsModalIsOpen] = useState<boolean>(false);

    const godkjennPaVegneLabel = props.skalGodkjennesPaVegne
        ? 'Jeg skal godkjenne på vegne av arbeidsgiver, fordi arbeidsgiveren'
        : 'Jeg skal godkjenne på vegne av arbeidsgiver';

    const [klarerIkkeGiFaTilgang, setKlarerIkkeGiFaTilgang] = useState(false);
    const [vetIkkeHvemSomKanGiTilgang, setVetIkkeHvemSomKanGiTilgang] = useState(false);
    const [farIkkeTilgangPersonvern, setFarIkkeTilgangPersonvern] = useState(false);

    const [feilmeldingGrunn, setFeilmeldingGrunn] = useState<string | undefined>();
    const [feilArbeidsgiverInformert, setFeilArbeidsgiverInformert] = useState<string | undefined>();
    const [arbeidsgiverInformert, setArbeidsgiverInformert] = useState(false);

    const godkjenn = (): void | Promise<void> => {
        const valgtMinstEnGrunn = klarerIkkeGiFaTilgang || vetIkkeHvemSomKanGiTilgang || farIkkeTilgangPersonvern;
        if (!valgtMinstEnGrunn) {
            return setFeilmeldingGrunn('Oppgi minst én grunn for godkjenning på vegne av arbeidsgiver');
        } else {
            setFeilmeldingGrunn(undefined);
        }
        if (!arbeidsgiverInformert) {
            return setFeilArbeidsgiverInformert(
                'Arbeidsgiver må være informert om kravene og godkjenne innholdet i avtalen.'
            );
        } else {
            setFeilArbeidsgiverInformert(undefined);
        }
        return godkjennPaVegneAvArbeidsgiver({
            farIkkeTilgangPersonvern,
            klarerIkkeGiFaTilgang,
            vetIkkeHvemSomKanGiTilgang,
        });
    };

    return (
        <div className={cls.element('godkjenn-pa-vegne-av')}>
            <Checkbox
                checked={props.skalGodkjennesPaVegne}
                onChange={(e) => {
                    props.setSkalGodkjennesPaVegne(e.currentTarget.checked);
                }}
            >
                {godkjennPaVegneLabel}
            </Checkbox>

            {props.skalGodkjennesPaVegne && (
                <>
                    <div className={cls.element('checkbox-wrapper')}>
                        <CheckboxGroup legend="Grunn til godkjenning på vegne av arbeidsgiver" error={feilmeldingGrunn}>
                            {avtale.tiltakstype === 'SOMMERJOBB' && (
                                <>
                                    <Checkbox
                                        checked={klarerIkkeGiFaTilgang}
                                        onChange={(event) => setKlarerIkkeGiFaTilgang(event.currentTarget.checked)}
                                    >
                                        klarer ikke få eller gi tilgang
                                    </Checkbox>
                                    <Checkbox
                                        checked={vetIkkeHvemSomKanGiTilgang}
                                        onChange={(event) => setVetIkkeHvemSomKanGiTilgang(event.currentTarget.checked)}
                                    >
                                        vet ikke hvem som kan gi tilgang
                                    </Checkbox>
                                    <Checkbox
                                        checked={farIkkeTilgangPersonvern}
                                        onChange={(event) => setFarIkkeTilgangPersonvern(event.currentTarget.checked)}
                                    >
                                        får ikke tilgang på grunn av personvern
                                    </Checkbox>
                                </>
                            )}
                        </CheckboxGroup>
                    </div>
                    <CheckboxGroup
                        legend="Bekreft at arbeidsgiver er informert om kravene"
                        error={feilArbeidsgiverInformert}
                    >
                        <Checkbox
                            checked={arbeidsgiverInformert}
                            onChange={() => setArbeidsgiverInformert(!arbeidsgiverInformert)}
                        >
                            Arbeidsgiveren er informert om kravene og godkjenner innholdet i avtalen.
                        </Checkbox>
                    </CheckboxGroup>
                </>
            )}
            {props.skalGodkjennesPaVegne && (
                <LagreKnapp
                    className={cls.element('lagre-knapper')}
                    lagre={() =>
                        fetchdata({
                            deltakerFnr,
                            tiltakstype,
                            id,
                            startDato,
                            sluttDato,
                            alleredeRegistrertAvtale,
                            setAlleredeRegistrertAvtale,
                            setGodkjenningsModalIsOpen,
                            godkjenn,
                        })
                    }
                    label="Godkjenn avtalen"
                />
            )}
            <GodkjennPaVegneAvMedAlleredeOpprettetTiltak
                godkjennPaVegneAv={() => godkjenn()}
                modalIsOpen={godkjenningsModalIsOpen}
                setModalIsOpen={setGodkjenningsModalIsOpen}
            />
        </div>
    );
};

export default GodkjennPaVegneAvArbeidsgiver;
