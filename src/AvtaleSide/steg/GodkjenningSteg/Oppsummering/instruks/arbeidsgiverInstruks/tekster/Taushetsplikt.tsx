import IkonTekstRad from '@/komponenter/EkspanderbartPanelRad/IkonTekstRad';
import React, { FunctionComponent } from 'react';
import { ChatExclamationmarkIcon } from '@navikt/aksel-icons';
import EksternLenke from '@/komponenter/navigation/EksternLenke';

const Taushetsplikt: FunctionComponent = () => {
    return (
        <IkonTekstRad
            svgIkon={<ChatExclamationmarkIcon title="Taushetsplikt" />}
            headerTekst={{ tekst: 'Taushetsplikt', headingType: 'small' }}
        >
            <p>
                Som arbeidsgiver er dere behandlingsansvarlig for personopplysninger om deltaker. Dette innebærer blant
                annet å behandle deltakers personopplysninger i tråd med personvernregelverket og overholde
                taushetsplikten etter arbeidsmiljøloven.
            </p>
        </IkonTekstRad>
    );
};
export default Taushetsplikt;
