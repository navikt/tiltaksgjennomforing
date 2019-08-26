import * as React from 'react';
import FlatKnapp from 'nav-frontend-knapper';
import './AvbryteAvtalen.less';
import { Avtale } from '../avtale';
import KnappMedIkon from '../../komponenter/KnappMedIkon/KnappMedIkon';
import { Context } from '../../AvtaleContext';

interface Props {
    avtale: Avtale;
    avbrytOnclick: () => void;
    lagreAvtale?: Context;
}

const AvbryteAvtalen = (props: Props) => {
    return (
        <>
            <div>
                <KnappMedIkon
                    onClick={props.avbrytOnclick}
                    label="Avbryt avtalen"
                    ikonType="soppelkasse"
                    backgroundColor="unset"
                />
            </div>
        </>
    );
};

export default AvbryteAvtalen;
