import { ReactComponent as AvbruttIkon } from '@/assets/ikoner/Avbryte-avtale.svg';
import Lenke from 'nav-frontend-lenker';
import * as React from 'react';
import './AvbryteAvtalen.less';

interface Props {
    avbrytOnclick: () => void;
}

const AvbryteAvtalen = (props: Props) => (
    <div className="avbryteavtalen">
        <Lenke onClick={props.avbrytOnclick} href="#" className="avbryteavtalen__lenke">
            <AvbruttIkon className="avbryteavtalen__ikon" />
            Avbryt avtale
        </Lenke>
    </div>
);

export default AvbryteAvtalen;
