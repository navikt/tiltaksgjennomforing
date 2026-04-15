import DuManglerRettigheterIAltinn from '@/AvtaleOversikt/IngenAvtaler/arbeidsgiver/DuManglerRettigheterIAltinn';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import { tiltakstypeTekst } from '@/messages';
import { TiltaksType } from '@/types/avtale';
import { storForbokstav } from '@/utils/stringUtils';
import { findRecursive } from '@navikt/virksomhetsvelger';
import { FunctionComponent, useContext } from 'react';
import BoksMedTekstOgTilgangstabell from './BoksMedTekstOgTilgangstabell';
import './IngenAvtalerArbeidsgiver.less';

type Props = {
    bedriftNr?: string;
    tiltakstype?: TiltaksType;
};

const IngenAvtalerArbeidsgiver: FunctionComponent<Props> = (props) => {
    const { altinnTilganger } = useContext(InnloggetBrukerContext);

    if (!props.bedriftNr) {
        return <DuManglerRettigheterIAltinn />;
    }

    const valgtBedrift = findRecursive(altinnTilganger.hierarki, (o) => o.orgnr === props.bedriftNr);
    const bedriftNavnOgNummer = valgtBedrift ? `${valgtBedrift.navn} (${valgtBedrift.orgnr})` : props.bedriftNr;

    const fellesProps = { bedriftNr: props.bedriftNr, tilganger: altinnTilganger.tilganger, bedriftNavnOgNummer };

    if (!altinnTilganger.tilganger[props.bedriftNr] || altinnTilganger.tilganger[props.bedriftNr].length === 0) {
        return (
            <BoksMedTekstOgTilgangstabell
                {...fellesProps}
                overskrift={`Du mangler tilgang til alle tiltakstypene i ${bedriftNavnOgNummer}`}
                visTekst={false}
            />
        );
    }

    if (props.tiltakstype) {
        if (altinnTilganger.tilganger[props.bedriftNr].includes(props.tiltakstype)) {
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
                        tiltakstypeTekst[props.tiltakstype],
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
