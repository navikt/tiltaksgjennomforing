import * as React from 'react';
import './AvbryteAvtalen.less';
import { Context } from '@/AvtaleContext';
import Lenke from 'nav-frontend-lenker';
import { ReactComponent as AvbruttIkon } from '@/assets/ikoner/file-remove.svg';

interface Props {
    avbrytOnclick: () => void;
    lagreAvtale?: Context;
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
