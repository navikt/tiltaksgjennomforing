import * as React from 'react';
import AvtaleProps from '../AvtaleProps';
import StegProps from '../StegProps';
import { Ingress, Innholdstittel } from 'nav-frontend-typografi';

const ArbeidsoppgaverSteg = (props: AvtaleProps & StegProps) => (
    <>
        <Innholdstittel tag="h2">
            Beskriv arbeidsoppgavene som skal utføres
        </Innholdstittel>
        <Ingress>
            Her skal du beskrive hvilke arbeidsoppgaver som deltakeren skal
            utføre hos dere under arbeidstreningen.
        </Ingress>
    </>
);

export default ArbeidsoppgaverSteg;
