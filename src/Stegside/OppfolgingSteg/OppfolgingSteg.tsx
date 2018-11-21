import * as React from 'react';
import { Innholdstittel } from 'nav-frontend-typografi';
import { Context, medContext } from '../AvtaleContext';
import Innholdsboks from '../../komponenter/Innholdsboks/Innholdsboks';

const OppfolgingSteg = (props: Context) => (
    <Innholdsboks>
        <Innholdstittel tag="h2">
            Oppfølging, opplæring og tilrettelegging
        </Innholdstittel>
    </Innholdsboks>
);

export default medContext(OppfolgingSteg);
