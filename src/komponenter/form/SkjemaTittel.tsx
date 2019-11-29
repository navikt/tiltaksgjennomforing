import React from 'react';
import Systemtittel from 'nav-frontend-typografi/lib/systemtittel';
import { TypografiProps } from 'nav-frontend-typografi';
import './SkjemaTittel.less';

// Ny kategori "typografi" ?
const SkjemaTittel: React.FunctionComponent<TypografiProps> = props => {
    const { children, ...other } = props;
    return (
        <Systemtittel className="skjema-tittel" {...other}>
            {children}
        </Systemtittel>
    );
};

export default SkjemaTittel;
