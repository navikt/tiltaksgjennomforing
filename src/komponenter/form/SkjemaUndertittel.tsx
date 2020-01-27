import React from 'react';
import { TypografiProps, Undertittel } from 'nav-frontend-typografi';
import './SkjemaUndertittel.less';

// Ny kategori "typografi" ?
const SkjemaUndertittel: React.FunctionComponent<TypografiProps> = props => {
    const { children, ...other } = props;
    return (
        <Undertittel className="skjema-undertittel" {...other}>
            {children}
        </Undertittel>
    );
};

export default SkjemaUndertittel;
