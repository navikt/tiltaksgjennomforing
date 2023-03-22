import React, { FunctionComponent } from 'react';
import { BodyShort, Label } from '@navikt/ds-react';
import BEMHelper from '@/utils/bem';
import './VisueltDisabledInputFelt.less';

interface Props {
    label: string;
    tekst: string;
    size?: 'medium' | 'small';
}

const cls = BEMHelper('visueltDisabledInputFelt');

const VisueltDisabledInputFelt: FunctionComponent<Props> = ({ label, tekst }) => (
    <div className={cls.className}>
        <Label className={cls.element('label')}>{label}</Label>
        <BodyShort className={cls.element('tekstfelt')}>{tekst}</BodyShort>
    </div>
);

export default VisueltDisabledInputFelt;
