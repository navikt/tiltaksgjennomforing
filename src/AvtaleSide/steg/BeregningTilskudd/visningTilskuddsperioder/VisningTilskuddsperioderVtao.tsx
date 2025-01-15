import { AvtaleContext } from '@/AvtaleProvider';
import BEMHelper from '@/utils/bem';
import { Label } from '@navikt/ds-react';
import { FunctionComponent, useContext } from 'react';
import './visningTilskuddsperioder.less';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import VisningTilskuddsperioderTabellVtao from './VisningTilskuddsperioderTabellVtao';

const VisningTilskuddsperioderVtao: FunctionComponent = () => {
    const { avtale } = useContext(AvtaleContext);
    const cls = BEMHelper('visning-tilskuddsperioder');

    return (
        <div className={cls.className}>
            <Label>
                Oversikt over tilskudd fra {avtale.gjeldendeInnhold.startDato} - {avtale.gjeldendeInnhold.sluttDato}
            </Label>
            <VerticalSpacer rem={2} />
            <div className={cls.element('container')}>
                <div className={cls.element('header')}>
                    <VisningTilskuddsperioderTabellVtao className={cls.className} />
                </div>
            </div>
        </div>
    );
};
export default VisningTilskuddsperioderVtao;
