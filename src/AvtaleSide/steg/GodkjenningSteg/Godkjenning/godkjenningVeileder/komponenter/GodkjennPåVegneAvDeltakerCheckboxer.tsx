import { GodkjentPaVegneAvDeltakerGrunner } from '@/types/avtale';
import { CheckboxGroup, Checkbox } from '@navikt/ds-react';
import React, { Dispatch, FunctionComponent, PropsWithChildren, SetStateAction, useState } from 'react';

interface Props {
    godkjentPåVegneAvGrunner: GodkjentPaVegneAvDeltakerGrunner;
    setGodkjentPåVegneAvGrunner: Dispatch<SetStateAction<GodkjentPaVegneAvDeltakerGrunner>>;
    feilmeldingGrunn: string | undefined;
    setFeilmeldingGrunn: Dispatch<SetStateAction<string | undefined>>;
    className?: string;
    tiltakstype: string;
}

type PaVegneAvGrunner = 'ikkeBankId' | 'reservert' | 'digitalKompetanse' | '';

const GodkjennPåVegneAvDeltakerCheckboxer: FunctionComponent<Props> = ({
    feilmeldingGrunn,
    className,
    godkjentPåVegneAvGrunner,
    setGodkjentPåVegneAvGrunner,
}: PropsWithChildren<Props>) => {
    const [cause, setCause] = useState<PaVegneAvGrunner[]>(['']);

    return (
        <CheckboxGroup
            legend="Godkjenn på vegne av deltaker valg"
            error={feilmeldingGrunn}
            className={className}
            onChange={(value: any[]) => setCause(value)}
            value={cause}
        >
            <Checkbox
                value="ikkeBankId"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setGodkjentPåVegneAvGrunner({
                        ...godkjentPåVegneAvGrunner,
                        ikkeBankId: event.currentTarget.checked,
                    })
                }
            >
                har ikke BankID
            </Checkbox>
            <Checkbox
                value="reservert"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setGodkjentPåVegneAvGrunner({
                        ...godkjentPåVegneAvGrunner,
                        reservert: event.currentTarget.checked,
                    })
                }
            >
                har reservert seg mot digitale tjenester
            </Checkbox>
            <Checkbox
                value="digitalKompetanse"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setGodkjentPåVegneAvGrunner({
                        ...godkjentPåVegneAvGrunner,
                        digitalKompetanse: event.currentTarget.checked,
                    })
                }
            >
                mangler digital kompetanse
            </Checkbox>
        </CheckboxGroup>
    );
};

export default GodkjennPåVegneAvDeltakerCheckboxer;
