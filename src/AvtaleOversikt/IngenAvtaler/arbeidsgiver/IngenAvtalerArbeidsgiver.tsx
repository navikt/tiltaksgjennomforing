import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import { TiltaksType } from '@/types/avtale';
import React, { FunctionComponent, useContext } from 'react';
import './IngenAvtalerArbeidsgiver.less';
import DuManglerRettigheterIAltinn from '@/AvtaleOversikt/IngenAvtaler/arbeidsgiver/DuManglerRettigheterIAltinn';

import { tiltakstypeTekst } from '@/messages';
import BoksMedTekstOgTilgangstabell from './BoksMedTekstOgTilgangstabell';

type Props = {
    bedriftNr?: string;
    tiltakstype?: TiltaksType;
};

const IngenAvtalerArbeidsgiver: FunctionComponent<Props> = props => {
    const { tilganger } = useContext(InnloggetBrukerContext);

    if (!props.bedriftNr) {
        return <DuManglerRettigheterIAltinn />;
    }

    const fellesProps = { bedriftNr: props.bedriftNr, tilganger };

    if (!tilganger[props.bedriftNr] || tilganger[props.bedriftNr].length === 0) {
        return (
            <BoksMedTekstOgTilgangstabell
                {...fellesProps}
                overskrift={'Du mangler tilgang til alle tiltakstypene'}
                visTekst={false}
            />
        );
    }

    if (props.tiltakstype) {
        if (tilganger[props.bedriftNr].includes(props.tiltakstype)) {
            // Har tilgang til valgt tiltakstype
            return (
                <BoksMedTekstOgTilgangstabell {...fellesProps} overskrift={'Finner ingen avtaler'} visTekst={true} />
            );
        } else {
            return (
                <BoksMedTekstOgTilgangstabell
                    {...fellesProps}
                    overskrift={'Du mangler tilgang til ' + tiltakstypeTekst[props.tiltakstype]}
                    visTekst={false}
                />
            );
        }
    }

    // Har ikke valgt tiltakstype. Har en eller alle tilganger
    return <BoksMedTekstOgTilgangstabell {...fellesProps} overskrift={'Finner ingen avtaler'} visTekst={true} />;
};

export default IngenAvtalerArbeidsgiver;
