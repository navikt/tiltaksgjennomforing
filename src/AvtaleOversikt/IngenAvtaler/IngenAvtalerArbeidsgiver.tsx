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
    | { tilstand: Tilstand.IkkeTilgangPåValgtTiltakIValgtBedrift; tiltakNavn: string; bedriftNavn: string }
    | { tilstand: Tilstand.TilgangPåValgtTiltakIValgtBedrift; tiltakNavn: string; bedriftNavn: string }
    | {
          tilstand: Tilstand.ValgtAlleHarIkkeAlleTiltakstyper;
          tilgangerJegHar: TiltaksType[];
          tilgangerJegIkkeHar: TiltaksType[];
          bedriftNavn: string;
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
        return { tilstand: Tilstand.IkkeTilgangPåValgtBedrift, bedriftNavn, tilgangerJegIkkeHar: alleTilganger };
    }

    if (valgtTiltakstype) {
        // har valgt bedrift og en gitt tiltakstype
        const tiltakNavn = tiltakstypeTekst[valgtTiltakstype];

        if (!tilganger[valgtBedrift].includes(valgtTiltakstype)) {
            return {
                tilstand: Tilstand.IkkeTilgangPåValgtTiltakIValgtBedrift,
                tiltakNavn,
                bedriftNavn,
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
    const [beOmRettighetUrler, setBeOmRettighetUrler] = useState<BeOmRettigheterUrl[]>([]);
    useEffect(() => {
        if (valgtBedriftNr) {
            hentBeOmRettighetUrler(valgtBedriftNr).then(setBeOmRettighetUrler);
        }
    }, [valgtBedriftNr]);

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
                <Innholdsboks>
                    <div className={cls.element('container')}>
                        <div className={cls.element('headerContainer')}>
                            <InfoIkon className={cls.element('headerIkon')} />
                            <Innholdstittel>Ingen tilganger på tiltak</Innholdstittel>
                        </div>
                        <Normaltekst>
                            Du har dessverre ikke tilgang på noen tiltak i {tilstand.bedriftNavn}.
                        </Normaltekst>
                        <VerticalSpacer rem={1} />
                        <ul>
                            {beOmRettighetUrler.map(({ tiltakstype, url }) => (
                                <>
                                    <li key={tiltakstype}>
                                        <EksternLenke href={url}>
                                            Be om tilgang til {tiltakstypeTekst[tiltakstype]} i Altinn her
                                        </EksternLenke>
                                    </li>
                                    <VerticalSpacer rem={0.5} />
                                </>
                            ))}
                        </ul>
                    </div>
                </Innholdsboks>
            );
        case Tilstand.IkkeTilgangPåValgtTiltakIValgtBedrift:
            return (
                <Innholdsboks>
                    <div className={cls.element('container')}>
                        <div className={cls.element('headerContainer')}>
                            <InfoIkon className={cls.element('headerIkon')} />
                            <Innholdstittel>Ikke tilgang på tiltak</Innholdstittel>
                        </div>
                        <Normaltekst>
                            Du har dessverre ikke tilgang på <b>{tilstand.tiltakNavn}</b> i {tilstand.bedriftNavn}.
                        </Normaltekst>
                        <VerticalSpacer rem={1} />
                        <EksternLenke
                            href={
                                beOmRettighetUrler.find(
                                    ({ tiltakstype }) => tiltakstype === props.sokekriterier.tiltakstype
                                )?.url ?? ''
                            }
                        >
                            Be om tilgang i Altinn her
                        </EksternLenke>
                    </div>
                </Innholdsboks>
            );
        case Tilstand.TilgangPåValgtTiltakIValgtBedrift:
            return (
                <Innholdsboks>
                    <div className={cls.element('container')}>
                        <div>
                            <div className={cls.element('headerContainer')}>
                                <InfoIkon className={cls.element('headerIkon')} />
                                <Innholdstittel>Ingen avtaler</Innholdstittel>
                            </div>
                            <Normaltekst>
                                Det har ikke blitt opprettet noen avtaler om {tilstand.tiltakNavn} på{' '}
                                {tilstand.bedriftNavn}.
                            </Normaltekst>
                        </div>
                    </div>
                </Innholdsboks>
            );
        case Tilstand.ValgtAlleHarIkkeAlleTiltakstyper:
            return (
                <Innholdsboks>
                    <Normaltekst tag="div">
                        Du har ingen avtaler her enda. Du har rettigheter i bedriften til
                        <ul>
                            {tilstand.tilgangerJegHar.map(tiltakstype => (
                                <li key={tiltakstype}>{tiltakstypeTekst[tiltakstype]}</li>
                            ))}
                        </ul>
                        <VerticalSpacer twentyPx={true} />
                    </Normaltekst>
                    <VerticalSpacer thirtyTwoPx={true} />
                    <Systemtittel>Hvordan får jeg tilgang på andre tiltak?</Systemtittel>
                    <VerticalSpacer sixteenPx={true} />
                    <Normaltekst tag="div">
                        Hvis du er ute etter en avtale om et annet tiltak, må du i Altinn ha korrekt tilgang:
                        <ul>
                            {beOmRettighetUrler.length &&
                                tilstand.tilgangerJegIkkeHar
                                    .map(t => beOmRettighetUrler.find(({ tiltakstype }) => tiltakstype === t)!)
                                    .map(({ tiltakstype, url }) => (
                                        <li key={tiltakstype}>
                                            {tiltakstypeTekst[tiltakstype]} (
                                            <EksternLenke href={url}>Be om tilgang i Altinn</EksternLenke>)
                                        </li>
                                    ))}
                        </ul>
                        <EksternLenke href="https://www.altinn.no/hjelp/profil/roller-og-rettigheter/">
                            Les mer om roller og rettigheter på Altinn.no
                        </EksternLenke>
                    </Normaltekst>
                </Innholdsboks>
            );
        case Tilstand.ValgtAlleHarAlleTiltakstyper:
            return (
                <Innholdsboks>
                    <div className={cls.element('container')}>
                        <div>
                            <div className={cls.element('headerContainer')}>
                                <InfoIkon className={cls.element('headerIkon')} />
                                <Innholdstittel>Ingen avtaler</Innholdstittel>
                            </div>
                            <Normaltekst>
                                Det har ikke blitt opprettet noen avtaler på {tilstand.bedriftNavn}.
                            </Normaltekst>
                        </div>
                    </div>
                </Innholdsboks>
            );
        default:
            return null;
    }
};

export default IngenAvtalerArbeidsgiver;
