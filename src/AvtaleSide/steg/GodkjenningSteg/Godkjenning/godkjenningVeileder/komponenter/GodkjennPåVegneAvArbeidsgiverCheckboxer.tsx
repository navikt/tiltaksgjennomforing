import { GodkjentPaVegneAvArbeidsgiverGrunner } from '@/types/avtale';
import { Checkbox, SkjemaGruppe } from 'nav-frontend-skjema';
import React, { Dispatch, FunctionComponent, SetStateAction } from 'react';

interface Props {
    godkjentPåVegneAvGrunner: GodkjentPaVegneAvArbeidsgiverGrunner;
    setGodkjentPåVegneAvGrunner: Dispatch<SetStateAction<GodkjentPaVegneAvArbeidsgiverGrunner>>;
    feilmeldingGrunn: string | undefined;
    setFeilmeldingGrunn: Dispatch<SetStateAction<string | undefined>>;
    tiltakstype: string;
}

const GodkjennPåVegneAvArbeidsgiverCheckboxer: FunctionComponent<Props> = (props) => {
    return (
        <div style={{ marginTop: '0.5rem' }}>
            <SkjemaGruppe feil={props.feilmeldingGrunn}>
                {props.tiltakstype === 'SOMMERJOBB' && (
                    <>
                        {' '}
                        <Checkbox
                            label="klarer ikke få eller gi tilgang"
                            checked={props.godkjentPåVegneAvGrunner.klarerIkkeGiFaTilgang}
                            onChange={(event) =>
                                props.setGodkjentPåVegneAvGrunner({
                                    ...props.godkjentPåVegneAvGrunner,
                                    klarerIkkeGiFaTilgang: event.currentTarget.checked,
                                })
                            }
                        />
                        <Checkbox
                            label="vet ikke hvem som kan gi tilgang"
                            checked={props.godkjentPåVegneAvGrunner.vetIkkeHvemSomKanGiTilgang}
                            onChange={(event) =>
                                props.setGodkjentPåVegneAvGrunner({
                                    ...props.godkjentPåVegneAvGrunner,
                                    vetIkkeHvemSomKanGiTilgang: event.currentTarget.checked,
                                })
                            }
                        />
                        <Checkbox
                            label="får ikke tilgang på grunn av personvern"
                            checked={props.godkjentPåVegneAvGrunner.farIkkeTilgangPersonvern}
                            onChange={(event) =>
                                props.setGodkjentPåVegneAvGrunner({
                                    ...props.godkjentPåVegneAvGrunner,
                                    farIkkeTilgangPersonvern: event.currentTarget.checked,
                                })
                            }
                        />
                    </>
                )}
                {(props.tiltakstype === 'MIDLERTIDIG_LONNSTILSKUDD' || props.tiltakstype === 'VARIG_LONNSTILSKUDD') && (
                    <Checkbox
                        label="etterregistrering av tiltak fra Arena"
                        checked={props.godkjentPåVegneAvGrunner.arenaMigreringArbeidsgiver}
                        onChange={(event) =>
                            props.setGodkjentPåVegneAvGrunner({
                                ...props.godkjentPåVegneAvGrunner,
                                arenaMigreringArbeidsgiver: event.currentTarget.checked,
                            })
                        }
                    />
                )}
            </SkjemaGruppe>
        </div>
    );
};

export default GodkjennPåVegneAvArbeidsgiverCheckboxer;
