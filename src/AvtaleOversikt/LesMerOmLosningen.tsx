import { pathTilInformasjonssideInnlogget } from '@/paths';
import { Link } from 'react-router-dom';
import { ReactComponent as Info } from '@/assets/ikoner/info.svg';
import { Normaltekst } from 'nav-frontend-typografi';
import * as React from 'react';
import { LenkepanelBase } from 'nav-frontend-lenkepanel/lib';
import { FunctionComponent } from 'react';

const LesMerOmLosningen: FunctionComponent = () => (
    <LenkepanelBase
        href={pathTilInformasjonssideInnlogget}
        linkCreator={(props: any) => <Link to={props.href} {...props} />}
    >
        <Info width="24" height="24" />
        <Normaltekst className={''}>Les mer om løsningen</Normaltekst>
    </LenkepanelBase>
);

export default LesMerOmLosningen;
