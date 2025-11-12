import BEMHelper from '@/utils/bem';
import { FunctionComponent } from 'react';
import './visningTilskuddsperioder.less';
import VisningTilskuddsperioderTabellVtao from './VisningTilskuddsperioderTabellVtao';
import VisningTilskuddsperioderTabellVtao2 from '@/AvtaleSide/steg/BeregningTilskudd/visningTilskuddsperioder/VisningTilskuddsperioderTabellVtao2';

const VisningTilskuddsperioderVtao: FunctionComponent = () => {
    const cls = BEMHelper('visning-tilskuddsperioder');

    return <VisningTilskuddsperioderTabellVtao className={cls.className} />;
};
export default VisningTilskuddsperioderVtao;
