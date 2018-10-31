import KnappBase from 'nav-frontend-knapper';
import PanelBase from 'nav-frontend-paneler';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import * as React from 'react';
import AvtaleStegProps from './AvtaleStegProps';

const Bekreftelse = (props: AvtaleStegProps) => (
    <PanelBase>
        <SkjemaGruppe className={'bekreft'} title={'Bekreft innhold i avtalen'}>
            <KnappBase type="standard" disabled={false}>
                Bekreft som bruker
            </KnappBase>
            <KnappBase type="standard" disabled={false}>
                Bekreft som arbeidsgiver
            </KnappBase>
            <KnappBase type="standard" disabled={false}>
                Bekreft som NAV-veileder
            </KnappBase>
        </SkjemaGruppe>
    </PanelBase>
);

export default Bekreftelse;
