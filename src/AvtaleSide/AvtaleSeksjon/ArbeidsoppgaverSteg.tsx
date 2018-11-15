import * as React from 'react';
import { EndreAvtale } from '../EndreAvtale';
import { Ingress, Innholdstittel } from 'nav-frontend-typografi';
import StegProps from '../StegProps';
import { medContext } from '../avtaleContext';

const ArbeidsoppgaverSteg = (props: EndreAvtale & StegProps) => (
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

export default medContext(ArbeidsoppgaverSteg);
