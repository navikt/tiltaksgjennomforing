import RammeMedIkonOgOverskrift from '@/AvtaleOversikt/IngenAvtaler/arbeidsgiver/RammeMedIkonOgOverskrift';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import EksternLenke from '@/komponenter/navigation/EksternLenke';
import BEMHelper from '@/utils/bem';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';

const cls = BEMHelper('ingenAvtalerArbeidsgiver');

const DuManglerRettigheterIAltinn: FunctionComponent = () => {
    return (
        <RammeMedIkonOgOverskrift overskrift="Du mangler rettigheter i Altinn">
            <Normaltekst>
                Du har ikke tilgang til tiltak for noen virksomheter. For å se avtaler om tiltak må du ha fått tildelt
                korrekt rolle eller rettighet i Altinn.
            </Normaltekst>
            <VerticalSpacer rem={2} />
            <Normaltekst>
                <Element>Hvordan får du tilgang?</Element>
                <VerticalSpacer rem={0.5} />
                For å få tilgang til avtaler for din virksomhet må du i Altinn ha en av enkelttjenestene
                <ul>
                    <li>Avtale om arbeidstrening</li>
                    <li>Avtale om inkluderingstilskudd</li>
                    <li>Avtale om tilskudd til mentor</li>
                    <li>Avtale om midlertidig lønnstilskudd</li>
                    <li>Avtale om varig lønnstilskudd</li>
                </ul>
            </Normaltekst>
            <VerticalSpacer rem={1} />
            <div className={cls.element('rolleinfo')}>
                <Element>Hvem kan gi deg tilgang?</Element>
                <VerticalSpacer rem={0.5} />
                <Normaltekst>
                    Det er virksomheten din som må gi deg tilgang. Tilgang kan delegeres av personer som selv har
                    tilgang, dersom de også har rollen Tilgangsstyring.
                    <VerticalSpacer rem={1} />
                    <div>
                        I store virksomheter er det vanlig at HR-personell har fått tilgangsstyring fra ledelsen for å
                        kunne delegere Altinn-roller på vegne av virksomheten. Hvis tilgangsstyring ikke er delegert til
                        HR-personell må man få tildelt tilgang fra daglig leder eller andre fra eiersiden.
                        <VerticalSpacer rem={1.25} />
                        <EksternLenke href="https://www.altinn.no/hjelp/profil/roller-og-rettigheter/">
                            Les mer om roller og rettigheter på Altinn.no
                        </EksternLenke>
                    </div>
                </Normaltekst>
            </div>
        </RammeMedIkonOgOverskrift>
    );
};

export default DuManglerRettigheterIAltinn;
