import { ReactComponent as Info } from '@/assets/ikoner/info.svg';
import { pathTilInformasjonssideInnlogget } from '@/paths';
import BEMHelper from '@/utils/bem';
import { LenkepanelBase } from 'nav-frontend-lenkepanel/lib';
import { Normaltekst } from 'nav-frontend-typografi';
import * as React from 'react';
import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import './LesMerOmLøsningen.less';

const cls = BEMHelper('les-mer-om-løsningen');

const LesMerOmLøsningen: FunctionComponent = () => (
    <LenkepanelBase
        href={pathTilInformasjonssideInnlogget}
        linkCreator={(props: any) => <Link to={{ pathname: props.href, search: window.location.search }} {...props} />}
        className={cls.className}
    >
        <div style={{ display: 'flex' }}>
            <Info width="24" height="24" />
            <Normaltekst className={''}>Les mer om løsningen</Normaltekst>
        </div>
        <div />
    </LenkepanelBase>
);

export default LesMerOmLøsningen;
