import React from 'react';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import { Normaltekst } from 'nav-frontend-typografi';
import EksternLenke from '@/komponenter/navigation/EksternLenke';
import { basename, pathTilInformasjonssideInnlogget } from '@/paths';
import amplitude from '@/utils/amplitude';

const InformasjonsboksTopVeilederOppretterAvtale: React.FC = () => {
    return (
        <Innholdsboks>
            <Normaltekst>
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
            </Normaltekst>
        </Innholdsboks>
    );
};
export default InformasjonsboksTopVeilederOppretterAvtale;
