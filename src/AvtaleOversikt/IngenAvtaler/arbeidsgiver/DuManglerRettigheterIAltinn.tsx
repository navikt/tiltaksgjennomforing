import RammeMedIkonOgOverskrift from '@/AvtaleOversikt/IngenAvtaler/arbeidsgiver/RammeMedIkonOgOverskrift';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import EksternLenke from '@/komponenter/navigation/EksternLenke';
import BEMHelper from '@/utils/bem';
import { Label, BodyShort } from '@navikt/ds-react';
import React, { FunctionComponent } from 'react';

const cls = BEMHelper('ingenAvtalerArbeidsgiver');

const DuManglerRettigheterIAltinn: FunctionComponent = () => {
    return (
        <RammeMedIkonOgOverskrift overskrift="Du mangler rettigheter i Altinn">
            <BodyShort size="small">
                Du har ikke tilgang til tiltak for noen virksomheter. For å se avtaler om tiltak må du ha fått tildelt
                korrekt rolle eller rettighet i Altinn.
            </BodyShort>
            <VerticalSpacer rem={2} />
            <BodyShort size="small">
                <Label>Hvordan får du tilgang?</Label>
                <VerticalSpacer rem={0.5} />
                For å få tilgang til avtaler for din virksomhet må du i Altinn ha en av enkelttjenestene
                <ul>
                    <li>Avtale om arbeidstrening</li>
                    <li>Avtale om inkluderingstilskudd</li>
                    <li>Avtale om tilskudd til mentor</li>
                    <li>Avtale om midlertidig lønnstilskudd</li>
                    <li>Avtale om varig lønnstilskudd</li>
                </ul>
            </BodyShort>
            <VerticalSpacer rem={1} />
            <div className={cls.element('rolleinfo')}>
                <Label>Hvem kan gi deg tilgang?</Label>
                <VerticalSpacer rem={0.5} />
                <BodyShort size="small">
                    Det er virksomheten din som må gi deg tilgang. Tilgang kan delegeres av personer som selv har
                    tilgang, dersom de også har rollen Tilgangsstyring.
                    <VerticalSpacer rem={1} />
                    <div>
                        I store virksomheter er det vanlig at HR-personell har fått tilgangsstyring fra ledelsen for å
                        kunne delegere Altinn-roller på vegne av virksomheten. Hvis tilgangsstyring ikke er delegert til
                        HR-personell må man få tildelt tilgang fra daglig leder eller andre fra eiersiden.
                        <VerticalSpacer rem={1.25} />
                        <EksternLenke href="https://info.altinn.no/hjelp/profil/enkelttjenester-og-roller/">
                            Les mer om roller og rettigheter på Altinn.no
                        </EksternLenke>
                    </div>
                </BodyShort>
            </div>
        </RammeMedIkonOgOverskrift>
    );
};

export default DuManglerRettigheterIAltinn;
