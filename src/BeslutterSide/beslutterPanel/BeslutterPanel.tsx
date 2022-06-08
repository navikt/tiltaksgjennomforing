import React, { FunctionComponent, useContext } from 'react';
import { AvtaleContext } from '@/AvtaleProvider';
import BEMHelper from '@/utils/bem';
import InfoVisningTilskuddsperiode from '@/BeslutterSide/beslutterPanel/InfoVisningTilskuddsperiode';
import TilskuddsperiodeBehandlingsTittel from '@/BeslutterSide/beslutterPanel/TilskuddsperiodeBehandlingsTittel';
import './beslutterPanel.less';
import TilskuddsperiodeStatus from '@/BeslutterSide/beslutterPanel/TilskuddsperiodeStatus';

const BeslutterPanel: FunctionComponent = () => {
    const avtaleContext = useContext(AvtaleContext);
    const cls = BEMHelper('beslutter-panel');
    const { gjeldendeTilskuddsperiode } = avtaleContext.avtale;

    if (!gjeldendeTilskuddsperiode) {
        return <div>Ingen tilskuddsperioder</div>;
    }

    return (
        <div className={cls.className}>
            <TilskuddsperiodeBehandlingsTittel />
            <InfoVisningTilskuddsperiode />
            <TilskuddsperiodeStatus />
        </div>
    );
};
export default BeslutterPanel;
