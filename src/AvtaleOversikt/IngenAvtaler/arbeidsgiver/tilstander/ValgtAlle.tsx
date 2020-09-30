import * as React from 'react';
import { FunctionComponent } from 'react';
import { ReactComponent as InfoIkon } from '@/assets/ikoner/info.svg';
import { Element, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import EksternLenke from '@/komponenter/navigation/EksternLenke';
import TilgangTabell from '@/AvtaleOversikt/IngenAvtaler/arbeidsgiver/TilgangTabell';
import { Tilganger } from '@/InnloggingBoundary/useInnlogget';

type Props = {
    tilganger: Tilganger;
    bedriftNavn: string;
    bedriftNr: string;
};

const ValgtAlle: FunctionComponent<Props> = props => {
    return (
        <div style={{ padding: '4rem 2.5rem', backgroundColor: 'white', borderRadius: '4px' }}>
            <Systemtittel>
                <InfoIkon
                    width="24px"
                    style={{ display: 'inline-block', verticalAlign: 'text-top', marginRight: '0.8rem' }}
                />
                Finner ingen avtaler
            </Systemtittel>
            <VerticalSpacer rem={2} />
            <Normaltekst>
                Du har tilgang til én eller flere tiltakstyper men det er ikke opprettet noen avtaler for denne eller
                disse tiltakstypene.
            </Normaltekst>
            <VerticalSpacer rem={2} />
            <Element>Her ser du en oversikt over hvilke tiltakstyper du har tilgang til i denne virksomheten</Element>
            <VerticalSpacer rem={0.5} />
            <Normaltekst>
                Hvis du mangler tilgang kan du be om tilgang i Altinn.{' '}
                <EksternLenke href="https://www.altinn.no/hjelp/profil/roller-og-rettigheter/">
                    Les mer om roller og rettigheter i Altinn her
                </EksternLenke>
            </Normaltekst>
            <VerticalSpacer rem={3} />
            <TilgangTabell tilganger={props.tilganger} bedriftNr={props.bedriftNr} />
        </div>
    );
};

export default ValgtAlle;
