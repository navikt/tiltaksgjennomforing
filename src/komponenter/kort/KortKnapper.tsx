import React from 'react';
import './KortKnapper.less';

// Ny kategori "typografi" ?
const KortKnapper: React.FunctionComponent<any> = (props) => {
    const { children, ...other } = props;
    return (
        <div className="kort-knapper" {...other}>
            {children}
        </div>
    );
};

export default KortKnapper;
