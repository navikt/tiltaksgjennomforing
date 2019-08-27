import * as React from 'react';
import FlatKnapp, { Flatknapp } from 'nav-frontend-knapper';
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
                    ikonType="avbrutt"
                    backgroundColor="unset"
                />
                {/* <Flatknapp onClick={props.avbrytOnclick}>
                    Avbryt avtalen
                </Flatknapp>*/}
            </div>
        </>
    );
};

export default AvbryteAvtalen;
