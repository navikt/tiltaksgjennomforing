import { FunctionComponent } from 'react';
import { BodyShort, Label } from '@navikt/ds-react';
import { rad_element, info_not_bold } from './RadInfo.module.less';
interface Props {
    label: string;
    info: string | number;
    infoNotBold?: boolean;
}

const RadInfo: FunctionComponent<Props> = ({ label, info, infoNotBold }) => {
    return (
        <div className={rad_element}>
            <BodyShort size="small">{label}</BodyShort>
            <Label size="small" className={infoNotBold ? info_not_bold : ''}>
                {info}
            </Label>
        </div>
    );
};
export default RadInfo;
