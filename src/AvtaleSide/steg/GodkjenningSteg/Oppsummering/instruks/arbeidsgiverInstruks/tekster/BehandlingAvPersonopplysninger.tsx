import React, { FunctionComponent } from 'react';
import IkonTekstRad from '@/komponenter/EkspanderbartPanelRad/IkonTekstRad';
import { PassportIcon } from '@navikt/aksel-icons';
import EksternLenke from '@/komponenter/navigation/EksternLenke';
import { TiltaksType } from '@/types';
import { deltakerenErAnsatt } from '@/utils/tiltakUtils';

interface Props {
    tiltakstype: TiltaksType;
}

const BehandlingAvPersonopplysninger: FunctionComponent<Props> = ({ tiltakstype }) => {
    return (
        <IkonTekstRad
            svgIkon={<PassportIcon title="Behandling av personopplysninger" />}
            headerTekst={{ tekst: 'Behandling av personopplysninger', headingType: 'small' }}
        >
            <p>
                Som arbeidsgiver er dere ansvarlig for å følge{' '}
                <EksternLenke href="https://lovdata.no/dokument/NL/lov/2018-06-15-38">
                    personopplysningsloven
                </EksternLenke>
                {deltakerenErAnsatt(tiltakstype) ? (
                    <> og annet relevant regelverk for behandling av personopplysninger i arbeidsforhold.</>
                ) : (
                    <>.</>
                )}
            </p>
            <ul style={{ paddingInlineStart: '1.5rem' }}>
                <li>Taushetsbelagte og sensitive opplysninger skal kun sendes til NAV gjennom sikre kanaler.</li>
                <li>
                    Av hensyn til personvernet stenges tilgangen til den digitale avtalen 12 uker etter at tiltaket
                    avsluttes.
                </li>
            </ul>
        </IkonTekstRad>
    );
};
export default BehandlingAvPersonopplysninger;
