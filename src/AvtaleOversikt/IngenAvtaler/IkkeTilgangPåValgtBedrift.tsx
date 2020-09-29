import * as React from 'react';
import { FunctionComponent } from 'react';
import { TiltaksType } from "@/types/avtale";

type Props = {
    bedriftNavn: string; tilgangerJegIkkeHar: TiltaksType[]
};
export const IkkeTilgangPåValgtBedrift: FunctionComponent<Props> = props => {
    return (
        <div>

        </div>
    );
};