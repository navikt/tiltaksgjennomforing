import React, { FunctionComponent } from 'react';
import IkonTekstRad from '@/komponenter/EkspanderbartPanelRad/IkonTekstRad';
import { Passport } from '@navikt/ds-icons';
import EksternLenke from '@/komponenter/navigation/EksternLenke';

const BehandlingAvPersonopplysninger: FunctionComponent = () => {
    return (
        <IkonTekstRad
            svgIkon={<Passport width="2.25rem" height="2.25rem" />}
            headerTekst={{ tekst: 'Behandling av personopplysninger', headingType: 'small' }}
        >
            <p>
                Dere har ansvar for å følge{' '}
                <EksternLenke href="https://lovdata.no/dokument/NL/lov/2018-06-15-38">
                    personopplysningsloven
                </EksternLenke>
            </p>

            <p>
                Dere kan ikke sende taushetsbelagte og sensitive personopplysninger til NAV på usikret epost. Dere må
                slette alle personopplysningene som dere ikke har selvstendig behandlingsansvar for om deltakeren,
                senest innen 12 uker etter at tiltaket er avsluttet.
            </p>
            <p>12 uker etter avsluttet tiltak vil du som arbeidsgiver ikke lenger har tilgang til avtalen</p>
        </IkonTekstRad>
    );
};
export default BehandlingAvPersonopplysninger;
