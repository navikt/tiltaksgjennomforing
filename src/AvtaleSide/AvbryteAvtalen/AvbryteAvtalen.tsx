import { ReactComponent as AvbruttIkon } from '@/assets/ikoner/Avbryte-avtale.svg';
import Lenke from 'nav-frontend-lenker';
import * as React from 'react';
import './AvbryteAvtalen.less';
import AvbrytAvtaleModal from '@/komponenter/modal/AvbrytAvtaleModal';
import { useState } from 'react';

interface Props {
    avbrytAvtale: (avbruttDato: string, avbruttGrunn: string) => Promise<any>;
    kanAvbrytes: boolean;
    erVeileder: boolean;
}

const AvbryteAvtalen = (props: Props) => {
    const { kanAvbrytes, erVeileder } = props;
    const [avbrytModalIsOpen, setAvbrytModalIsOpen] = useState<boolean>(false);

    return kanAvbrytes && erVeileder ? (
        <>
            <div className="avbryteavtalen">
                <Lenke
                    onClick={() => setAvbrytModalIsOpen(true)}
                    href="#"
                    className="avbryteavtalen__lenke"
                    aria-label="Avbryt avtale"
                    role="menuitem"
                >
                    <div aria-hidden={true}>
                        <AvbruttIkon className="avbryteavtalen__ikon" />
                    </div>
                    Avbryt avtalen
                </Lenke>
            </div>
            <div aria-hidden={!avbrytModalIsOpen}>
                <AvbrytAvtaleModal
                    isOpen={avbrytModalIsOpen}
                    lukkModal={() => setAvbrytModalIsOpen(false)}
                    avbrytAvtale={props.avbrytAvtale}
                />
            </div>
        </>
    ) : null;
};

export default AvbryteAvtalen;
