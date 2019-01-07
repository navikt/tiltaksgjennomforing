import AlertStripe from 'nav-frontend-alertstriper';
import Lukknapp from 'nav-frontend-lukknapp';
import * as React from 'react';
import './Varsel.less';

interface Props {
    lukkVarsel: () => void;
}

const Varsel: React.FunctionComponent<Props> = props => (
    <AlertStripe type={'advarsel'} solid={true} className="varsel">
        {props.children}
        <Lukknapp hvit={true} overstHjorne={true} onClick={props.lukkVarsel} />
    </AlertStripe>
);

export default Varsel;
