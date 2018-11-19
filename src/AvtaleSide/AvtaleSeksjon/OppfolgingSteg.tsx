import * as React from 'react';
import { Innholdstittel } from 'nav-frontend-typografi';
import { Context, medContext } from '../AvtaleContext';

const OppfolgingSteg = (props: Context) => (
    <>
        <Innholdstittel tag="h2">
            Oppfølging, opplæring og tilrettelegging
        </Innholdstittel>
    </>
);

export default medContext(OppfolgingSteg);
