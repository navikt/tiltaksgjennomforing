import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import { TiltaksType } from '@/types/avtale';
import React, { FunctionComponent, useContext } from 'react';
import './IngenAvtalerArbeidsgiver.less';
import DuManglerRettigheterIAltinn from '@/AvtaleOversikt/IngenAvtaler/arbeidsgiver/tilstander/DuManglerRettigheterIAltinn';
import IkkeTilgangPåValgtBedrift from '@/AvtaleOversikt/IngenAvtaler/arbeidsgiver/tilstander/IkkeTilgangPåValgtBedrift';
import IkkeTilgangPåValgtTiltakIValgtBedrift from '@/AvtaleOversikt/IngenAvtaler/arbeidsgiver/tilstander/IkkeTilgangPåValgtTiltakIValgtBedrift';
import TilgangPåValgtTiltakIValgtBedrift from '@/AvtaleOversikt/IngenAvtaler/arbeidsgiver/tilstander/TilgangPåValgtTiltakIValgtBedrift';
import ValgtAlle from '@/AvtaleOversikt/IngenAvtaler/arbeidsgiver/tilstander/ValgtAlle';

const alleTilganger: TiltaksType[] = ['ARBEIDSTRENING', 'MIDLERTIDIG_LONNSTILSKUDD', 'VARIG_LONNSTILSKUDD'];

type Props = {
    bedriftNr?: string;
    tiltakstype?: TiltaksType;
};

const IngenAvtalerArbeidsgiver: FunctionComponent<Props> = props => {
    const { altinnOrganisasjoner, tilganger } = useContext(InnloggetBrukerContext);

    if (!props.bedriftNr) {
        return <DuManglerRettigheterIAltinn />;
    }

    const bedriftNavn = altinnOrganisasjoner.find(org => org.OrganizationNumber === props.bedriftNr)?.Name || '';

    if (!tilganger[props.bedriftNr] || tilganger[props.bedriftNr].length === 0) {
        return (
            <IkkeTilgangPåValgtBedrift
                bedriftNr={props.bedriftNr}
                bedriftNavn={bedriftNavn}
                tilgangerJegIkkeHar={alleTilganger}
            />
        );
    }

    if (props.tiltakstype) {
        if (!tilganger[props.bedriftNr].includes(props.tiltakstype)) {
            return (
                <IkkeTilgangPåValgtTiltakIValgtBedrift
                    bedriftNr={props.bedriftNr}
                    tiltakstype={props.tiltakstype}
                    bedriftNavn={bedriftNavn}
                />
            );
        } else {
            return <TilgangPåValgtTiltakIValgtBedrift tiltakstype={props.tiltakstype} bedriftNavn={bedriftNavn} />;
        }
    }

    return <ValgtAlle bedriftNavn={bedriftNavn} bedriftNr={props.bedriftNr} tilganger={tilganger} />;
};

export default IngenAvtalerArbeidsgiver;
