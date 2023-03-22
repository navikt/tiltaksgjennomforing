import { GodkjentPaVegneAvArbeidsgiverGrunner } from '@/types/avtale';
import { Checkbox, CheckboxGroup, Fieldset } from '@navikt/ds-react';
import React, { Dispatch, FunctionComponent, PropsWithChildren, SetStateAction, useState } from 'react';

interface Props {
    godkjentPåVegneAvGrunner: GodkjentPaVegneAvArbeidsgiverGrunner;
    setGodkjentPåVegneAvGrunner: Dispatch<SetStateAction<GodkjentPaVegneAvArbeidsgiverGrunner>>;
    feilmeldingGrunn: string | undefined;
    setFeilmeldingGrunn: Dispatch<SetStateAction<string | undefined>>;
    tiltakstype: string;
}

type Grunnlag = 'klarerIkkeGiFaTilgang' | 'vetIkkeHvemSomKanGiTilgang' | 'farIkkeTilgangPersonvern' | '';

const GodkjennPåVegneAvArbeidsgiverCheckboxer: FunctionComponent<Props> = (props: PropsWithChildren<Props>) => {
    const [grunnlag, setGrunnlag] = useState<Grunnlag[]>(['']);
    return (
        <div style={{ marginTop: '0.5rem' }}>
            <Fieldset legend="Godkjenn på vegne av arbeidsgiver valg" error={props.feilmeldingGrunn}>
                {props.tiltakstype === 'SOMMERJOBB' && (
                    <CheckboxGroup legend="" onChange={(value: any[]) => setGrunnlag(value)} value={grunnlag}>
                        <Checkbox
                            value="klarerIkkeGiFaTilgang"
                            onChange={(event) =>
                                props.setGodkjentPåVegneAvGrunner({
                                    ...props.godkjentPåVegneAvGrunner,
                                    klarerIkkeGiFaTilgang: event.currentTarget.checked,
                                })
                            }
                        >
                            klarer ikke få eller gi tilgang
                        </Checkbox>
                        <Checkbox
                            value="vetIkkeHvemSomKanGiTilgang"
                            onChange={(event) =>
                                props.setGodkjentPåVegneAvGrunner({
                                    ...props.godkjentPåVegneAvGrunner,
                                    vetIkkeHvemSomKanGiTilgang: event.currentTarget.checked,
                                })
                            }
                        >
                            vet ikke hvem som kan gi tilgang
                        </Checkbox>
                        <Checkbox
                            value="farIkkeTilgangPersonvern"
                            onChange={(event) =>
                                props.setGodkjentPåVegneAvGrunner({
                                    ...props.godkjentPåVegneAvGrunner,
                                    farIkkeTilgangPersonvern: event.currentTarget.checked,
                                })
                            }
                        >
                            får ikke tilgang på grunn av personvern
                        </Checkbox>
                    </CheckboxGroup>
                )}
            </Fieldset>
        </div>
    );
};

export default GodkjennPåVegneAvArbeidsgiverCheckboxer;
