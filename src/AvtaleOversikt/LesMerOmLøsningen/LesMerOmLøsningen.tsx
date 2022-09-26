import { ReactComponent as Info } from '@/assets/ikoner/info.svg';
import { pathTilInformasjonssideInnloggetNy } from '@/paths';
import BEMHelper from '@/utils/bem';
import { LinkPanel } from '@navikt/ds-react';
import { Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import './LesMerOmLøsningen.less';

const cls = BEMHelper('les-mer-om-løsningen');

const LesMerOmLøsningen: FunctionComponent = () => (
    <>
        <LinkPanel href={pathTilInformasjonssideInnloggetNy} className={cls.className}>
            <LinkPanel.Title>
                <div style={{ display: 'flex' }}>
                    <Info width="24" height="24" />
                    <Normaltekst>Les mer om løsningen</Normaltekst>
                </div>
            </LinkPanel.Title>
        </LinkPanel>
    </>
);

export default LesMerOmLøsningen;
