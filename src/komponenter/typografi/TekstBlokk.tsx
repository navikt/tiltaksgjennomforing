import React from 'react';
import { Normaltekst, TypografiProps } from 'nav-frontend-typografi';
import './TekstBlokk.less';

// Ny kategori "typografi" ?
const TekstBlokk: React.FunctionComponent<TypografiProps> = props => {
    const { children, ...other } = props;
    return (
        <Normaltekst className="tekst-blokk" {...other}>
            {children}
        </Normaltekst>
    );
};

export default TekstBlokk;
