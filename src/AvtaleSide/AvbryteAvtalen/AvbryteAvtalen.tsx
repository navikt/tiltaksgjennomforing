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
    // const [isOpen, setOpen] = useState<boolean>(false);

    return (
        <>
            <div>
                <KnappMedIkon
                    onClick={props.avbrytOnclick}
                    label="Avbryt avtalen"
                    ikonType="soppelkasse"
                />
                {/*<FlatKnapp type="flat" onClick={props.avbrytOnclick}>
                    Avbryt avtalen
                </FlatKnapp>*/}
            </div>
        </>
    );
};

export default AvbryteAvtalen;
