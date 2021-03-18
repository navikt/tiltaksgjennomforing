import { ReactComponent as AvtaleparterIkon } from '@/assets/ikoner/avtaleparter.svg';
import { ReactComponent as CheckCircleIkon } from '@/assets/ikoner/check.svg';
import { ReactComponent as MobilIkon } from '@/assets/ikoner/digitalAvtale.svg';
import TilbakeTilOversiktLenke from '@/AvtaleSide/TilbakeTilOversiktLenke/TilbakeTilOversiktLenke';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import Banner from '@/komponenter/Banner/Banner';
import Dokumenttittel from '@/komponenter/Dokumenttittel';
import EkspanderbartPanelRad from '@/komponenter/EkspanderbartPanelRad/EkspanderbartPanelRad';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import useValidering from '@/komponenter/useValidering';
import { tiltakstypeTekst } from '@/messages';
import { pathTilOpprettAvtaleFullfortArbeidsgiver } from '@/paths';
import { opprettAvtaleSomArbeidsgiver } from '@/services/rest-service';
import { TiltaksType } from '@/types/avtale';
import { UfullstendigError } from '@/types/errors';
import amplitude from '@/utils/amplitude';
import BEMHelper from '@/utils/bem';
import { validerFnr } from '@/utils/fnrUtils';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Input, RadioPanel } from 'nav-frontend-skjema';
import { Element, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import React, { ChangeEvent, FunctionComponent, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './OpprettAvtaleArbeidsgiver.less';

const cls = BEMHelper('opprett-avtale-arbeidsgiver');

type Props = {};

const OpprettAvtaleArbeidsgiver: FunctionComponent<Props> = props => {
    const [deltakerFnr, setDeltakerFnr] = useState('');
    const [valgtTiltaksType, setTiltaksType] = useState<TiltaksType | undefined>(undefined);
    const innloggetBruker = useContext(InnloggetBrukerContext);
    const history = useHistory();

    const [deltakerFnrFeil, setDeltakerFnrFeil, validerDeltakerFnr] = useValidering(deltakerFnr, [
        verdi => {
            if (!verdi) {
                return { feilmelding: 'Fødselsnummer er påkrevd' };
            }
        },
        verdi => {
            if (!validerFnr(verdi)) {
                return { feilmelding: 'Ugyldig fødselsnummer' };
            }
        },
    ]);

    const fnrOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        const verdi = event.target.value.replace(/\D/g, '');
        if (/^\d{0,11}$/.test(verdi)) {
            setDeltakerFnr(verdi);
            setDeltakerFnrFeil(undefined);
        }
    };

    const hvaMangler = () => {
        const feil = [];
        if (!valgtTiltaksType) {
            feil.push('avtaletype');
        }
        if (!validerFnr(deltakerFnr)) {
            feil.push('gyldig fødselsnummer for deltaker');
        }
        if (feil.length) {
            return 'Du må oppgi: ' + feil.join(', ');
        } else {
            return '';
        }
    };

    const opprettAvtaleKlikk = async () => {
        const hvaSomManglerTekst = hvaMangler();
        if (!hvaSomManglerTekst && valgtTiltaksType) {
            const avtale = await opprettAvtaleSomArbeidsgiver(deltakerFnr, valgtBedriftNr, valgtTiltaksType);
            amplitude.logEvent('#tiltak-avtale-opprettet-arbeidsgiver', { tiltakstype: valgtTiltaksType });
            history.push({
                pathname: pathTilOpprettAvtaleFullfortArbeidsgiver(avtale.id),
                search: window.location.search,
            });
        } else {
            throw new UfullstendigError(hvaSomManglerTekst);
        }
    };

    const valgtBedriftNr = new URLSearchParams(window.location.search).get('bedrift')!;
    const valgtBedriftNavn = innloggetBruker.altinnOrganisasjoner.find(org => org.OrganizationNumber === valgtBedriftNr)
        ?.Name;

    return (
        <>
            <Dokumenttittel tittel="Opprett avtale" />
            <Banner tekst="Opprett avtale" />
            <div className={cls.className}>
                <Innholdsboks className={cls.element('innholdsboks')}>
                    <Systemtittel className={cls.element('innholdstittel')}>Hvem skal inngå i avtalen</Systemtittel>
                    <VerticalSpacer rem={1} />
                    <div className="opprett-avtale__input-wrapper">
                        <div className="opprett-avtale__kandidat-fnr">
                            <Input
                                className="typo-element"
                                label="Deltakers fødselsnummer"
                                value={deltakerFnr}
                                onChange={fnrOnChange}
                                onBlur={validerDeltakerFnr}
                                feil={deltakerFnrFeil}
                            />
                        </div>

                        <div className="opprett-avtale__arbeidsgiver-bedriftNr">
                            <Input
                                className="typo-element"
                                label="Opprettes på bedrift"
                                value={`${valgtBedriftNavn} (${valgtBedriftNr})`}
                                disabled={true}
                            />
                        </div>
                    </div>
                </Innholdsboks>

                <Innholdsboks className={cls.element('innholdsboks')}>
                    <Systemtittel className={cls.element('innholdstittel')}>Velg type avtale</Systemtittel>
                    <VerticalSpacer rem={1} />
                    <Normaltekst>
                        Du kan kun opprette tiltaktstyper du har tilgang til i virksomheten du har valgt.
                    </Normaltekst>
                    <VerticalSpacer rem={1} />
                    <div className={cls.element('tiltakstypeWrapper')}>
                        {innloggetBruker.tilganger[valgtBedriftNr]
                            ?.filter(t => t !== 'SOMMERJOBB')
                            .map(t => (
                                <RadioPanel
                                    name="tiltakstype"
                                    label={tiltakstypeTekst[t]}
                                    value={t}
                                    checked={valgtTiltaksType === t}
                                    onChange={() => setTiltaksType(t)}
                                />
                            ))}
                    </div>
                </Innholdsboks>

                <Ekspanderbartpanel tittel={<Element>Slik fungerer løsningen</Element>} border={true}>
                    <EkspanderbartPanelRad svgIkon={<MobilIkon />} headerTekst={{ tekst: 'Digital avtale' }}>
                        Dette er en digital avtale om tiltak som skal brukes av deltaker, arbeidsgiver og veileder ved
                        NAV.
                    </EkspanderbartPanelRad>
                    <EkspanderbartPanelRad
                        svgIkon={<AvtaleparterIkon width="50" height="50" />}
                        headerTekst={{ tekst: 'Tre parter' }}
                    >
                        <Normaltekst>Deltaker, arbeidsgiver og veileder skal fylle ut avtalen sammen.</Normaltekst>
                        <Normaltekst>
                            Når du har opprettet avtalen kan du starte å fylle den ut, samtidig som den blir
                            tilgjengelig for veileder på NAV-kontoret til deltakeren. Tiltaket kan starte når veileder
                            har fordelt avtalen og godkjent den. I avtalene om midlertidig og varig lønnstilskudd er det
                            noe informasjon som veileder må fylle ut før den kan godkjennes.
                        </Normaltekst>
                    </EkspanderbartPanelRad>
                    <EkspanderbartPanelRad
                        svgIkon={<CheckCircleIkon width="50" height="50" />}
                        headerTekst={{ tekst: 'Godkjenning' }}
                    >
                        Til slutt må deltaker, arbeidsgiver og veileder godkjenne avtalen slik at tiltaket kan starte.
                    </EkspanderbartPanelRad>
                </Ekspanderbartpanel>

                <AlertStripeInfo>
                    <Element>Dette skjer etter at du har opprettet avtalen</Element>
                    <Normaltekst>
                        <ul>
                            <li>Du kan begynne å fylle ut avtalen.</li>
                            <li>
                                Avtalen blir tilgjengelig for veilederne på NAV kontoret til deltakeren. Når avtalen har
                                blitt fordelt til en veileder vil du se kontaktinformasjonen til denne veilederen inne i
                                avtalen.
                            </li>
                        </ul>
                    </Normaltekst>
                </AlertStripeInfo>

                <div className={cls.element('knappRad')}>
                    <LagreKnapp lagre={opprettAvtaleKlikk} label={'Opprett avtale'} className="opprett-avtale__knapp" />
                    <TilbakeTilOversiktLenke />
                </div>
            </div>
        </>
    );
};

export default OpprettAvtaleArbeidsgiver;
