import { ReactComponent as InfoIkon } from '@/assets/ikoner/info.svg';
import { DuManglerRettigheterIAltinn } from '@/AvtaleOversikt/IngenAvtaler/DuManglerRettigheterIAltinn';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import EksternLenke from '@/komponenter/navigation/EksternLenke';
import { tiltakstypeTekst } from '@/messages';
import { Avtale, TiltaksType } from '@/types/avtale';
import BEMHelper from '@/utils/bem';
import { Innholdstittel, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import React, { FunctionComponent, useContext } from 'react';
import './IngenAvtalerArbeidsgiver.less';

type Props = {
    sokekriterier: Partial<Avtale>;
};

const cls = BEMHelper('ingenAvtalerArbeidsgiver');

const IngenAvtalerArbeidsgiver: FunctionComponent<Props> = props => {
    const alleTilganger: TiltaksType[] = ['ARBEIDSTRENING', 'MIDLERTIDIG_LONNSTILSKUDD', 'VARIG_LONNSTILSKUDD'];
    const innloggetBruker = useContext(InnloggetBrukerContext);

    const antallOrgTilgangTil = innloggetBruker.altinnOrganisasjoner.length;
    const harTilgangPaMinstEnOrg = antallOrgTilgangTil > 0;

    if (!harTilgangPaMinstEnOrg) {
        return <DuManglerRettigheterIAltinn />;
    }

    const valgtBedriftNr = props.sokekriterier.bedriftNr!;
    const valgtBedriftNavn = innloggetBruker.altinnOrganisasjoner.find(org => org.OrganizationNumber === valgtBedriftNr)
        ?.Name;

    const serviceKoder = {
        ARBEIDSTRENING: '5532_1',
        MIDLERTIDIG_LONNSTILSKUDD: '5516_1',
        VARIG_LONNSTILSKUDD: '5516_2',
        MENTOR: '5216_1',
    };
    const valgtServiceKode = props.sokekriterier.tiltakstype && serviceKoder[props.sokekriterier.tiltakstype];

    //const tilgangerJegIkkeHar = alleTilganger.filter(tilgang => !innloggetBruker.tilganger[valgtBedriftNr].includes(tilgang));
    const tilgangerJegHar = innloggetBruker.tilganger[valgtBedriftNr] || [];
    const tilgangerJegIkkeHar = alleTilganger.filter(tilgang => !tilgangerJegHar.includes(tilgang));

    if (tilgangerJegHar.length === 0) {
        return (
            <Innholdsboks>
                <div className={cls.element('container')}>
                    <div className={cls.element('headerContainer')}>
                        <InfoIkon className={cls.element('headerIkon')} />
                        <Innholdstittel>Ingen tilganger på tiltak</Innholdstittel>
                    </div>
                    <Normaltekst>Du har dessverre ikke tilgang på noen tiltak i {valgtBedriftNavn}.</Normaltekst>
                    <VerticalSpacer rem={1} />
                    <ul>
                        {Object.keys(serviceKoder)
                            .filter(sc => sc !== 'MENTOR')
                            .map(sc => (
                                <>
                                    <li key={sc}>
                                        <EksternLenke
                                            href={`https://tt02.altinn.no/ui/DelegationRequest?offeredBy=${valgtBedriftNr}&resources=${
                                                serviceKoder[sc as TiltaksType]
                                            }`}
                                        >
                                            Be om tilgang til {tiltakstypeTekst[sc as TiltaksType]} i Altinn her
                                        </EksternLenke>
                                    </li>
                                    <VerticalSpacer rem={0.5} />
                                </>
                            ))}
                    </ul>
                </div>
            </Innholdsboks>
        );
    }

    const harTilgangPaTiltakstypeIValgtBedrift = () => {
        if (props.sokekriterier.tiltakstype) {
            return innloggetBruker.tilganger[valgtBedriftNr].includes(props.sokekriterier.tiltakstype);
        }
        return true;
    };

    if (!harTilgangPaTiltakstypeIValgtBedrift()) {
        return (
            <Innholdsboks>
                <div className={cls.element('container')}>
                    <div className={cls.element('headerContainer')}>
                        <InfoIkon className={cls.element('headerIkon')} />
                        <Innholdstittel>Ikke tilgang på tiltak</Innholdstittel>
                    </div>
                    <Normaltekst>
                        Du har dessverre ikke tilgang på{' '}
                        <b>{tiltakstypeTekst[props.sokekriterier.tiltakstype as TiltaksType]}</b> i {valgtBedriftNavn}.
                    </Normaltekst>
                    <VerticalSpacer rem={1} />
                    <EksternLenke
                        href={`https://tt02.altinn.no/ui/DelegationRequest?offeredBy=${valgtBedriftNr}&resources=${valgtServiceKode}`}
                    >
                        Be om tilgang i Altinn her
                    </EksternLenke>
                </div>
            </Innholdsboks>
        );
    }

    return (
        <div>
            <Innholdsboks>
                <div className={cls.element('container')}>
                    <div>
                        <div className={cls.element('headerContainer')}>
                            <InfoIkon className={cls.element('headerIkon')} />
                            <Innholdstittel>Ingen avtaler</Innholdstittel>
                        </div>
                        {props.sokekriterier.tiltakstype && harTilgangPaTiltakstypeIValgtBedrift() ? (
                            <Normaltekst>
                                Det har ikke blitt opprettet noen avtaler om{' '}
                                {tiltakstypeTekst[props.sokekriterier.tiltakstype]}.
                            </Normaltekst>
                        ) : (
                            <>
                                <Normaltekst tag="div">
                                    Du har ingen avtaler her enda. Du har rettigheter i bedriften til
                                    <ul>
                                        {tilgangerJegHar.map(tiltakstype => (
                                            <li key={tiltakstype}>{tiltakstypeTekst[tiltakstype]}</li>
                                        ))}
                                    </ul>
                                    <VerticalSpacer twentyPx={true} />
                                </Normaltekst>
                                <VerticalSpacer thirtyTwoPx={true} />
                                <Systemtittel>Hvordan får jeg tilgang på andre tiltak?</Systemtittel>
                                <VerticalSpacer sixteenPx={true} />
                                <Normaltekst tag="div">
                                    Hvis du er ute etter en avtale om et annet tiltak, må du i Altinn ha korrekt
                                    tilgang:
                                    <ul>
                                        {tilgangerJegIkkeHar.map(t => (
                                            <li key={t}>{tiltakstypeTekst[t as TiltaksType]}</li>
                                        ))}
                                    </ul>
                                    <EksternLenke href="https://www.altinn.no/hjelp/profil/roller-og-rettigheter/">
                                        Les mer om roller og rettigheter på Altinn.no
                                    </EksternLenke>
                                </Normaltekst>
                            </>
                        )}
                    </div>
                </div>
            </Innholdsboks>
        </div>
    );
};

export default IngenAvtalerArbeidsgiver;
