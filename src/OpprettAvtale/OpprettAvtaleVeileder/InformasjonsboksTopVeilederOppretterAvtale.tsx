import React from 'react';
import { BodyShort } from '@navikt/ds-react';

import EksternLenke from '@/komponenter/navigation/EksternLenke';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import amplitude from '@/utils/amplitude';
import { basename, Path } from '@/Router';

const InformasjonsboksTopVeilederOppretterAvtale: React.FC = () => {
    return (
        <Innholdsboks>
            <BodyShort size="small">
                Er det første gang du skal opprette en avtale bør du lese gjennom {''}
                <EksternLenke href={`${basename}${Path.INFORMASJONSSIDE}`}>
                    introduksjon til hvordan løsningen fungerer {''}
                </EksternLenke>
                og vite om{' '}
                <EksternLenke
                    onClick={() => amplitude.logEvent('#tiltak-veileder-alle-tiltak-link-apnet')}
                    href="https://www.nav.no/arbeidsgiver/inkludere"
                >
                    de ulike støtteordningene på NAV.no.
                </EksternLenke>{' '}
                eller {''}
                <EksternLenke
                    onClick={() => amplitude.logEvent('#tiltak-veileder-alle-tiltak-navet-link-apnet')}
                    href="https://navno.sharepoint.com/sites/fag-og-ytelser-arbeid-tiltak-og-virkemidler/SitePages/Alfabetisk-oversikt-over-alle-tiltak-og-virkemidler.aspx?web=1"
                >
                    de ulike støtteordningene på Navet.
                </EksternLenke>
            </BodyShort>
        </Innholdsboks>
    );
};
export default InformasjonsboksTopVeilederOppretterAvtale;
