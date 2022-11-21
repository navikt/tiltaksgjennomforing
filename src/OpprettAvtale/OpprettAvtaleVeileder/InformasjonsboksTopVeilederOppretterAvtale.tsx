import React from 'react';
import amplitude from '@/utils/amplitude';
import { BodyShort } from '@navikt/ds-react';
import EksternLenke from '@/komponenter/navigation/EksternLenke';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import { basename, pathTilInformasjonssideInnlogget } from '@/paths';

const InformasjonsboksTopVeilederOppretterAvtale: React.FC = () => {
    return (
        <Innholdsboks>
            <BodyShort size="small">
                Er det første gang du skal opprette en avtale bør du lese gjennom {''}
                <EksternLenke href={`${basename}${pathTilInformasjonssideInnlogget}`}>
                    introduksjon til hvordan løsningen fungerer {''}
                </EksternLenke>
                og vite om{' '}
                <EksternLenke
                    onClick={() => amplitude.logEvent('#tiltak-veileder-alle-tiltak-link-apnet')}
                    href="https://arbeidsgiver.nav.no/veiviserarbeidsgiver/tema/hvordan-kan-nav-hjelpe-med-inkludering"
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
