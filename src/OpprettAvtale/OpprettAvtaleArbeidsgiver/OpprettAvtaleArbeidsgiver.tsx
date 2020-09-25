import { ReactComponent as AvtaleSignering } from '@/assets/ikoner/avtaleSignering.svg';
import { ReactComponent as CheckCircleIkon } from '@/assets/ikoner/check-stroke.svg';
import { ReactComponent as DrofteMedAnsattePersonOpplysning } from '@/assets/ikoner/drofteMedAnsattePersonOpplysning.svg';
import TilbakeTilOversiktLenke from '@/AvtaleSide/TilbakeTilOversiktLenke/TilbakeTilOversiktLenke';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import Banner from '@/komponenter/Banner/Banner';
import EkspanderbartPanelRad from '@/komponenter/EkspanderbartPanelRad/EkspanderbartPanelRad';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import useValidering from '@/komponenter/useValidering';
import { tiltakstypeTekst } from '@/messages';
import { pathTilOpprettAvtaleFullfortArbeidsgiver, pathTilOpprettAvtaleFullfortVeileder } from '@/paths';
import { opprettAvtaleArbeidsgiver } from '@/services/rest-service';
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
    const [valgtTiltaksType, setTiltaksType] = useState<TiltaksType | undefined>();
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
        if (!hvaSomManglerTekst) {
            const avtale = await opprettAvtaleArbeidsgiver(deltakerFnr, valgtBedriftNr, valgtTiltaksType!);
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
                        {innloggetBruker.tilganger[valgtBedriftNr]?.map(t => (
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

                <Ekspanderbartpanel tittel="Slik fungerer løsningen" tittelProps="element" border>
                    <EkspanderbartPanelRad svgIkon={<AvtaleSignering />}>
                        Dette er en digital avtale om tiltak som skal brukes av deltaker, arbeidsgiver og veileder ved
                        NAV.
                    </EkspanderbartPanelRad>
                    <EkspanderbartPanelRad svgIkon={<DrofteMedAnsattePersonOpplysning />}>
                        Deltaker, arbeidsgiver og veileder skal fylle ut avtalen sammen. Der blir de enige om innholdet
                        i avtalen.
                    </EkspanderbartPanelRad>
                    <EkspanderbartPanelRad svgIkon={<CheckCircleIkon />}>
                        Til slutt må deltaker, arbeidsgiver og veileder godkjenne avtalen slik at tiltaket kan starte.
                    </EkspanderbartPanelRad>
                </Ekspanderbartpanel>

                <AlertStripeInfo>
                    <Element>Før du oppretter </Element>
                    <Normaltekst>
                        <ul>
                            <li> En veileder i NAV må akseptere avtaleutkastet før deltaker kan involveres.</li>
                            <li>
                                Du kan begynne å fylle ut avtalen før dette, men deltaker vil ikke få tilgang til den
                                før veileder har akseptert dette.
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
