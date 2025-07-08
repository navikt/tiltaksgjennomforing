import { BodyShort, Label } from '@navikt/ds-react';

import styles from './RadInfo.module.less';

interface Props {
    label: string;
    info: string | number;
    infoNotBold?: boolean;
}

const RadInfo = (props: Props) => {
    const { label, info, infoNotBold } = props;
    return (
        <div className={styles.radElement}>
            <BodyShort size="small">{label}</BodyShort>
            <Label size="small" className={infoNotBold ? styles.infoNotBold : ''}>
                {info}
            </Label>
        </div>
    );
};
export default RadInfo;
