import React, { FunctionComponent, useContext } from 'react';
import PakrevdInput from '@/komponenter/PakrevdInput/PakrevdInput';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';

import { AvtaleContext } from '@/AvtaleProvider';
import BEMHelper from '@/utils/bem';
import { TilskuddsperiodeContext } from '@/BeslutterSide/BeslutterSide';

const TilskuddsperiodeEndreKostnadssted: FunctionComponent = () => {
    const { avtale } = useContext(AvtaleContext);
    const { enhet, setEnhet, enhetFeil } = useContext(TilskuddsperiodeContext);
    const { gjeldendeTilskuddsperiode } = avtale;
    const cls = BEMHelper('beslutter-panel');

    if (gjeldendeTilskuddsperiode && gjeldendeTilskuddsperiode.status !== 'UBEHANDLET') return null;

    return (
        <>
            <div className={cls.element('input-wrapper')}>
                <PakrevdInput
                    width="S"
                    label=""
                    verdi={enhet}
                    settVerdi={(verdi) => setEnhet(verdi)}
                    maxLength={4}
                    error={enhetFeil}
                />
                <VerticalSpacer rem={1} />
            </div>
        </>
    );
};
export default TilskuddsperiodeEndreKostnadssted;
