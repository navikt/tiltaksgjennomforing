import * as React from 'react';
import { FunctionComponent } from 'react';
import { ReactComponent as VarselIkon } from '@/assets/ikoner/varsel.svg';
import { Ingress, Innholdstittel, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import EksternLenke from '@/komponenter/navigation/EksternLenke';
import BEMHelper from '@/utils/bem';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';

const cls = BEMHelper('ingenAvtalerArbeidsgiver');

export const DuManglerRettigheterIAltinn: FunctionComponent = () => {
    return (
        <Innholdsboks>
            <div className={cls.element('headerContainer')}>
                <VarselIkon className={cls.element('headerIkon')} />
                <Innholdstittel>Du mangler rettigheter i Altinn</Innholdstittel>
            </div>
            <div>
                <Ingress>
                    Du har ikke nødvendig tilgang på noen bedrifter. Tilgang til avtaler på din bedrift forutsetter at
                    du har fått tildelt korrekt rolle eller rettighet i Altinn.
                </Ingress>
                <VerticalSpacer thirtyTwoPx={true} />
                <Normaltekst>
                    <Systemtittel>Hvordan får jeg tilgang?</Systemtittel>
                    <VerticalSpacer sixteenPx={true} />
                    For å få tilgang på avtaler til din bedrift må du i Altinn ha en av enkelttjenestene
                    <ul>
                        <li>Avtale om arbeidstrening</li>
                        <li>Avtale om midlertidig lønnstilskudd</li>
                        <li>Avtale om varig lønnstilskudd</li>
                    </ul>
                </Normaltekst>

                <div className={cls.element('rolleinfo')}>
                    <Systemtittel>Hvem kan gi deg tilgang?</Systemtittel>
                    <VerticalSpacer sixteenPx={true} />
                    <Normaltekst>
                        Det er virksomheten din som må gi deg tilgang. Tilgang kan delegeres av personer som selv har
                        tilgang, dersom de også har rollen Tilgangsstyring.
                        <VerticalSpacer sixteenPx={true} />
                        <div>
                            I store virksomheter er det vanlig at HR-personell har fått tilgangsstyring fra ledelsen for
                            å kunne delegere Altinn-roller på vegne av virksomheten. Hvis tilgangsstyring ikke er
                            delegert til HR-personell må man få tildelt tilgang fra daglig leder eller andre fra
                            eiersiden.
                            <VerticalSpacer twentyPx={true} />
                            <EksternLenke href="https://www.altinn.no/hjelp/profil/roller-og-rettigheter/">
                                Les mer om roller og rettigheter på Altinn.no
                            </EksternLenke>
                        </div>
                    </Normaltekst>
                </div>
            </div>
        </Innholdsboks>
    );
};
