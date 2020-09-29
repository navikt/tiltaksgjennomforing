import { ReactComponent as InfoIkon } from '@/assets/ikoner/info.svg';
import { DuManglerRettigheterIAltinn } from '@/AvtaleOversikt/IngenAvtaler/DuManglerRettigheterIAltinn';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import EksternLenke from '@/komponenter/navigation/EksternLenke';
import { tiltakstypeTekst } from '@/messages';
import { BeOmRettigheterUrl, hentBeOmRettighetUrler } from '@/services/rest-service';
import { Avtale, TiltaksType } from '@/types/avtale';
import BEMHelper from '@/utils/bem';
import { Organisasjon } from '@navikt/bedriftsmeny/lib/organisasjon';
import { Innholdstittel, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import './IngenAvtalerArbeidsgiver.less';
import { IkkeTilgangPåValgtBedrift } from '@/AvtaleOversikt/IngenAvtaler/IkkeTilgangPåValgtBedrift';
import { IkkeTilgangPåValgtTiltakIValgtBedrift } from '@/AvtaleOversikt/IngenAvtaler/IkkeTilgangPåValgtTiltakIValgtBedrift';
import { TilgangPåValgtTiltakIValgtBedrift } from '@/AvtaleOversikt/IngenAvtaler/TilgangPåValgtTiltakIValgtBedrift';
import { ValgtAlleHarIkkeAlleTiltakstyper } from '@/AvtaleOversikt/IngenAvtaler/ValgtAlleHarIkkeAlleTiltakstyper';
import { ValgtAlleHarAlleTiltakstyper } from '@/AvtaleOversikt/IngenAvtaler/ValgtAlleHarAlleTiltakstyper';
import useBeOmRettigheter from '@/AvtaleOversikt/IngenAvtaler/useBeOmRettigheter';

type Props = {
    sokekriterier: Partial<Avtale>;
};

const cls = BEMHelper('ingenAvtalerArbeidsgiver');

enum Tilstand {
    'IkkeTilgangPåNoenBedrifter',
    'IkkeTilgangPåValgtBedrift',
    'IkkeTilgangPåValgtTiltakIValgtBedrift',
    'TilgangPåValgtTiltakIValgtBedrift',
    'ValgtAlleHarIkkeAlleTiltakstyper',
    'ValgtAlleHarAlleTiltakstyper',
    'Ugyldig',
}

type Tilstander =
    | { tilstand: Tilstand.IkkeTilgangPåNoenBedrifter }
    | { tilstand: Tilstand.IkkeTilgangPåValgtBedrift; bedriftNavn: string; tilgangerJegIkkeHar: TiltaksType[] }
    | {
          tilstand: Tilstand.IkkeTilgangPåValgtTiltakIValgtBedrift;
          tiltakNavn: string;
          tiltakstype: TiltaksType;
          bedriftNr: string;
          bedriftNavn: string;
      }
    | { tilstand: Tilstand.TilgangPåValgtTiltakIValgtBedrift; tiltakNavn: string; bedriftNavn: string }
    | {
          tilstand: Tilstand.ValgtAlleHarIkkeAlleTiltakstyper;
          tilgangerJegHar: TiltaksType[];
          tilgangerJegIkkeHar: TiltaksType[];
          bedriftNavn: string;
          bedriftNr: string;
      }
    | { tilstand: Tilstand.ValgtAlleHarAlleTiltakstyper; bedriftNavn: string };

type TilstanderFunksjon = (
    valgtBedrift: string | undefined,
    valgtTiltakstype: TiltaksType | undefined,
    altinnOrganisasjoner: Organisasjon[],
    tilganger: { [bedriftNr: string]: TiltaksType[] }
) => Tilstander;

const alleTilganger: TiltaksType[] = ['ARBEIDSTRENING', 'MIDLERTIDIG_LONNSTILSKUDD', 'VARIG_LONNSTILSKUDD'];

const logikk: TilstanderFunksjon = (valgtBedrift, valgtTiltakstype, altinnOrganisasjoner, tilganger) => {
    if (!valgtBedrift) {
        return { tilstand: Tilstand.IkkeTilgangPåNoenBedrifter };
    }

    const bedriftNavn = altinnOrganisasjoner.find(org => org.OrganizationNumber === valgtBedrift)?.Name || '';

    if (!tilganger[valgtBedrift] || tilganger[valgtBedrift].length === 0) {
        return {
            tilstand: Tilstand.IkkeTilgangPåValgtBedrift,
            bedriftNavn,
            bedriftNr: valgtBedrift,
            tilgangerJegIkkeHar: alleTilganger,
        };
    }

    if (valgtTiltakstype) {
        // har valgt bedrift og en gitt tiltakstype
        const tiltakNavn = tiltakstypeTekst[valgtTiltakstype];

        if (!tilganger[valgtBedrift].includes(valgtTiltakstype)) {
            return {
                tilstand: Tilstand.IkkeTilgangPåValgtTiltakIValgtBedrift,
                tiltakNavn,
                bedriftNavn,
                tiltakstype: valgtTiltakstype,
                bedriftNr: valgtBedrift,
            };
        } else {
            return { tilstand: Tilstand.TilgangPåValgtTiltakIValgtBedrift, tiltakNavn, bedriftNavn };
        }
    }

    if (tilganger[valgtBedrift].length < alleTilganger.length) {
        const tilgangerJegHar = tilganger[valgtBedrift];
        const tilgangerJegIkkeHar = alleTilganger.filter(tilgang => !tilgangerJegHar.includes(tilgang));

        return {
            tilstand: Tilstand.ValgtAlleHarIkkeAlleTiltakstyper,
            tilgangerJegHar,
            tilgangerJegIkkeHar,
            bedriftNavn,
        };
    } else {
        return { tilstand: Tilstand.ValgtAlleHarAlleTiltakstyper, bedriftNavn };
    }
};

const IngenAvtalerArbeidsgiver: FunctionComponent<Props> = props => {
    const innloggetBruker = useContext(InnloggetBrukerContext);

    const valgtBedriftNr = props.sokekriterier.bedriftNr;

    const tilstand = logikk(
        valgtBedriftNr,
        props.sokekriterier.tiltakstype,
        innloggetBruker.altinnOrganisasjoner,
        innloggetBruker.tilganger
    );

    switch (tilstand.tilstand) {
        case Tilstand.IkkeTilgangPåNoenBedrifter:
            return <DuManglerRettigheterIAltinn />;
        case Tilstand.IkkeTilgangPåValgtBedrift:
            return (
                <IkkeTilgangPåValgtBedrift
                    bedriftNavn={tilstand.bedriftNavn}
                    tilgangerJegIkkeHar={tilstand.tilgangerJegIkkeHar}
                />
            );
        case Tilstand.IkkeTilgangPåValgtTiltakIValgtBedrift:
            return <IkkeTilgangPåValgtTiltakIValgtBedrift {...tilstand} />;
        case Tilstand.TilgangPåValgtTiltakIValgtBedrift:
            return (
                <TilgangPåValgtTiltakIValgtBedrift
                    tiltakNavn={tilstand.tiltakNavn}
                    bedriftNavn={tilstand.bedriftNavn}
                />
            );
        case Tilstand.ValgtAlleHarIkkeAlleTiltakstyper:
            return <ValgtAlleHarIkkeAlleTiltakstyper {...tilstand} />;
        case Tilstand.ValgtAlleHarAlleTiltakstyper:
            return <ValgtAlleHarAlleTiltakstyper {...tilstand} />;
        default:
            return null;
    }
};

export default IngenAvtalerArbeidsgiver;
