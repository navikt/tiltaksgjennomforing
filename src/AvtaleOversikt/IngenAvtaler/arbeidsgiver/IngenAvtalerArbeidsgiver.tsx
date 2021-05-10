import DuManglerRettigheterIAltinn from '@/AvtaleOversikt/IngenAvtaler/arbeidsgiver/DuManglerRettigheterIAltinn';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import { tiltakstypeTekst } from '@/messages';
import { TiltaksType } from '@/types/avtale';
import React, { FunctionComponent, useContext } from 'react';
import BoksMedTekstOgTilgangstabell from './BoksMedTekstOgTilgangstabell';
import './IngenAvtalerArbeidsgiver.less';
import { storForbokstav } from '@/utils/stringUtils';

type Props = {
    bedriftNr?: string;
    tiltakstype?: TiltaksType;
};

const IngenAvtalerArbeidsgiver: FunctionComponent<Props> = props => {
    const { tilganger, altinnOrganisasjoner } = useContext(InnloggetBrukerContext);

    if (!props.bedriftNr) {
        return <DuManglerRettigheterIAltinn />;
    }

    const valgtBedrift = altinnOrganisasjoner.find(o => o.OrganizationNumber === props.bedriftNr)!;
    const bedriftNavnOgNummer = `${valgtBedrift.Name} (${valgtBedrift.OrganizationNumber})`;

    const fellesProps = { bedriftNr: props.bedriftNr, tilganger, bedriftNavnOgNummer };

    if (!tilganger[props.bedriftNr] || tilganger[props.bedriftNr].length === 0) {
        return (
            <BoksMedTekstOgTilgangstabell
                {...fellesProps}
                overskrift={`Du mangler tilgang til alle tiltakstypene i ${bedriftNavnOgNummer}`}
                visTekst={false}
            />
        );
    }

    if (props.tiltakstype) {
        if (tilganger[props.bedriftNr].includes(props.tiltakstype)) {
            // Har tilgang til valgt tiltakstype
            return (
                <BoksMedTekstOgTilgangstabell
                    {...fellesProps}
                    overskrift={`Finner ingen avtaler i ${bedriftNavnOgNummer}`}
                    visTekst={true}
                />
            );
        } else {
            return (
                <BoksMedTekstOgTilgangstabell
                    {...fellesProps}
                    overskrift={`Du mangler tilgang til ${storForbokstav(
                        tiltakstypeTekst[props.tiltakstype]
                    )} i ${bedriftNavnOgNummer}`}
                    visTekst={false}
                />
            );
        }
    }

    // Har ikke valgt tiltakstype. Har en eller alle tilganger
    return (
        <BoksMedTekstOgTilgangstabell
            {...fellesProps}
            overskrift={`Finner ingen avtaler i ${bedriftNavnOgNummer}`}
            visTekst={true}
        />
    );
};

export default IngenAvtalerArbeidsgiver;
