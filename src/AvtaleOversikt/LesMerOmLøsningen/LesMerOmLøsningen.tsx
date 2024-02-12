import Info from '@/assets/ikoner/info.svg?react';
import { pathTilInformasjonssideInnloggetNy } from '@/paths';
import BEMHelper from '@/utils/bem';
import { LinkPanel, BodyShort } from '@navikt/ds-react';
import React, { FunctionComponent } from 'react';
import './LesMerOmLøsningen.less';

const cls = BEMHelper('les-mer-om-løsningen');

const LesMerOmLøsningen: FunctionComponent = () => (
    <>
        <LinkPanel href={pathTilInformasjonssideInnloggetNy} className={cls.className}>
            <LinkPanel.Title>
                <div style={{ display: 'flex' }}>
                    <Info width="24" height="24" />
                    <BodyShort size="small">Les mer om løsningen</BodyShort>
                </div>
            </LinkPanel.Title>
        </LinkPanel>
    </>
);

export default LesMerOmLøsningen;
