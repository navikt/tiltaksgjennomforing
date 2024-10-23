import React, { FunctionComponent } from 'react';
import { LinkPanel, BodyShort } from '@navikt/ds-react';

import './LesMerOmLøsningen.less';
import BEMHelper from '@/utils/bem';
import Info from '@/assets/ikoner/info.svg?react';
import { basename, Path } from '@/Router';

const cls = BEMHelper('les-mer-om-løsningen');

const LesMerOmLøsningen: FunctionComponent = () => (
    <>
        <LinkPanel href={`${basename}/${Path.INFORMASJONSSIDE}`} className={cls.className}>
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
